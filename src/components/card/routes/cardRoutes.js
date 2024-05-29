const express = require("express");
const {
  adminProtect,
  protect,
} = require("../../../middlewares/authMiddleware");
const { registerCard } = require("../controllers/cardController");
const router = express.Router();

router.post("/register", protect, adminProtect, registerCard);

module.exports = router;
