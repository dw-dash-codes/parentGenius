import { Link, useNavigate, NavLink } from "react-router-dom";
import Footer from "../../components/Footer";
import Logo from "../../components/ui/Logo";

export default function Register() {

  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-2xl overflow-hidden h-[500px]">
            <img
              src="src/assets/register-left.jpg"
              alt="Family"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-2xl font-bold">Lorem Ipsum is simply</h2>
              <p className="text-sm opacity-90">Lorem Ipsum is simply</p>
            </div>
          </div>

          <div className="max-w-md mx-auto w-full">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Logo width={300} />
            </div>

            <p className="text-center text-sm text-ink-500 mb-5">
              Welcome to ParentGenius
            </p>

            <div className="flex bg-brand-50 rounded-full p-1 mb-6 max-w-xs mx-auto">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `flex-1 h-9 flex items-center justify-center rounded-full text-sm font-medium ${
                    isActive ? "bg-brand-500 text-white" : "text-brand-500"
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `flex-1 h-9 flex items-center justify-center rounded-full text-sm font-medium ${
                    isActive ? "bg-brand-500 text-white" : "text-brand-500"
                  }`
                }
              >
                Register
              </NavLink>
            </div>

            <p className="text-xs text-ink-500 mb-5">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>

            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your Email Address"
              className="h-12 w-full rounded-full border border-ink-300 px-5 text-sm outline-1 outline-solid outline-(--color-brand-500) focus:border-brand-500 mb-4"
            />

            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your User name"
              className="h-12 w-full rounded-full border border-ink-300 px-5 text-sm outline-1 outline-solid outline-(--color-brand-500) focus:border-brand-500 mb-4"
            />

            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="h-12 w-full rounded-full border border-ink-300 px-5 text-sm outline-1 outline-solid outline-(--color-brand-500) focus:border-brand-500 mb-6"
            />

            <div className="flex justify-end">
              <button
                onClick={() => navigate("/onboarding/profile")}
                className="h-12 w-64 px-10 rounded-full bg-brand-500 text-white font-medium hover:bg-brand-600"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}