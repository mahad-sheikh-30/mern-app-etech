const express = require("express");
const Course = require("../models/course");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("teacherId", "name");

    res.send(courses);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const courses = await Course.findById(id).populate("teacherId", "name");

    res.send(courses);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.send(newCourse);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("teacherId", "name");

    if (!updatedCourse) {
      return res.status(404).send({ error: "Course not found" });
    }
    res.send(updatedCourse);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Course.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ error: "Course not found" });
    }
    res.send({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
module.exports = router;
