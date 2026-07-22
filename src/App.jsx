import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import OnboardingLayout from "./components/layout/OnboardingLayout";
import ProfileSetup from "./pages/onboarding/ProfileSetup";
import ChildrenCount from "./pages/onboarding/ChildrenCount";
import ChildrenAges from "./pages/onboarding/ChildrenAges";
import ParentType from "./pages/onboarding/ParentType";
import ImproveGoals from "./pages/onboarding/ImproveGoals";
import ChildValues from "./pages/onboarding/ChildValues";
import Struggles from "./pages/onboarding/Struggles";
import Confidence from "./pages/onboarding/Confidence";
import EmailOptIn from "./pages/onboarding/EmailOptIn";
import CurrentNeeds from "./pages/onboarding/CurrentNeeds";
import Training from "./pages/Training";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseTopic from "./pages/CourseTopic";
import CourseSolutions from "./pages/CourseSolutions";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<OnboardingLayout/>}>
        <Route path="/onboarding/profile" element={<ProfileSetup />} />
        <Route path="/onboarding/children" element={<ChildrenCount />} />
        <Route path="/onboarding/ages" element={<ChildrenAges />} />
        <Route path="/onboarding/type" element={<ParentType />} />
        <Route path="/onboarding/goals" element={<ImproveGoals />} />
        <Route path="/onboarding/values" element={<ChildValues />} />
        <Route path="/onboarding/struggles" element={<Struggles />} />
        <Route path="/onboarding/confidence" element={<Confidence />} />
        <Route path="/onboarding/email-optin" element={<EmailOptIn />} />
        <Route path="/onboarding/needs" element={<CurrentNeeds />} />
      </Route>

      <Route path="/home" element={<Home/>} />

      <Route element={<MainLayout />}>
        <Route path="/training/:tab" element={<Training />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/topic/:topic" element={<CourseTopic />} />
        <Route path="/courses/solutions/:topic" element={<CourseSolutions />} />
      </Route>
    </Routes>
  );
}