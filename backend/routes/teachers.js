const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

router.get("/", getAllTeachers);
router.get("/:id", getTeacherById);
router.post("/", auth, admin, upload.single("image"), createTeacher);
router.put("/:id", auth, admin, upload.single("image"), updateTeacher);
router.delete("/:id", auth, admin, deleteTeacher);

module.exports = router;
