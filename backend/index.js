require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const uploadRoutes = require("./routes/upload");
const contactRoutes = require("./routes/contact");
const teacherRoutes = require("./routes/teachers");
const courseRoutes = require("./routes/courses");
const enrollmentRoutes = require("./routes/enrollments");

connection();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/upload", uploadRoutes);
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));
