const Notification = require("../models/notification");

// Get all notifications for logged-in user
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark single notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    if (!notification)
      return res.status(404).json({ error: "Notification not found" });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create notification (can be called internally when event happens)
exports.createNotification = async ({
  userId,
  message,
  type = "course",
  data,
}) => {
  try {
    const notif = await Notification.create({ userId, message, type, data });
    return notif;
  } catch (err) {
    console.error("Error creating notification:", err.message);
  }
};
