const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  completeOnboarding,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Signup Route
router.post("/signup", signup);

// Login Route
router.post("/login", login);

router.post("/complete-onboarding", authMiddleware, completeOnboarding);

module.exports = router;
