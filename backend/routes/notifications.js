const express = require("express");
const router = express.Router();
const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");
const auth = require("../middleware/auth");

// Get notifications for logged-in user
router.get("/", auth, getNotifications);

// Mark notification as read
router.patch("/:id/read", auth, markAsRead);

module.exports = router;
