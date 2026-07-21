import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Logo from "../ui/Logo";


export default function OnboardingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-5xl w-full mx-10 pt-8">
        <Logo width={180} />

      </div>

      <main className="flex-1 flex items-start justify-center px-6 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}