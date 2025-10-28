require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const connection = require("./config/db");

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const teacherRoutes = require("./routes/teachers");
const courseRoutes = require("./routes/courses");
const enrollmentRoutes = require("./routes/enrollments");
const paymentRoutes = require("./routes/payment");
const transactionRoutes = require("./routes/transactions");

const googleAuth = require("./routes/googleAuth");
const notificationRoutes = require("./routes/notifications");
const { handleWebhook } = require("./routes/payment");

const app = express();
connection();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("New socket connected:", socket.id);

  socket.on("joinRoom", (userId) => {
    if (!userId) return;
    socket.join(userId);
    console.log(`Socket ${socket.id} joined room ${userId}`);
  });
  // 🔹 Handle sending a message
  socket.on("sendMessage", async ({ senderId, receiverId, content }) => {
    try {
      const message = await Message.create({ senderId, receiverId, content });

      // Emit to receiver in real time
      io.to(receiverId).emit("receiveMessage", message);
      io.to(senderId).emit("messageSent", message);
    } catch (err) {
      console.error("❌ Error saving message:", err);
    }
  });
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

app.post(
  "/api/payment/webhook",
  bodyParser.raw({ type: "application/json" }),
  handleWebhook
);

app.use(cors());
app.use(express.json());

app.use("/api/notifications", notificationRoutes);

app.use("/api/google-auth", googleAuth);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/transactions", transactionRoutes);

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`✅ Server running on port ${port}...`));
