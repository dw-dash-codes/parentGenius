import { useState } from "react";
import { useNavigate } from "react-router-dom";
import homeBanner from "../../assets/home_banner.jpg";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters long." });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/users/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Password changed successfully! Redirecting..." });
        setTimeout(() => {
          navigate("/account");
        }, 1200);
      } else {
        setMessage({ type: "error", text: data.message || "Failed to change password." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-accent-500 text-white pt-28 pb-24 px-6 min-h-[780px] flex flex-col items-center justify-center">
        <img
          src={homeBanner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500/95 via-green-600/85 to-accent-500/95" />

        <div className="relative max-w-2xl mx-auto w-full flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-wide">
            Change Password
          </h1>

          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl mb-4">
            You will be logged out of all sessions except this one to protect your account if anyone is trying to gain access.
          </p>

          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl mb-8">
            Your password must be at least 6 characters and should include a combination of numbers, letters and special characters.
          </p>

          {message.text && (
            <div className={`mb-6 px-6 py-3 rounded-xl text-sm font-medium w-full max-w-md text-center border ${message.type === 'success' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full max-w-md text-left space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Current password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="**********"
                className="w-full h-14 rounded-2xl bg-[#f4f7f6] text-ink-900 placeholder:text-ink-500 px-6 text-sm outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-brand-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                New password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="**********"
                className="w-full h-14 rounded-2xl bg-[#f4f7f6] text-ink-900 placeholder:text-ink-500 px-6 text-sm outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-brand-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Confirm new password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="**********"
                className="w-full h-14 rounded-2xl bg-[#f4f7f6] text-ink-900 placeholder:text-ink-500 px-6 text-sm outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-brand-500 shadow-sm"
              />
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-48 h-12 rounded-full bg-[#4ba35a] hover:bg-[#3f8f4c] text-white font-bold text-base shadow-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}