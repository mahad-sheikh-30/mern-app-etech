const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { name, phone, email, comments } = req.body;

    const contact = new Contact({
      user: req.user._id,
      name,
      phone,
      email,
      comments,
    });

    await contact.save();
    res.status(201).send({ message: "Contact form submitted", contact });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
