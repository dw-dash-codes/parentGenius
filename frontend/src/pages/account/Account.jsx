import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCircleUser,
  FaTrophy,
  FaCrown,
  FaBookmark,
  FaBell,
  FaBellConcierge,
  FaLock,
  FaShieldHalved,
  FaCircleInfo,
} from "react-icons/fa6";
import homeBanner from "../../assets/home_banner.jpg";

export default function Account() {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [userData, setUserData] = useState({
    fullName: "",
    points: 0,
    streakDays: 0,
    tier: "Tier 1",
  });

  useEffect(() => {
    const fetchUserData = async () => {
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
          
          const storage = localStorage.getItem("user") ? localStorage : sessionStorage;
          const currentUser = JSON.parse(storage.getItem("user") || "{}");
          storage.setItem("user", JSON.stringify({ ...currentUser, ...data }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    const localUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (localUser.fullName) {
      setUserData(localUser);
    }

    fetchUserData();
  }, []);

  const accountCards = [
    {
      id: "edit-profile",
      title: "Edit Profile",
      description: "Provide personal details and how we can reach you",
      icon: <FaCircleUser className="text-brand-500" size={26} />,
      onClick: () => navigate("/account/edit"),
    },
    {
      id: "level",
      title: "Level",
      description: "Provide personal details and how we can reach you",
      icon: <FaTrophy className="text-brand-500" size={26} />,
      onClick: () => navigate("/account/level"),
    },
    {
      id: "subscription",
      title: "Subscription",
      description: "Provide personal details and how we can reach you",
      icon: <FaCrown className="text-brand-500" size={26} />,
      onClick: () => navigate("/subscription"),
    },
    {
      id: "bookmarks",
      title: "Bookmarks",
      description: "Provide personal details and how we can reach you",
      icon: <FaBookmark className="text-brand-500" size={24} />,
      onClick: () => navigate("/account/bookmarks"),
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Provide personal details and how we can reach you",
      icon: <FaBell className="text-brand-500" size={26} />,
      isToggle: true,
      enabled: notificationsEnabled,
      onToggle: () => setNotificationsEnabled((prev) => !prev),
    },
    {
      id: "reminders",
      title: "Reminders",
      description: "Provide personal details and how we can reach you",
      icon: <FaBellConcierge className="text-brand-500" size={26} />,
      onClick: () => navigate("/account/reminders"),
    },
    {
      id: "change-password",
      title: "Change Password",
      description: "Provide personal details and how we can reach you",
      icon: <FaLock className="text-brand-500" size={24} />,
      onClick: () => navigate("/account/password"),
    },
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      description: "Provide personal details and how we can reach you",
      icon: <FaShieldHalved className="text-brand-500" size={24} />,
      onClick: () => navigate("/privacy-policy"),
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      description: "Provide personal details and how we can reach you",
      icon: <FaCircleInfo className="text-brand-500" size={26} />,
      onClick: () => navigate("/terms-conditions"),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-accent-500 text-white pt-28 pb-16 px-6">
        <img
          src={homeBanner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500/85 via-green-600/65 to-accent-500/85" />

        <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-wide">
            Account
          </h1>

          <div className="relative mb-3">
            <img
              src="https://placehold.co/120x120"
              alt="Profile Image"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-white shadow-xl"
            />
            <span className="absolute bottom-0 right-1 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white text-base ring-2 ring-white shadow-md">
              🏆
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mb-8">
            {userData.fullName || "User"}
          </h2>

          <div className="grid grid-cols-3 gap-8 sm:gap-16 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black">{userData.points}</p>
              <p className="text-xs sm:text-sm font-medium text-white/85 mt-0.5">
                Points
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black">Day {userData.streakDays}</p>
              <p className="text-xs sm:text-sm font-medium text-white/85 mt-0.5">
                Streak
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black">{userData.tier.replace("Tier ", "0")}</p>
              <p className="text-xs sm:text-sm font-medium text-white/85 mt-0.5">
                Tier
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accountCards.map((card) => (
            <div
              key={card.id}
              onClick={card.onClick ? card.onClick : undefined}
              className={`bg-white rounded-2xl p-6 ring-1 ring-ink-100 flex flex-col justify-between transition-all duration-200 ${
                card.onClick
                  ? "cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:ring-brand-400"
                  : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                    {card.icon}
                  </div>

                  {card.isToggle && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        card.onToggle && card.onToggle();
                      }}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                        card.enabled ? "bg-brand-500" : "bg-ink-300"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                          card.enabled ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  )}
                </div>

                <h3 className="text-base font-bold text-ink-900 mb-1.5">
                  {card.title}
                </h3>
              </div>

              <p className="text-xs text-ink-500 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}