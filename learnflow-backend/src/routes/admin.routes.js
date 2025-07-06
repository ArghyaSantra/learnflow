const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { getMetrics } = require("../controllers/admin.controller");

// Optional: Add admin password validation if needed
router.get("/metrics", authMiddleware, getMetrics);

module.exports = router;
