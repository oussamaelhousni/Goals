const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { me, login, register } = require("./../controllers/userController");

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.get("/me", protect, me);

module.exports = router;
