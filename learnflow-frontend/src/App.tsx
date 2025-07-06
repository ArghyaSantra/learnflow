import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import OnboardingA from "./pages/OnboardingA";
import OnboardingB from "./pages/OnboardingB";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import Admin from "./pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Onboarding variants */}
      <Route path="/onboarding/a" element={<OnboardingA />} />
      <Route path="/onboarding/b" element={<OnboardingB />} />

      {/* Learning dashboard */}
      <Route path="/courses" element={<Courses />} />

      {/* Admin metrics */}
      <Route path="/admin" element={<Admin />} />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
