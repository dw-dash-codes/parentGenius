import { useState } from "react";
import { FaImage } from "react-icons/fa6";
import homeBanner from "../../assets/home_banner.jpg";

export default function Edit() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "Ameliajones@gmail.com",
    countryCode: "+1",
    phone: "6456454",
    city: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
              alt="Melissa Smith"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-white shadow-xl"
            />
            <button
              type="button"
              className="absolute bottom-0 right-1 w-8 h-8 rounded-full bg-[#3b4b6b] flex items-center justify-center text-white text-sm ring-2 ring-white shadow-md transition-transform hover:scale-105"
            >
              <FaImage size={13} />
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mb-10">
            Melissa Smith
          </h2>

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
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full h-14 rounded-2xl bg-[#f4f7f6] text-ink-900 placeholder:text-ink-700 px-6 text-sm outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-brand-500 shadow-sm"
              />

              <div className="w-full h-14 rounded-2xl bg-[#f4f7f6] text-ink-900 px-4 flex items-center gap-2 ring-1 ring-white/40 focus-within:ring-2 focus-within:ring-brand-500 shadow-sm">
                <span className="text-base shrink-0">🇨🇦</span>
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="bg-transparent text-sm font-medium text-ink-900 outline-none cursor-pointer shrink-0"
                >
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
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
                className="w-full sm:w-64 h-12 rounded-full bg-brand-500 text-white font-semibold text-base shadow-md transition-all hover:bg-brand-600 active:scale-95"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}