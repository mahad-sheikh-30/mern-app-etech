const Contact = require("../models/contact");

exports.submitContact = async (req, res) => {
  try {
    const { name, phone, email, comments } = req.body;

    const contact = new Contact({
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
};
