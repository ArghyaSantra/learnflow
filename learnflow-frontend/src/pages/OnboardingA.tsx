import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function OnboardingA() {
  const navigate = useNavigate();

  const completeOnboarding = async () => {
    try {
      await API.post("/auth/complete-onboarding"); // token is auto-attached
      navigate("/courses");
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <h1 className="text-3xl font-bold mb-4 text-purple-700">
        Welcome to LearnFlow (Variant A)
      </h1>
      <p className="mb-6 text-gray-700 text-center">
        Let’s get you started in one click!
      </p>
      <button
        onClick={completeOnboarding}
        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
      >
        Complete Onboarding
      </button>
    </div>
  );
}
