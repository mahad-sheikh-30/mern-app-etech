const express = require("express");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  getAllTransactions,
  getMyTransactions,
} = require("../controllers/transactionController.js");
const router = express.Router();

router.get("/my", auth, getMyTransactions);

router.get("/", auth, admin, getAllTransactions);

module.exports = router;
