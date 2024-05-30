const express = require("express");
const {
  adminProtect,
  protect,
  ownerOrAdminProtect,
} = require("../../../middlewares/authMiddleware");
const {
  registerCard,
  loadBalance,
  deductBalance,
} = require("../controllers/cardController");
const router = express.Router();

router.post("/register", protect, adminProtect, registerCard);
router.post("/load", loadBalance);
router.post("/deduct", protect, ownerOrAdminProtect, deductBalance);

module.exports = router;
