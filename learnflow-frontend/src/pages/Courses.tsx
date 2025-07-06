import { useEffect, useState } from "react";
import API from "../api/axios";

type Course = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
};

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selected, setSelected] = useState<Course | null>(null);

  useEffect(() => {
    // Next Step: Caching the courses, avoid unnecessary calls to courses
    const fetchCourses = async () => {
      try {
        const res = await API.get("/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  const handleStart = async (course: Course) => {
    setSelected(course);
    try {
      await API.post(`/courses/enroll/${course.id}`);
    } catch (err) {
      console.error("Error enrolling in course:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">Your Courses</h1>

      {!selected ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold text-gray-800">
                {course.title}
              </h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <button
                onClick={() => handleStart(course)}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Start Course
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">{selected.title}</h2>
          <video
            src={selected.videoUrl}
            controls
            className="w-full max-w-2xl rounded shadow"
          />
        </div>
      )}
    </div>
  );
}
