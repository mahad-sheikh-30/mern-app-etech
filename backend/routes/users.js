const router = require("express").Router();
const { register, getAllUsers } = require("../controllers/userController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/", register);
router.get("/", auth, admin, getAllUsers);

module.exports = router;
