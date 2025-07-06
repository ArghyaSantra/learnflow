const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.course.createMany({
    data: [
      {
        title: "Learn JavaScript Basics",
        description: "Intro to JS variables & functions",
        videoUrl: "/videos/js-intro.mp4",
      },
      {
        title: "Intro to SQL",
        description: "Learn to query a simple database",
        videoUrl: "/videos/sql-intro.mp4",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => console.log("Courses seeded"))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
