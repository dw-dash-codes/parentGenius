import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaPlay,
  FaLock,
  FaRegBookmark,
  FaClock,
  FaLightbulb,
  FaCircleCheck,
  FaExpand,
} from "react-icons/fa6";
import {
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import courseImg from "../assets/home_course_img.png";
import classroomImg from "../assets/home_course_img.png";

const CHAPTERS = [1, 2, 3, 4, 5];
const TAGS = Array.from({ length: 10 });
const SOCIALS = [
  { icon: <FaTwitter />, color: "text-sky-500" },
  { icon: <FaFacebookF />, color: "text-blue-600" },
  { icon: <FaYoutube />, color: "text-red-600" },
  { icon: <FaInstagram />, color: "text-pink-500" },
  { icon: <FaTelegramPlane />, color: "text-sky-400" },
  { icon: <FaWhatsapp />, color: "text-green-500" },
];

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const recommended = [1, 2, 3, 4];

  return (
    <div>
      <section className="relative bg-black">
        <video
          src=""
          poster={courseImg}
          controls
          className="w-full h-[300px] sm:h-[460px] object-cover"
        >
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white pointer-events-none">
          <span className="font-bold text-lg sm:text-xl">Topic Name </span>

          <span className="text-sm sm:text-base">
            (Time and Territory Management)
          </span>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[1fr_360px] gap-10">
        <main>
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Project Management for the Unofficial Project Manager
            </h1>

            <button
              onClick={() => setSaved(!saved)}
              className={`shrink-0 ${saved ? "text-brand-500" : "text-ink-400"} hover:text-brand-500`}
            >
              <FaRegBookmark size={22} />
            </button>

          </div>

          <div className="flex items-center gap-3 mb-6">
            <img
              src="https://placehold.co/48x48"
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-bold">James wood</p>

              <p className="text-sm text-ink-500">A FanklinConvey Title</p>

            </div>

          </div>

          <div className="bg-brand-50 rounded-2xl p-6 mb-8">
            <h3 className="font-bold mb-3">About this Topic</h3>

            {[1, 2, 3].map((i) => (
              <p key={i} className="text-sm text-ink-700 mb-3 last:mb-0">
                Getting Along (2022) describes the importance of workplace
                interactions and their effects on productivity and creativity.
              </p>

            ))}
          </div>

          <h3 className="font-bold mb-4">56 Chapters</h3>

          <div className="space-y-3">
            {CHAPTERS.map((n) => (
              <div
                key={n}
                className="bg-ink-50 rounded-xl p-4 flex items-center gap-4 ring-1 ring-ink-100"
              >
                <span className="text-xl font-bold text-ink-400 w-8 shrink-0">
                  {String(n).padStart(2, "0")}
                </span>

                <div className="flex-1">
                  <p className="font-semibold text-brand-500 mb-1">
                    Introducion
                  </p>

                  <p className="text-xs text-ink-500">
                    Subscribe to unlock all 2 key ideas from book. Subscribe to
                    unlock all 2 key ideas from book
                  </p>

                </div>

                <span className="w-10 h-10 rounded-full bg-ink-900 text-white flex items-center justify-center shrink-0">
                  <FaLock size={14} />
                </span>

              </div>

            ))}
          </div>

        </main>

        <aside>
          <div className="flex rounded-xl overflow-hidden bg-brand-500 text-white mb-5">
            <div className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium">
              <FaClock size={14} /> 18 min
            </div>

            <div className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-l border-white/20">
              <FaLightbulb size={14} /> 6 key ideas
            </div>

          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {TAGS.map((_, i) => (
              <button
                key={i}
                className="bg-brand-50 text-brand-500 text-sm rounded-lg py-2.5 transition-colors hover:bg-brand-100"
              >
                Child Growth
              </button>

            ))}
          </div>

          <h3 className="font-bold mb-3">This Course included</h3>

          <div className="space-y-2 pb-6 border-b border-ink-100 mb-6">
            {[1, 2, 3].map((i) => (
              <p
                key={i}
                className="flex items-center gap-2 text-sm text-ink-700"
              >
                <FaCircleCheck className="text-accent-500" size={16} /> Lorem
                Ipsum
              </p>

            ))}
          </div>

          <h3 className="font-bold mb-2">Training 5 or more people</h3>

          <p className="text-xs text-ink-500 pb-6 border-b border-ink-100 mb-6">
            Class, launched less than a year ago by Blackboard co-founder
            Michael Chasen, integrates exclusively...
          </p>

          <h3 className="font-bold mb-3">Share this course</h3>

          <div className="flex flex-wrap gap-2">
            {SOCIALS.map((s, i) => (
              <button
                key={i}
                className={`w-9 h-9 rounded-full bg-ink-100 flex items-center justify-center ${s.color} transition-transform hover:scale-110`}
              >
                {s.icon}
              </button>

            ))}
          </div>

        </aside>

      </div>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Everything you can do in a physical classroom,{" "}
              <span className="text-brand-500">
                you can do with ParentGenius
              </span>

            </h3>

            <p className="text-ink-500 mb-4">
              TOTC's school management software helps traditional and online
              schools manage scheduling, attendance, payments and virtual
              classrooms all in one secure cloud-based system.
            </p>
            <a href="#" className="text-brand-500 font-medium underline">
              Learn more
            </a>
          </div>
          <div className="relative">
            <video
              src=""
              poster={classroomImg}
              controls
              className="w-full rounded-2xl object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6">Recommended for you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {recommended.map((c) => (
            <div
              key={c}
              className="bg-white rounded-2xl p-3 ring-1 ring-ink-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-accent-400"
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
      </section>
    </div>
  );
}
