import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function OnboardingB() {
  const navigate = useNavigate();

  const completeOnboarding = async () => {
    try {
      await API.post("/auth/complete-onboarding");
      navigate("/courses");
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <h1 className="text-3xl font-bold mb-2 text-purple-700">
        Welcome to LearnFlow (Variant B)
      </h1>
      <p className="mb-2 text-gray-700 text-center">
        Let's understand your goals.
      </p>
      <ul className="mb-6 list-disc text-left text-gray-600">
        <li>Learn Web Development</li>
        <li>Explore Data Science</li>
        <li>Master Algorithms</li>
      </ul>
      <button
        onClick={completeOnboarding}
        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
      >
        Finish & Go to Dashboard
      </button>
    </div>
  );
}
