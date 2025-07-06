const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};

exports.enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
    });

    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (err) {
    res.status(500).json({ message: "Error enrolling in course" });
  }
};
