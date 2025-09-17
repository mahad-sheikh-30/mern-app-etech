const express = require("express");
const Course = require("../models/course");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
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
module.exports = router;
