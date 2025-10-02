const express = require("express");
const Teacher = require("../models/teacher");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.send(teachers);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const teachers = await Teacher.findById(id);
    res.send(teachers);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    await newTeacher.save();
    res.send(newTeacher);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTeacher) {
      return res.status(404).send({ error: "Teacher not found" });
    }
    res.send(updatedTeacher);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Teacher.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ error: "Teacher not found" });
    }
    res.send({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
module.exports = router;
