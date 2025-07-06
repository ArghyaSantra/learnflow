const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getMetrics = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        enrollments: {
          include: { course: true },
        },
      },
    });

    const metrics = users.map((user) => ({
      email: user.email,
      variant: user.experimentVariant,
      onboardingCompleted: user.onboardingCompleted,
      enrolledCourses: user.enrollments.map((enrollment) => ({
        title: enrollment.course.title,
        startedAt: enrollment.startedAt,
      })),
    }));

    res.json(metrics);
  } catch (err) {
    res.status(500).json({ message: "Error fetching metrics" });
  }
};
