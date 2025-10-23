const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");

exports.register = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res
        .status(409)
        .send({ message: "User with given email already exists!" });

    const adminExists = await User.findOne({ role: "admin" });
    const role = adminExists ? "user" : "admin";

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({
      ...req.body,
      password: hashPassword,
      role,
    }).save();

    res.status(201).send({ message: `User created successfully as ${role}` });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
