import { useState, useEffect } from "react";
import { FaGraduationCap, FaAward } from "react-icons/fa6";
import homeBanner from "../../assets/home_banner.jpg";

export default function Level() {
  const [userData, setUserData] = useState({
    fullName: "User",
    points: 0,
    tier: "Tier 1",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const tiers = [
    {
      tier: "Tier 1",
      title: "NEW USER",
      subtitle: "Let's get to work!",
      range: "(0–199 points)",
      bg: "bg-accent-500",
      icon: <FaGraduationCap className="text-white" size={24} />,
      border: "ring-4 ring-white",
    },
    {
      tier: "Tier 2",
      title: "INTERMEDIATE",
      subtitle: "You've shown great commitment. Keep it up!",
      range: "(200–499 points)",
      bg: "bg-brand-500",
      icon: <FaGraduationCap className="text-white" size={24} />,
      border: "ring-4 ring-white",
    },
    {
      tier: "Tier 3",
      title: "ADVANCED",
      subtitle: "Extremely active, growing, and helpful!",
      range: "(500–999 points)",
      bg: "bg-yellow-500",
      icon: <FaGraduationCap className="text-white" size={24} />,
      border: "ring-4 ring-white",
    },
    {
      tier: "Tier 4",
      title: "EXPERT PARENT",
      subtitle: "Massive commitment and change, incredible engagement. Welldone!",
      range: "(1,000–1,999 points)",
      bg: "bg-ink-900",
      icon: <FaGraduationCap className="text-white" size={24} />,
      border: "ring-4 ring-white",
    },
    {
      tier: "Tier 5",
      title: "PARENT GENIUS",
      subtitle: "Top contributor, incredible mentor & excelled in every area. You've done it!",
      range: "(2,000+ points)",
      bg: "bg-ink-900",
      icon: <FaAward className="text-yellow-400" size={26} />,
      border: "ring-4 ring-yellow-400",
    },
  ];

  const currentPoints = userData.points || 0;
  const progressPercent = Math.min(Math.max((currentPoints / 2000) * 100, 5), 100);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-accent-500 text-white pt-28 pb-16 px-6">
        <img
          src={homeBanner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500/95 via-green-600/85 to-accent-500/95" />

        <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-wide">
            Levels
          </h1>

          <div className="relative mb-3">
            <img
              src="https://placehold.co/120x120"
              alt="Profile"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-white shadow-xl"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mb-1">
            {userData.fullName || "User"}
          </h2>

          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/90 mb-6">
            <span>{userData.tier}</span>
            <FaGraduationCap size={15} />
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-full px-5 py-1.5 text-xs sm:text-sm font-bold text-white mb-8 shadow-sm">
            {currentPoints} Points
          </div>

          <div className="w-full max-w-3xl px-4 sm:px-10">
            <div className="relative">
              <div className="absolute top-[20px] sm:top-[24px] left-6 right-6 h-5 bg-[#182a20]/90 rounded-full overflow-hidden z-0 flex">
                <div style={{ width: `${progressPercent}%` }} className="h-full bg-white transition-all duration-500" />
                <div className="flex-1 h-full bg-[#1e3b2b]/90" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                {tiers.map((t) => (
                  <div key={t.tier} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${t.bg} flex items-center justify-center shadow-lg ${t.border}`}
                    >
                      {t.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-bold mt-2.5 text-white">
                      {t.tier}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-14">
        <h2 className="text-xl sm:text-2xl font-extrabold text-center text-ink-900 mb-8">
          Parent Progress
        </h2>

        <div className="space-y-4">
          {tiers.map((item) => (
            <div
              key={item.tier}
              className="bg-white rounded-2xl p-5 sm:p-6 ring-1 ring-ink-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-brand-400"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${item.bg} flex items-center justify-center shrink-0 shadow-md ${item.border}`}
                >
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-ink-900">
                    {item.tier}: {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-700 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="text-xs sm:text-sm font-bold text-ink-500 sm:text-right shrink-0">
                {item.range}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}