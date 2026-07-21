import { useState } from "react";
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
import testimonialImg from "../assets/testimonial_img.jpg"

function PosterCard({ img, onAdd }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden ring-1 ring-ink-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-accent-400">
      <img src={img} alt="The Time Has Come" className="w-full h-40 sm:h-48 object-cover" />
      <div className="p-3">
        <p className="text-[11px] text-ink-500 mb-1">Will Leitch</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm whitespace-nowrap">
            <span className="font-bold">$ 27.89</span>{" "}
            <span className="text-ink-500 line-through text-xs">$ 30.99</span>
          </p>
          <button
            onClick={onAdd}
            className="h-8 px-3 rounded-full bg-accent-500 text-white text-[11px] font-medium inline-flex items-center justify-center gap-1.5 transition-colors hover:bg-accent-600 whitespace-nowrap"
          >
            <FaCartShopping size={11} /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(true);

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
  const books = Array.from({ length: 12 });
  const software = Array.from({ length: 12 });

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

  return (
    <div>
      <HomeNavbar />

      <section className="relative overflow-hidden bg-brand-500">
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
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/register")}
                className="h-14 px-10 rounded-full bg-white/25 text-white font-semibold text-lg transition-colors hover:bg-accent-500"
              >
                Join for free
              </button>
              <button className="flex items-center gap-3 text-white font-medium group">
                <span className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-brand-500 transition-all group-hover:scale-105 group-hover:text-accent-500">
                  <FaPlay size={16} />
                </span>
                <span className="text-lg transition-colors group-hover:text-accent-300">
                  Watch how it works
                </span>
              </button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end items-end h-full">
            <img
              src={homeHero}
              alt="Family"
              className="max-h-[680px] w-full object-contain object-bottom"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 100"
            className="w-full"
            preserveAspectRatio="none"
            fill="#ffffff"
          >
            <path d="M0,60 C360,120 1080,120 1440,60 L1440,100 L0,100 Z" />
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
              <p className="text-sm text-ink-500 mb-1">3 April, 2025</p>
              <h3 className="text-xl font-bold mb-4">
                30-Day
                <br />
                Challenges
              </h3>
              <button
                onClick={() => navigate("/challenges")}
                className="h-10 px-5 rounded-full bg-accent-500 text-white text-sm font-medium transition-colors hover:bg-accent-600"
              >
                Continue Challenge
              </button>
            </div>
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center"
              style={{ background: "conic-gradient(#4caf50 65%, #eef0f4 0)" }}
            >
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center font-bold">
                65 %
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
              Guided <span className="text-brand-500">Therapy <br /> Sessions</span>
            </h3>
            <p className="text-ink-500 text-xl max-w-md">
              Professional therapy sessions designed to support children's
              emotional well-being and provide parents with guidance to nurture
              growth at home
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-3">
              <span className="text-brand-500">
                Community Support <br /> Solutions
              </span>{" "}
              For Every Problem
            </h3>
            <p className="text-ink-500 text-xl max-w-md">
              Creating a supportive community where parents, children, and
              trainers can share experiences, find solutions, and grow together.
            </p>
          </div>
          <div className="relative max-w-md mx-auto w-full">
            <span className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-yellow-400 z-10">
              <FaStar size={18} />
            </span>
            <span className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-accent-500 z-10">
              <FaBookOpen size={18} />
            </span>

            <div className="rounded-2xl bg-white shadow-lg ring-1 ring-ink-100 overflow-hidden">
              <div className="bg-accent-500 px-8 py-4 text-center">
                <h4 className="text-white font-semibold">Community Solutions</h4>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-semibold">
                    KA
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-tight">Kofi Amoah</p>
                    <span className="inline-block text-[11px] bg-brand-50 text-brand-500 px-2 py-0.5 rounded-full mt-0.5">
                      Sleep &amp; Routines
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-yellow-400 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} size={12} />
                  ))}
                </div>
                <p className="text-sm text-ink-700 leading-relaxed mb-3">
                  "This was our first time using a guided routine and we were
                  understandably anxious. We were pleasantly surprised at how
                  smoothly it went — we'd definitely recommend it!"
                </p>
                <button className="text-accent-500 text-xs font-medium hover:underline">
                  Read More
                </button>
              </div>
            </div>

            <span className="absolute -bottom-3 right-8 w-3 h-3 rounded-full bg-brand-500" />
            <span className="absolute top-10 -right-2 w-2 h-2 rounded-full bg-brand-300" />
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-2">
            Comprehensive{" "}
            <span className="text-brand-500">Parent & Child Courses</span>
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
                  Lorem ipsum dolor sit amet, consectetur adipising elit, sed do
                  eiusmod tempor
                </p>
                <button
                  onClick={() => navigate(`/courses/${c}`)}
                  className="w-full h-10 rounded-full bg-accent-500 text-white text-sm font-medium transition-colors hover:bg-accent-600"
                >
                  View Detail
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Comprehensive <span className="text-brand-500">Parent & Child Courses</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((_, i) => (
            <div
              key={i}
              className="flex gap-4 p-3 rounded-xl ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-accent-400 hover:bg-brand-50"
            >
              <img src={bookImg} alt="" className="w-24 h-36 rounded-lg object-cover shrink-0" />
              <div className="flex flex-col">
                <h4 className="font-semibold text-sm mb-1">The Time Has Come</h4>
                <p className="text-xs text-ink-500 mb-2">Lindbergh's Pharmacy is an Athens, Georgia, institution...</p>
                <p className="text-sm mb-3"><span className="font-bold">$ 27.89</span> <span className="text-ink-500 line-through text-xs">$ 30.99</span></p>
                <button
                  onClick={() => alert("Added to basket!")}
                  className="mt-auto h-9 px-4 rounded-full bg-accent-500 text-white text-xs font-medium transition-colors hover:bg-accent-600 self-start"
                >
                  Add to basket
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/courses" className="text-sm text-brand-500 font-medium hover:underline">See all</Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Comprehensive <span className="text-brand-500">Parent & Child Software Solutions</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {software.map((_, i) => (
            <div
              key={i}
              className="flex gap-4 p-3 rounded-xl ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-accent-400 hover:bg-brand-50"
            >
              <img src={bookImg} alt="" className="w-24 h-36 rounded-lg object-cover shrink-0" />
              <div className="flex flex-col">
                <h4 className="font-semibold text-sm mb-1">The Time Has Come</h4>
                <p className="text-xs text-ink-500 mb-2">Lindbergh's Pharmacy is an Athens, Georgia, institution...</p>
                <p className="text-sm mb-3"><span className="font-bold">$ 27.89</span> <span className="text-ink-500 line-through text-xs">$ 30.99</span></p>
                <button
                  onClick={() => alert("Added to basket!")}
                  className="mt-auto h-9 px-4 rounded-full bg-accent-500 text-white text-xs font-medium transition-colors hover:bg-accent-600 self-start"
                >
                  Add to basket
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          Pricing <span className="text-brand-500">And Subscription</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {pricing.map((p) => (
            <div
              key={p.tag}
              className={`relative rounded-2xl p-6 bg-white transition-all duration-200 hover:-translate-y-1 ${
                p.featured
                  ? "shadow-sm hover:shadow-2xl"
                  : "shadow-sm ring-1 ring-ink-100 hover:shadow-xl hover:ring-brand-300"
              }`}
            >
              {p.best && (
                <span className="absolute top-6 right-6 text-[10px] font-semibold text-brand-500 border border-brand-500 px-2.5 py-0.5 rounded-full">
                  BEST !
                </span>
              )}
              <p className={`flex items-center gap-1.5 text-sm font-medium mb-2 ${p.iconColor}`}>
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
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${p.checkBg} ${p.checkColor}`}>
                      <FaCheck size={9} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/register")}
                className={`w-full h-11 rounded-full font-medium text-sm transition-all hover:scale-[1.02] ${p.featured ? "bg-brand-500 text-white hover:bg-brand-600" : "border border-ink-300 text-ink-700 hover:border-accent-500 hover:text-accent-500"}`}
              >
                {p.btn}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[#2F327D] text-sm tracking-widest mb-3">
              ————— TESTIMONIAL
            </p>
            <h2 className="text-[#2F327D] font-[Nunito Sans] text-4xl font-bold mb-4">What They Say?</h2>
            <p className="text-[#2F327D] text-xl mb-3">
              TOTC has got more than 100k positive ratings <br /> from our users around
              the world.
            </p>
            <p className="text-[#2F327D]  text-xl mb-6">
              Some of the students and teachers were <br /> greatly helped by the
              Skilline.
            </p>
            <p className="text-[#2F327D] text-xl mb-6">Are you too? Please give your assessment</p>
            <button
              onClick={() => navigate("/courses")}
              className="h-11 px-6 rounded-full border border-ink-300 text-ink-700 text-sm font-medium transition-colors hover:border-accent-500 hover:text-accent-500"
            >
              Write your assessment
            </button>
          </div>
          <div className="relative">
            <img
              src={testimonialImg}
              alt=""
              className="w-full rounded-2xl object-cover"
            />
            <div className="absolute -bottom-7 -right-4 bg-white rounded-xl p-4 shadow-lg max-w-xs">
              <p className="text-xs text-ink-700 mb-2">
                "Thank you so much for your help. It's exactly what I've been
                looking for. You won't regret it. It really saves me time and
                effort. TOTC is exactly what our business has been looking."
              </p>
              <p className="text-sm font-semibold">Gloria Rose</p>
              <p className="text-[10px] text-ink-500">
                ★★★★★ 12 reviews at Yelp
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <NotificationModal
        isOpen={showNotif}
        onClose={() => setShowNotif(false)}
        onAllow={() => setShowNotif(false)}
      />
    </div>
  );
}
