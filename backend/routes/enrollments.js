const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  createEnrollment,
  getAllEnrollments,
  getMyEnrollments,
  deleteEnrollment,
} = require("../controllers/enrollmentController");

router.post("/", auth, createEnrollment);
router.get("/", auth, getAllEnrollments);
router.get("/my", auth, getMyEnrollments);
router.delete("/:id", auth, admin, deleteEnrollment);

module.exports = router;
