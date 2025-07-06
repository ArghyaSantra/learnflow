import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import API from "../api/axios";

type AdminUser = {
  email: string;
  variant: string;
  onboardingCompleted: boolean;
  enrolledCourses: {
    title: string;
    startedAt: string;
  }[];
};

export default function Admin() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await API.get("/admin/metrics", {
          headers: {
            "x-admin-secret": import.meta.env.VITE_ADMIN_SECRET,
          },
        });
        setUsers(res.data.users);
        setSummary(res.data.summary);
      } catch (err) {
        console.error("Failed to fetch metrics");
      }
    };

    fetchMetrics();
  }, []);

  console.log({ summary });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        Experiment Metrics
      </h1>
      {/*summary && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2">Conversion by Variant</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                {
                  variant: "A",
                  Onboarding: summary.A.completedOnboarding,
                  Enrolled: summary.A.enrolled,
                },
                {
                  variant: "B",
                  Onboarding: summary.B.completedOnboarding,
                  Enrolled: summary.B.enrolled,
                },
              ]}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="variant" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Onboarding" fill="#8884d8" />
              <Bar dataKey="Enrolled" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )*/}
      {summary && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2">
            Conversion Rate by Variant (%)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summary}>
              <XAxis dataKey="variant" />
              <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Legend />
              <Bar dataKey="OnboardingConversion" fill="#8884d8" />
              <Bar dataKey="EnrollmentConversion" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className="overflow-auto rounded shadow bg-white">
        <table className="min-w-full text-left border">
          <thead className="bg-purple-700">
            <tr>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Variant</th>
              <th className="p-3 border">Onboarding</th>
              <th className="p-3 border">Courses Enrolled</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={i}
                className="odd:bg-white even:bg-gray-50 border  text-zinc-800"
              >
                <td className="p-3 border">{u.email}</td>
                <td className="p-3 border">{u.variant}</td>
                <td className="p-3 border">
                  {u.onboardingCompleted ? "✅" : "❌"}
                </td>
                <td className="p-3 border text-zinc-800">
                  {u.enrolledCourses.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {u.enrolledCourses.map((c, j) => (
                        <li key={j}>
                          {c.title} (
                          {new Date(c.startedAt).toLocaleDateString()})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
