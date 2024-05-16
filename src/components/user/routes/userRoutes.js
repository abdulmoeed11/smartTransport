const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUserProfile,
} = require("../controllers/userController");
const { protect } = require("../../../middlewares/authMiddleware");

router.post("/login", login);
router.route("/profile").get(protect, getUserProfile);
router.post("/register", register);

module.exports = router;
