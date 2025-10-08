const express = require("express");
const Transaction = require("../models/transaction");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/my", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id })
      .populate("courseId", "title price category")
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  try {
    const transactions = await Transaction.find()
      .populate("userId", "name email")
      .populate("courseId", "title price")
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
