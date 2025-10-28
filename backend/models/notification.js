const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // ✅ make optional
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["course", "enrollment", "system"],
      default: "system",
    },
    data: {
      type: Object,
    },
    forRole: {
      type: String, // e.g. "student", "admin", "all"
      default: "all",
    },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
