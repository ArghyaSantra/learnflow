const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { getMetrics } = require("../controllers/admin.controller");
const adminCheck = require("../middleware/adminCheck.middleware");

// Optional: Add admin password validation if needed
router.get("/metrics", authMiddleware, adminCheck, getMetrics);

module.exports = router;
