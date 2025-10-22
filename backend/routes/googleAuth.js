// routes/googleAuth.js
const router = require("express").Router();
const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/", async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential)
      return res.status(400).send({ message: "No credential provided" });

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        password: "",
        role: "user",
      });
      await user.save();
    }

    const token = user.generateAuthToken();

    res.status(200).send({
      data: token,
      role: user.role,
      name: user.name,
      email: user.email,
      message: "Logged in with Google successfully",
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).send({ message: "Google login failed" });
  }
});

module.exports = router;
