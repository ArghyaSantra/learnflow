const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  getCourses,
  enrollInCourse,
} = require("../controllers/course.controller");

router.get("/", authMiddleware, getCourses);
router.post("/enroll/:courseId", authMiddleware, enrollInCourse);

module.exports = router;
