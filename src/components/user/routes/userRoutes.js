const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUserProfile,
  registerOwner,
} = require("../controllers/userController");
const {
  protect,
  adminProtect,
} = require("../../../middlewares/authMiddleware");

router.post("/login", login);
router.route("/profile").get(protect, getUserProfile);
router.post("/register", register);
router.post("/register/owner", protect, adminProtect, registerOwner);

module.exports = router;
