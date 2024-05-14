const asyncHandler = require("express-async-handler");
const User = require("../models/Users");
const { genToken } = require("../../../utils/generateToken");

//Regisiter a new user
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.create({ username, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User");
  }
});

//Login with an existing user
const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

module.exports = { register, login };
