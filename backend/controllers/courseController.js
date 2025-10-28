const Course = require("../models/course");
const Enrollment = require("../models/enrollment");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const Notification = require("../models/notification");
const { User } = require("../models/user");

exports.createCourse = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const course = await Course.create({ ...req.body, image: imageUrl });
    const io = req.app.get("io");

    // ✅ Create only one DB notification entry (for all)
    const message = `New course added: ${course.title}`;
    const notification = await Notification.create({
      message,
      type: "course",
      data: { courseId: course._id },
      userId: null,
      forRole: "student",
    });

    // ✅ Get all connected students only
    const students = await User.find({ role: "student" });

    console.log(students);
    students.forEach((student) => {
      io.to(student._id.toString()).emit("notification", {
        _id: notification._id, // optional for duplicate checking in frontend
        message,
        type: "course",
        data: { courseId: course._id },
      });
    });

    console.log(`✅ Course notification sent to ${students.length} students`);

    res.status(201).json({ message: "Course created", course });
  } catch (err) {
    console.error("❌ Error creating course:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacherId", "_id name");
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id).populate("teacherId", "name");

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = { ...req.body };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      updateData.image = result.secure_url;
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("teacherId", "name");

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course updated", course: updatedCourse });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Course.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Course not found" });
    }

    await Enrollment.deleteMany({ courseId: id });
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
