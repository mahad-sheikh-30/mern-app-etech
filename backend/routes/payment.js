const express = require("express");
const Stripe = require("stripe");
const auth = require("../middleware/auth");
const Enrollment = require("../models/enrollment");
const Course = require("../models/course");
const { User } = require("../models/user");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", auth, async (req, res) => {
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
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: { userId: userId.toString(), courseId: courseId.toString() },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err.message);
    res.status(500).json({ error: "Payment session failed" });
  }
});

const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { userId, courseId } = session.metadata;

    try {
      const existing = await Enrollment.findOne({ userId, courseId });
      if (!existing) {
        await Enrollment.create({ userId, courseId });
        await Course.findByIdAndUpdate(courseId, {
          $inc: { studentsCount: 1 },
        });
        await User.findByIdAndUpdate(
          userId,
          { role: "student" },
          { new: true }
        );
        console.log("Enrollment created for paid user:", userId);
      } else {
        console.log("Enrollment already exists:", userId, courseId);
      }
    } catch (err) {
      console.error("Enrollment save error:", err.message);
    }
  }

  res.status(200).send();
};

module.exports = router;
module.exports.handleWebhook = handleWebhook;
