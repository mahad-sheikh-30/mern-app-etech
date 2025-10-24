const Enrollment = require("../models/enrollment");
const Course = require("../models/course");
const Notification = require("../models/notification");
const { User } = require("../models/user");

exports.createEnrollment = async (req, res) => {
  try {
    const io = req.app.get("io");
    const { courseId } = req.body;
    const userId = req.user._id;

    if (!courseId) {
      return res.status(400).json({ error: "courseId is required" });
    }

    // Save enrollment
    const enrollment = new Enrollment({ userId, courseId });
    await enrollment.save();

    // Update course student count
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $inc: { studentsCount: 1 } },
      { new: true }
    );

    // Update user role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: "student" },
      { new: true }
    );

    if (!updatedUser) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    // 🔧 Use updatedUser instead of 'user'
    io.emit("enrollmentCreated", {
      userId,
      courseId,
      message: `New enrollment: ${updatedUser.name} enrolled in ${
        course?.title || "a course"
      }!`,
    });

    // Notify admin in real-time
    const admin = await User.findOne({ role: "admin" });
    if (admin) {
      const message = `User ${updatedUser.name} enrolled in ${course?.title}`;
      io.to(admin._id.toString()).emit("notification", {
        message,
        type: "enrollment",
        data: { courseId, userId },
      });

      // Save in DB
      await Notification.create({
        userId: admin._id,
        message,
        type: "enrollment",
        data: { courseId, userId },
      });
    }

    res.status(201).json(enrollment);
  } catch (err) {
    console.error("Enrollment Error:", err);
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ error: "User already enrolled in this course" });
    }
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
