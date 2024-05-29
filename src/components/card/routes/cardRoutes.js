const express = require("express");
const { adminProtect } = require("../../../middlewares/authMiddleware");
const { registerCard } = require("../controllers/cardController");
const router = express.Router();

router.post("/register", adminProtect, registerCard);

module.exports = router;
