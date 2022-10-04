const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("./../models/userModel");
const _ = require("lodash");

// @desc    register new user
// @route   POST /api/users
// @acess   Public

const register = asyncHandler(async (req, res, next) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    res.status(400);
    throw new Error("Please provide all the fields");
  }
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  // Hash password
  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);

  // create user
  const user = await User.create({
    email,
    name,
    password: hashedPassword,
  });
  res.json({
    ..._.pick(user, ["email", "_id", "name"]),
    token: generateToken(user._id),
  });
});

// @desc    login a user in
// @route   POST /api/users/login
// @acess   Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check for the user
  const user = await User.findOne({ email });

  if (user && (await bycrypt.compare(password, user.password))) {
    return res.json({
      ..._.pick(user, ["email", "_id", "name"]),
      token: generateToken(user._id),
    });
  }
  res.status(400);
  throw new Error("Email or password is invalid");
});
// @desc    get user data
// @route   POST /api/users/me
// @acess   Private

const me = asyncHandler(async (req, res, next) => {
  res.json(req.user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  register,
  login,
  me,
};
