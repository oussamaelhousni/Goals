const asyncHandler = require("express-async-handler");
const Goal = require("./../models/goalModel");
const User = require("./../models/userModel");
// @desc    Get Goals
// @route   GET /api/goals
// @acess   Private
const getGoals = asyncHandler(async (req, res, next) => {
  const goals = await Goal.find({ user: req.user._id });
  res.status(200).json(goals);
});

// @desc    Get Goal
// @route   GET /api/goals/:id
// @acess   Private
const getGoal = asyncHandler(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  res.status(200).json(goal);
});

// @desc    Create Goal
// @route   post /api/goals
// @acess   Private
const createGoal = asyncHandler(async (req, res, next) => {
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user._id,
  });
  res.status(200).json(goal);
});

// @desc    update Goal
// @route   PUT /api/goals/:id
// @acess   Private
const updateGoal = asyncHandler(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new Error("user not found");
  }
  console.log("id", user._id);
  if (goal.user.toString() !== user._id.toString()) {
    throw new Error("Not authorized a sat");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @desc    Delete Goal
// @route   Delete /api/goals/:id
// @acess   Private
const deleteGoal = asyncHandler(async (req, res, next) => {
  const goal = await Goal.findByIdAndRemove(req.params.id);
  res.json(goal);
});

module.exports = { getGoals, getGoal, createGoal, updateGoal, deleteGoal };
