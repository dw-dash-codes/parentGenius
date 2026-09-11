import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaImage } from "react-icons/fa6";
import homeBanner from "../../assets/home_banner.jpg";

export default function Edit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+1",
    phone: "",
    city: "",
    zipCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) return;

        const response = await fetch("${import.meta.env.VITE_API_BASE_URL}/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const nameParts = data.fullName ? data.fullName.split(" ") : ["", ""];
          
          setFormData({
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
            email: data.email || "",
            countryCode: data.countryCode || "+1",
            phone: data.phone || "",
            city: data.city || "",
            zipCode: data.zipCode || "",
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      
      const payload = {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        countryCode: formData.countryCode,
        city: formData.city,
        zipCode: formData.zipCode,
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setMessage({ type: "success", text: "Profile updated successfully! Redirecting..." });
        
        const storage = localStorage.getItem("user") ? localStorage : sessionStorage;
        const currentUser = JSON.parse(storage.getItem("user") || "{}");
        storage.setItem("user", JSON.stringify({ ...currentUser, ...updatedData }));

        setTimeout(() => {
          navigate("/account");
        }, 1200);
      } else {
        const errorData = await response.json();
        setMessage({ type: "error", text: errorData.message || "Failed to update profile" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-accent-500 text-white pt-28 pb-24 px-6 min-h-[750px] flex flex-col justify-center">
        <img
          src={homeBanner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500/95 via-green-600/85 to-accent-500/95" />

        <div className="relative max-w-3xl mx-auto w-full flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-wide">
            Edit Profile
          </h1>

          <div className="relative mb-3">
            <img
              src="https://placehold.co/120x120"
              alt="Profile"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-white shadow-xl"
            />
            <button
              type="button"
              className="absolute bottom-0 right-1 w-8 h-8 rounded-full bg-[#3b4b6b] flex items-center justify-center text-white text-sm ring-2 ring-white shadow-md transition-transform hover:scale-105"
            >
              <FaImage size={13} />
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            {formData.firstName} {formData.lastName}
          </h2>

          {message.text && (
            <div className={`mb-6 px-6 py-3 rounded-xl text-sm font-medium w-full max-w-xl text-center border ${message.type === 'success' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full h-14 rounded-2xl bg-[#f4f7f6] text-ink-900 placeholder:text-ink-700 px-6 text-sm outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-brand-500 shadow-sm"
              />

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full h-14 rounded-2xl bg-[#f4f7f6] text-ink-900 placeholder:text-ink-700 px-6 text-sm outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-brand-500 shadow-sm"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                placeholder="Email Address"
                className="w-full h-14 rounded-2xl bg-[#e8eceb] text-ink-500 placeholder:text-ink-500 px-6 text-sm outline-none ring-1 ring-white/40 shadow-sm cursor-not-allowed"
              />

              <div className="w-full h-14 rounded-2xl bg-[#f4f7f6] text-ink-900 px-4 flex items-center gap-2 ring-1 ring-white/40 focus-within:ring-2 focus-within:ring-brand-500 shadow-sm">
                <span className="text-base shrink-0">🌍</span>
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="bg-transparent text-sm font-medium text-ink-900 outline-none cursor-pointer shrink-0"
                >
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                  <option value="+92">+92</option>
                </select>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-700 outline-none"
                />
              </div>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full h-14 rounded-2xl bg-[#f4f7f6] text-ink-900 placeholder:text-ink-700 px-6 text-sm outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-brand-500 shadow-sm"
              />

              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Zip Code"
                className="w-full h-14 rounded-2xl bg-[#f4f7f6] text-ink-900 placeholder:text-ink-700 px-6 text-sm outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-brand-500 shadow-sm"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-64 h-12 rounded-full bg-brand-500 text-white font-semibold text-base shadow-md transition-all hover:bg-brand-600 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
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