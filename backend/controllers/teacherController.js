const Teacher = require("../models/teacher");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort();
    res.send(teachers);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    res.send(teacher);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }
    const newTeacher = new Teacher({ ...req.body, image: imageUrl });
    await newTeacher.save();
    res.send(newTeacher);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      updateData.image = result.secure_url;
    }
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedTeacher) {
      return res.status(404).send({ error: "Teacher not found" });
    }
    res.send(updatedTeacher);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const deleted = await Teacher.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).send({ error: "Teacher not found" });
    }
    res.send({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
