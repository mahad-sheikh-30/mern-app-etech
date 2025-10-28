const Stripe = require("stripe");
const Enrollment = require("../models/enrollment");
const Course = require("../models/course");
const { User } = require("../models/user");
const Transaction = require("../models/transaction");
const Notification = require("../models/notification");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    if (!courseId) {
      return res.status(400).json({ error: "courseId required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: course.title },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/success?courseId=${courseId}`,
      cancel_url: `${process.env.FRONTEND_URL}`,
      metadata: { userId: userId.toString(), courseId: courseId.toString() },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe session error:", err.message);
    res.status(500).json({ error: "Payment session failed" });
  }
};

exports.createPaymentIntent = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    if (!courseId) return res.status(400).json({ error: "courseId required" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(course.price * 100),
      currency: "usd",
      metadata: { userId: userId.toString(), courseId: courseId.toString() },
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("❌ Payment intent error:", err.message);
    res.status(500).json({ error: "Payment intent creation failed" });
  }
};

exports.handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("❌ Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    const io = req.app.get("io");

    if (
      ["checkout.session.completed", "payment_intent.succeeded"].includes(
        event.type
      )
    ) {
      const data = event.data.object;
      const { userId, courseId } = data.metadata || {};

      if (!userId || !courseId) return res.status(400).send("Missing metadata");

      const course = await Course.findById(courseId);
      if (!course) return res.status(404).send("Course not found");

      const paymentIntentId = data.payment_intent || data.id;
      const existingTxn = await Transaction.findOne({ paymentIntentId });
      if (existingTxn) return res.status(200).send("Duplicate ignored");

      await Transaction.create({
        userId,
        courseId,
        paymentIntentId,
        amount: course.price,
        paymentMethod:
          data.payment_method_types?.[0] || data.payment_method || "card",
      });

      const existingEnroll = await Enrollment.findOne({ userId, courseId });
      if (!existingEnroll) {
        await Enrollment.create({ userId, courseId });
        await Course.findByIdAndUpdate(courseId, {
          $inc: { studentsCount: 1 },
        });
        await User.findByIdAndUpdate(userId, { role: "student" });

        const admin = await User.findOne({ role: "admin" });
        const user = await User.findById(userId);

        if (admin && user) {
          const message = `User ${user.name} enrolled in ${course.title}`;

          io.to(admin._id.toString()).emit("notification", {
            message,
            type: "enrollment",
            data: { courseId, userId },
          });

          const exists = await Notification.findOne({
            userId: admin._id,
            "data.courseId": courseId,
            "data.userId": userId,
            type: "enrollment",
          });

          if (!exists) {
            await Notification.create({
              userId: admin._id,
              message,
              type: "enrollment",
              data: { courseId, userId },
            });
          }

          console.log("✅ Enrollment + notification created for admin");
        }
      }
    }

    res.status(200).send();
  } catch (err) {
    console.error("❌ Webhook processing error:", err.message);
    res.status(500).send("Webhook handling failed");
  }
};
