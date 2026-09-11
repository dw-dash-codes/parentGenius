import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaLock,
  FaRegBookmark,
  FaClock,
  FaLightbulb,
  FaPlay
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

const SOCIALS = [
  { icon: <FaTwitter />, color: "text-sky-500" },
  { icon: <FaFacebookF />, color: "text-blue-600" },
  { icon: <FaYoutube />, color: "text-red-600" },
  { icon: <FaInstagram />, color: "text-pink-500" },
  { icon: <FaTelegramPlane />, color: "text-sky-400" },
  { icon: <FaWhatsapp />, color: "text-green-500" },
];

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [course, setCourse] = useState(null);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Track which lesson is currently playing
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const resCourse = await fetch(`${API_BASE}/api/courses/${id}`);
        if (resCourse.ok) {
          const data = await resCourse.json();
          setCourse(data);
          setActiveLessonIndex(0);
        }

        const resRecommended = await fetch(`${API_BASE}/api/courses`);
        if (resRecommended.ok) {
          const allCourses = await resRecommended.json();
          setRecommendedCourses(allCourses.filter((c) => (c._id || c.id) !== id).slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching course detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-ink-500">Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <button
          onClick={() => navigate("/courses")}
          className="h-11 px-6 rounded-full bg-brand-500 text-white font-medium cursor-pointer"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  const activeVideoUrl = course.lessons && course.lessons.length > 0 
    ? course.lessons[activeLessonIndex]?.videoUrl 
    : null;
    
  const lessonsCount = course.lessons ? course.lessons.length : 0;

  return (
    <div>
      <section className="relative bg-black border-b border-ink-100 flex justify-center">
        {activeVideoUrl ? (
          <video
            key={activeVideoUrl}
            src={activeVideoUrl}
            poster={course.image || courseImg}
            controls
            autoPlay
            className="w-full max-w-5xl h-[300px] sm:h-[460px] object-cover"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <img 
            src={course.image || courseImg} 
            alt={course.title}
            className="w-full max-w-5xl h-[300px] sm:h-[460px] object-cover opacity-80"
          />
        )}

        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white pointer-events-none drop-shadow-md">
          <span className="font-bold text-lg sm:text-xl">{course.topic} </span>
          <span className="text-sm sm:text-base">({course.ageGroup})</span>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[1fr_360px] gap-10">
        <main>
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-ink-900">
              {course.title}
            </h1>
            <button
              onClick={() => setSaved(!saved)}
              className={`shrink-0 cursor-pointer transition-colors ${saved ? "text-brand-500" : "text-ink-400"} hover:text-brand-500`}
            >
              <FaRegBookmark size={22} />
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-xl ring-1 ring-brand-200">
              {course.instructor ? course.instructor.charAt(0) : "I"}
            </div>
            <div>
              <p className="font-bold text-ink-900">{course.instructor || "Expert Instructor"}</p>
              <p className="text-sm text-ink-500">Course Instructor</p>
            </div>
          </div>

          <div className="bg-brand-50 rounded-2xl p-6 mb-8 ring-1 ring-brand-100">
            <h3 className="font-bold mb-3 text-ink-900">About This Course</h3>
            <p className="text-sm text-ink-700 leading-relaxed mb-3">
              {course.description}
            </p>
          </div>

          <h3 className="font-bold mb-4 text-ink-900">{lessonsCount} Chapters / Lessons</h3>

          <div className="space-y-3">
            {course.lessons && course.lessons.map((lesson, index) => {
              const isActive = activeLessonIndex === index;
              return (
                <div
                  key={lesson._id || index}
                  onClick={() => lesson.videoUrl && setActiveLessonIndex(index)}
                  className={`rounded-xl p-4 flex items-center gap-4 ring-1 transition-all ${
                    isActive 
                      ? "bg-brand-50 ring-brand-500" 
                      : lesson.videoUrl 
                        ? "bg-ink-50 ring-ink-100 hover:bg-ink-100 cursor-pointer" 
                        : "bg-ink-50/50 ring-ink-100 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <span className={`text-xl font-bold w-8 shrink-0 ${isActive ? "text-brand-500" : "text-ink-400"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    <p className={`font-semibold mb-1 ${isActive ? "text-brand-500" : "text-ink-900"}`}>
                      {lesson.title}
                    </p>
                    <p className="text-xs text-ink-500">
                      Duration: {lesson.duration || "N/A"}
                    </p>
                  </div>

                  <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isActive ? "bg-brand-500 text-white" : "bg-ink-900 text-white"
                  }`}>
                    {lesson.videoUrl ? <FaPlay size={12} className={isActive ? "ml-1" : "ml-1 opacity-80"} /> : <FaLock size={12} />}
                  </span>
                </div>
              );
            })}
          </div>
        </main>

        <aside>
          <div className="flex rounded-xl overflow-hidden bg-brand-500 text-white mb-5 shadow-sm">
            <div className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium">
              <FaClock size={14} /> {course.duration || "N/A"}
            </div>
            <div className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-l border-white/20">
              <FaLightbulb size={14} /> {lessonsCount} Modules
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {/* Database se dynamic tags generate kiye hain */}
            {[course.topic, course.ageGroup].map((tag, i) => (
              tag && (
                <div
                  key={i}
                  className="bg-brand-50 text-brand-500 text-xs font-semibold text-center rounded-lg py-2.5 ring-1 ring-brand-100"
                >
                  {tag}
                </div>
              )
            ))}
          </div>

          <h3 className="font-bold mb-3 text-ink-900">Share this course</h3>

          <div className="flex flex-wrap gap-2">
            {SOCIALS.map((s, i) => (
              <button
                key={i}
                className={`w-9 h-9 rounded-full bg-ink-100 flex items-center justify-center ${s.color} transition-transform hover:scale-110 cursor-pointer`}
              >
                {s.icon}
              </button>
            ))}
          </div>
        </aside>
      </div>

      {recommendedCourses.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-16 pt-8 border-t border-ink-100 mt-10">
          <h2 className="text-2xl font-bold mb-6 text-ink-900">Recommended for you</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {recommendedCourses.map((c) => {
              const recId = c._id || c.id;
              return (
                <div
                  key={recId}
                  className="bg-white rounded-2xl p-3 ring-1 ring-ink-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-accent-400 flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={c.image || courseImg}
                      alt=""
                      className="w-full h-40 rounded-xl object-cover mb-3"
                    />
                    <div className="flex items-center gap-3 text-xs text-ink-500 mb-2 px-1">
                      <span>▦ {c.topic}</span>
                      <span>◷ {c.duration}</span>
                    </div>
                    <h4 className="font-semibold mb-2 px-1 text-sm line-clamp-1">
                      {c.title}
                    </h4>
                    <p className="text-xs text-ink-500 mb-4 px-1 line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/courses/${recId}`)}
                    className="w-full h-10 rounded-full bg-brand-500 text-white text-sm font-medium transition-colors hover:bg-brand-600 cursor-pointer"
                  >
                    View Detail
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}