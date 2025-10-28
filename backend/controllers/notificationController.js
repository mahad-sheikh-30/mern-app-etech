const Notification = require("../models/notification");

// Get all notifications for logged-in user
exports.getNotifications = async (req, res) => {
  try {
    const user = req.user;

    let query = { userId: user._id };

    if (user.role === "student") {
      query = {
        $or: [{ userId: user._id }, { forRole: "student" }],
      };
    }

    const notifications = await Notification.find(query).sort({
      createdAt: -1,
    });

    // ✅ Add computed `read` field dynamically per user
    const formatted = notifications.map((n) => ({
      ...n.toObject(),
      read: n.readBy?.includes(user._id),
    }));

    res.json(formatted);
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
  forRole = "all",
}) => {
  try {
    const notif = await Notification.create({
      userId,
      message,
      type,
      data,
      forRole,
    });
    return notif;
  } catch (err) {
    console.error("Error creating notification:", err.message);
  }
};

// Mark single notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { $addToSet: { readBy: userId } }, // ✅ add user to read list
      { new: true }
    );

    if (!notification)
      return res.status(404).json({ error: "Notification not found" });

    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
