const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../components/user/models/Users");

const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user);

      if (req.user) {
        next();
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
});

const adminProtect = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as an admin");
  }
});

const ownerOrAdminProtect = asyncHandler(async (req, res, next) => {
  if (req.user && (req.user.role === "owner" || req.user.role == "admin")) {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as an owner");
  }
});

module.exports = { protect, adminProtect, ownerOrAdminProtect };
