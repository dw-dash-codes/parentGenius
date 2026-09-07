import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Footer from "../../components/Footer";
import Logo from "../../components/ui/Logo";
import img from "../../assets/register-left.jpg";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("${import.meta.env.VITE_API_BASE_URL}/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("token", data.user.token);
      }

      navigate("/onboarding/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-2xl overflow-hidden h-[500px]">
            <img src={img} alt="Family" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-2xl font-bold">Join ParentGenius</h2>
              <p className="text-sm opacity-90">Start your parenting journey today</p>
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

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-xl text-xs mb-4 text-center border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your Email Address"
                className="h-12 w-full rounded-full border border-ink-300 px-5 text-sm outline-none focus:border-brand-500 mb-4"
              />

              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter your Username"
                className="h-12 w-full rounded-full border border-ink-300 px-5 text-sm outline-none focus:border-brand-500 mb-4"
              />

              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your Password"
                className="h-12 w-full rounded-full border border-ink-300 px-5 text-sm outline-none focus:border-brand-500 mb-6"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-64 px-10 rounded-full bg-brand-500 text-white font-medium hover:bg-brand-600 disabled:opacity-50"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}