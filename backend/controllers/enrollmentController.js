const Enrollment = require("../models/enrollment");
const Course = require("../models/course");
const Notification = require("../models/notification");
const { User } = require("../models/user");

exports.createEnrollment = async (req, res) => {
  try {
    const io = req.app.get("io");
    const { courseId } = req.body;
    const userId = req.user._id;

    if (!courseId)
      return res.status(400).json({ error: "courseId is required" });

    // Avoid duplicates
    const existing = await Enrollment.findOne({ userId, courseId });
    if (existing)
      return res
        .status(400)
        .json({ error: "User already enrolled in this course" });

    const enrollment = await Enrollment.create({ userId, courseId });

    await Course.findByIdAndUpdate(courseId, { $inc: { studentsCount: 1 } });
    const user = await User.findByIdAndUpdate(
      userId,
      { role: "student" },
      { new: true }
    );

    const admin = await User.findOne({ role: "admin" });
    const course = await Course.findById(courseId);

    if (admin && user && course) {
      const message = `User ${user.name} enrolled in ${course.title}`;

      // Create one admin-only notification
      await Notification.create({
        userId: admin._id,
        message,
        type: "enrollment",
        data: { courseId, userId },
      });

      // Emit real-time to admin only
      io.to(admin._id.toString()).emit("notification", {
        message,
        type: "enrollment",
        data: { courseId, userId },
      });

      console.log("✅ Enrollment notification sent to admin");
    }

    res.status(201).json({ message: "Enrollment created", enrollment });
  } catch (err) {
    console.error("❌ Enrollment Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("userId", "name email")
      .populate({
        path: "courseId",
        populate: { path: "teacherId", select: "name role" },
      });

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyEnrollments = async (req, res) => {
  try {
    const userId = req.user._id;
    const enrollments = await Enrollment.find({ userId }).select("courseId");
    const courseIds = enrollments.map((e) => e.courseId.toString());

    res.json(courseIds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const enrollment = await Enrollment.findByIdAndDelete(enrollmentId);

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    await Course.findByIdAndUpdate(enrollment.courseId, {
      $inc: { studentsCount: -1 },
    });

    const stillEnrolled = await Enrollment.exists({
      userId: enrollment.userId,
    });

    let newRole = null;
    if (!stillEnrolled) {
      const updatedUser = await User.findByIdAndUpdate(
        enrollment.userId,
        { role: "user" },
        { new: true }
      );
      newRole = updatedUser;
    }

    res.json({ newRole: newRole?.role || null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
