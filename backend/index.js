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
