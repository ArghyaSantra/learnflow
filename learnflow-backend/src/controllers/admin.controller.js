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

    const variantSummary = {
      A: { total: 0, completedOnboarding: 0, enrolled: 0 },
      B: { total: 0, completedOnboarding: 0, enrolled: 0 },
    };

    users.forEach((user) => {
      const v = user.experimentVariant;
      variantSummary[v].total += 1;
      if (user.onboardingCompleted) variantSummary[v].completedOnboarding += 1;
      if (user.enrollments.length > 0) variantSummary[v].enrolled += 1;
    });

    // Add percentage-based conversions
    const conversionData = ["A", "B"].map((variant) => {
      const v = variantSummary[variant];
      const total = v.total || 1; // avoid divide by zero
      return {
        variant,
        OnboardingConversion: parseFloat(
          ((v.completedOnboarding / total) * 100).toFixed(1)
        ),
        EnrollmentConversion: parseFloat(
          ((v.enrolled / total) * 100).toFixed(1)
        ),
      };
    });

    res.json({ users: metrics, summary: conversionData });
  } catch (err) {
    res.status(500).json({ message: "Error fetching metrics" });
  }
};
