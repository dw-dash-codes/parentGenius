import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaUsers,
  FaUser,
  FaBookOpen,
  FaCartShopping,
  FaPlay,
  FaStar,
  FaCheck,
} from "react-icons/fa6";
import NotificationModal from "../components/NotificationModal";
import HomeNavbar from "../components/HomeNavbar";
import Footer from "../components/Footer";
import homeHero from "../assets/home_hero.png";
import bookImg from "../assets/book_img.png";
import therapyImg from "../assets/Home_therapy_img.png";
import courseImg from "../assets/home_course_img.png";
import testimonialImg from "../assets/testimonial_img.jpg";
import homeBanner from "../assets/home_banner.jpg";

export default function Home() {
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
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
          setUser(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const trainingCards = [
    {
      title: "Parent Training",
      to: "/training/parent",
      color: "bg-brand-500",
      headingColor: "text-brand-500",
      icon: <FaClipboardList size={22} />,
      text: "Guiding parents with the skills, tools, and confidence they need to support their child's growth and development.",
    },
    {
      title: "Child Training",
      to: "/training/child",
      color: "bg-brand-500",
      headingColor: "text-brand-500",
      icon: <FaUsers size={22} />,
      text: "Empowering children with essential skills, confidence, and guidance to learn, grow, and succeed in every stage of life.",
    },
    {
      title: "Guided Tutorials",
      to: "/training/tutorials",
      color: "bg-brand-500",
      headingColor: "text-brand-500",
      icon: <FaBookOpen size={22} />,
      text: "Easy-to-follow tutorials designed to simplify learning for both parents and children, making every step clear and practical.",
    },
  ];

  const courses = [1, 2, 3, 4];
  const books = Array.from({ length: 6 });
  const software = Array.from({ length: 6 });

  const pricing = [
    {
      tag: "Basic",
      price: "Free",
      per: "/ Forever",
      btn: "Try for free",
      featured: false,
      icon: <FaUser size={12} />,
      iconColor: "text-ink-500",
      checkBg: "bg-ink-100",
      checkColor: "text-ink-700",
      features: [
        "Components-driven system",
        "Sales-boosting landing pages",
        "Awesome Feather icons pack",
      ],
    },
    {
      tag: "Individual",
      price: "$24",
      per: "/ Month",
      btn: "Regular license",
      featured: true,
      best: true,
      icon: <FaUser size={12} />,
      iconColor: "text-brand-500",
      checkBg: "bg-yellow-100",
      checkColor: "text-yellow-500",
      features: [
        "Components-driven system",
        "Sales-boosting landing pages",
        "Awesome Feather icons pack",
        "Themed into 3 different styles",
        "Will help to learn Figma",
      ],
    },
    {
      tag: "Corporate",
      price: "$12",
      per: "/ Editor",
      btn: "Extended license",
      featured: false,
      icon: <FaUsers size={12} />,
      iconColor: "text-brand-500",
      checkBg: "bg-green-100",
      checkColor: "text-green-500",
      features: [
        "Components-driven system",
        "Sales-boosting landing pages",
        "Awesome Feather icons pack",
        "Themed into 3 different styles",
      ],
    },
  ];

  const isSubscribed = user && user.tier && user.tier !== "Tier 1";
  
  const streak = user?.streakDays || 0;
  const challengeProgressPercent = Math.min(Math.round((streak / 30) * 100), 100);

  return (
    <div>
      <HomeNavbar />

      <section className="relative overflow-hidden bg-brand-500">
        <img
          src={homeBanner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <span className="absolute top-24 right-[20%] w-3 h-3 rounded-full bg-white/70" />
        <span className="absolute top-16 right-[6%] w-2 h-2 rounded-full bg-white/60" />

        <div className="relative max-w-7xl mx-auto px-6 pt-40 pb-32 grid lg:grid-cols-2 gap-8 items-center min-h-[600px]">
          <div className="text-white">
            <h1 className="text-4xl lg:text-[2.75rem] font-bold leading-tight mb-6 max-w-md">
              Even a 10-minute play break can
              <br />
              brighten your child's day.
            </h1>
            <p className="text-lg leading-relaxed mb-10 max-w-md text-white/90">
              ParentGenius is an interesting platform that will teach you in
              more an interactive way
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => navigate(user ? "/account" : "/register")}
                className="h-11 px-6 text-sm sm:h-14 sm:px-10 sm:text-lg rounded-full bg-white/25 text-white font-semibold transition-colors hover:bg-accent-500 cursor-pointer"
              >
                {user ? `Welcome, ${user.fullName || "Parent"}` : "Join for free"}
              </button>
              <button className="flex items-center gap-2 sm:gap-3 text-white font-medium group cursor-pointer">
                <span className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center text-brand-500 transition-all group-hover:scale-105 group-hover:text-accent-500">
                  <FaPlay className="text-xs sm:text-base" />
                </span>
                <span className="text-sm sm:text-lg transition-colors group-hover:text-accent-300">
                  Watch how it works
                </span>
              </button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end items-end h-full">
            <img
              src={homeHero}
              alt="Family"
              className="max-h-none w-full object-contain scale-250 object-bottom"
            />
          </div>
        </div>

        <div className="absolute -bottom-3 -left-3 -right-3">
          <svg
            viewBox="-208 518 1440 120"
            className="w-full"
            preserveAspectRatio="none"
            fill="#ffffff"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              d="M-205.4335 518.2226C4.0271 610.9906 490 617.2273 490 617.2273 490 617.2273 999.8984 624.4827 1226.3129 523.772L1232 629.7912 490 637.2273-208 629.7912Z"
            />
          </svg>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-3">
          All-In-One <span className="text-brand-500">Training Center</span>
        </h2>
        <p className="text-ink-500 max-w-2xl mx-auto mb-10">
          ParentGenius is a powerful online platform that brings together all
          the essential tools to run a successful training center for children
          and parents.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {trainingCards.map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-ink-100 text-center block transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-accent-400"
            >
              <div
                className={`w-14 h-14 rounded-full ${c.color} mx-auto mb-4 flex items-center justify-center text-white`}
              >
                {c.icon}
              </div>
              <h3 className={`font-bold ${c.headingColor} mb-2`}>{c.title}</h3>
              <p className="text-sm text-ink-500">{c.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-2">
          Our <span className="text-brand-500">Features</span>
        </h2>
        <p className="text-center text-ink-500 mb-12">
          This very extraordinary feature, can make learning activities more
          efficient
        </p>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-3">
              <span className="text-brand-500">Guided Progress Path</span> For
              Parents and Childrens
            </h3>
            <p className="text-ink-500 text-xl max-w-md">
              Track and support every stage of your child's learning journey
              with clear guidance for parents and structured training for
              children.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-ink-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-ink-500 mb-1">Streak: Day {streak}</p>
              <h3 className="text-xl font-bold mb-4">
                30-Day
                <br />
                Challenges
              </h3>
              <button
                onClick={() => navigate("/challenges")}
                className="h-10 px-5 rounded-full bg-accent-500 text-white text-sm font-medium transition-colors hover:bg-accent-600 cursor-pointer"
              >
                Continue Challenge
              </button>
            </div>
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center"
              style={{ background: `conic-gradient(#4caf50 ${challengeProgressPercent}%, #eef0f4 0)` }}
            >
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center font-bold">
                {challengeProgressPercent} %
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-13 items-center">
          <img
            src={therapyImg}
            alt="Expert therapist guidance for families"
            className="w-full h-auto object-contain"
          />
          <div>
            <h3 className="text-3xl font-bold mb-6">
              Guided{" "}
              <span className="text-brand-500">
                Therapy <br /> Sessions
              </span>
            </h3>
            <p className="text-ink-500 text-xl max-w-md">
              Professional therapy sessions designed to support children's
              emotional well-being and provide parents with guidance to nurture
              growth at home
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-2">
            Comprehensive <span className="text-brand-500">Parent & Child Courses</span>
          </h2>
          <div className="flex items-center justify-between mb-8 mt-6">
            <h3 className="font-bold">Courses For You</h3>
            <Link
              to="/courses"
              className="text-sm text-brand-500 font-medium hover:text-accent-600 hover:underline"
            >
              See all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((c) => (
              <div
                key={c}
                className="bg-white rounded-2xl p-3 ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-accent-400"
              >
                <img
                  src={courseImg}
                  alt=""
                  className="w-full h-40 rounded-xl object-cover mb-3"
                />
                <div className="flex items-center gap-3 text-xs text-ink-500 mb-2 px-1">
                  <span>▦ Parenting Guidance</span>
                  <span>◷ 3 Month</span>
                </div>
                <h4 className="font-semibold mb-2 px-1 text-sm">
                  Step-by-Step Parenting and Children Guidance
                </h4>
                <p className="text-xs text-ink-500 mb-4 px-1">
                  Learn practical tools to manage your daily routines and child behavior efficiently.
                </p>
                <button
                  onClick={() => navigate(`/courses/${c}`)}
                  className="w-full h-10 rounded-full bg-accent-500 text-white text-sm font-medium transition-colors hover:bg-accent-600 cursor-pointer"
                >
                  View Detail
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!isSubscribed && (
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pricing <span className="text-brand-500">And Subscription</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {pricing.map((p) => (
              <div
                key={p.tag}
                className={`relative rounded-2xl p-6 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl ${
                  p.featured ? "" : "ring-1 ring-ink-100"
                }`}
              >
                {p.best && (
                  <span className="absolute top-6 right-6 text-[10px] font-semibold text-brand-500 border border-brand-500 px-2.5 py-0.5 rounded-full">
                    BEST !
                  </span>
                )}
                <p
                  className={`flex items-center gap-1.5 text-sm font-medium mb-2 ${p.iconColor}`}
                >
                  {p.icon} {p.tag}
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold">{p.price}</span>
                  <span className="text-xs uppercase text-ink-500">{p.per}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-ink-700"
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${p.checkBg} ${p.checkColor}`}
                      >
                        <FaCheck size= {9} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/register")}
                  className={`w-full h-11 rounded-full font-medium text-sm transition-all hover:scale-[1.02] cursor-pointer ${
                    p.featured
                      ? "bg-brand-500 text-white hover:bg-brand-600"
                      : "border border-ink-300 text-ink-700 hover:border-accent-500 hover:text-accent-500"
                  }`}
                >
                  {p.btn}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />

      <NotificationModal
        isOpen={showNotif}
        onClose={() => setShowNotif(false)}
        onAllow={() => setShowNotif(false)}
      />
    </div>
  );
}