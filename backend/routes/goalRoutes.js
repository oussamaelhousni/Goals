const express = require("express");
const protect = require("./../middlewares/authMiddleware");
const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  getGoal,
} = require("../controllers/goalController");

const router = express.Router();

router.route("/").get(protect, getGoals).post(protect, createGoal);
router
  .route("/:id")
  .get(protect, getGoal)
  .put(protect, updateGoal)
  .delete(protect, deleteGoal);

module.exports = router;
