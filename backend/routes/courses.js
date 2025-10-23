const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const upload = require("../middleware/multer");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/", auth, admin, upload.single("image"), createCourse);
router.put("/:id", auth, admin, upload.single("image"), updateCourse);
router.delete("/:id", auth, admin, deleteCourse);

router.get("/", getAllCourses);
router.get("/:id", getCourseById);

module.exports = router;
