import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaLock,
  FaRegBookmark,
  FaClock,
  FaLightbulb,
  FaCircleCheck,
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
  const [course, setCourse] = useState(null);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        // Fetch specific course details
        const resCourse = await fetch(`http://localhost:5000/api/courses/${id}`);
        if (resCourse.ok) {
          const data = await resCourse.json();
          setCourse(data);
        }

        // Fetch recommended courses
        const resRecommended = await fetch(`http://localhost:5000/api/courses`);
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

  const chaptersCount = course.lessonsCount || 5;
  const chapters = Array.from({ length: chaptersCount }, (_, i) => i + 1);

  return (
    <div>
      <section className="relative bg-black">
        <video
          src={course.videoUrl || ""}
          poster={course.image || courseImg}
          controls
          className="w-full h-[300px] sm:h-[460px] object-cover"
        >
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white pointer-events-none drop-shadow-md">
          <span className="font-bold text-lg sm:text-xl">{course.topic || "Parenting Guidance"} </span>
          <span className="text-sm sm:text-base">({course.ageGroup || "All Ages"})</span>
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
            <img
              src="https://placehold.co/48x48"
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-bold text-ink-900">{course.instructor || "Expert Instructor"}</p>
              <p className="text-sm text-ink-500">ParentGenius Certified Expert</p>
            </div>
          </div>

          <div className="bg-brand-50 rounded-2xl p-6 mb-8 ring-1 ring-brand-100">
            <h3 className="font-bold mb-3 text-ink-900">About This Course</h3>
            <p className="text-sm text-ink-700 leading-relaxed mb-3">
              {course.description}
            </p>
            <p className="text-sm text-ink-700 leading-relaxed">
              Designed specifically to help families navigate developmental milestones, foster emotional resilience, and build positive daily routines together.
            </p>
          </div>

          <h3 className="font-bold mb-4 text-ink-900">{chaptersCount} Chapters / Lessons</h3>

          <div className="space-y-3">
            {chapters.map((n) => (
              <div
                key={n}
                className="bg-ink-50 rounded-xl p-4 flex items-center gap-4 ring-1 ring-ink-100"
              >
                <span className="text-xl font-bold text-ink-400 w-8 shrink-0">
                  {String(n).padStart(2, "0")}
                </span>

                <div className="flex-1">
                  <p className="font-semibold text-brand-500 mb-1">
                    Lesson {n}: Core Strategy & Practical Steps
                  </p>
                  <p className="text-xs text-ink-500">
                    Comprehensive guidance module with interactive exercises and expert advice.
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
          <div className="flex rounded-xl overflow-hidden bg-brand-500 text-white mb-5 shadow-sm">
            <div className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium">
              <FaClock size={14} /> {course.duration || "3 Months"}
            </div>
            <div className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-l border-white/20">
              <FaLightbulb size={14} /> {chaptersCount} Modules
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {["Child Growth", "Behavior", "Mindset", "Routines", "Communication", "Emotions"].map((tag, i) => (
              <div
                key={i}
                className="bg-brand-50 text-brand-500 text-xs font-semibold text-center rounded-lg py-2.5 ring-1 ring-brand-100"
              >
                {tag}
              </div>
            ))}
          </div>

          <h3 className="font-bold mb-3 text-ink-900">This Course Includes</h3>

          <div className="space-y-2.5 pb-6 border-b border-ink-100 mb-6 text-sm">
            <p className="flex items-center gap-2 text-ink-700">
              <FaCircleCheck className="text-accent-500" size={16} /> Full lifetime access
            </p>
            <p className="flex items-center gap-2 text-ink-700">
              <FaCircleCheck className="text-accent-500" size={16} /> Access on mobile and desktop
            </p>
            <p className="flex items-center gap-2 text-ink-700">
              <FaCircleCheck className="text-accent-500" size={16} /> Certificate of completion
            </p>
          </div>

          <h3 className="font-bold mb-2 text-ink-900">Training 5 or more people?</h3>
          <p className="text-xs text-ink-500 pb-6 border-b border-ink-100 mb-6 leading-relaxed">
            ParentGenius enterprise tools help organizations and community support groups manage parent coaching effectively in one secure platform.
          </p>

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

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center bg-brand-50 rounded-3xl p-8 ring-1 ring-brand-100">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-ink-900">
              Everything you can do in a physical classroom,{" "}
              <span className="text-brand-500">
                you can do with ParentGenius
              </span>
            </h3>
            <p className="text-ink-600 mb-4 leading-relaxed">
              ParentGenius helps parents and family guides manage daily routines, track milestones, and access expert consultations all in one secure platform.
            </p>
            <button
              onClick={() => navigate("/training/tutorials")}
              className="text-brand-500 font-semibold underline cursor-pointer"
            >
              Learn more
            </button>
          </div>
          <div className="relative">
            <video
              src=""
              poster={classroomImg}
              controls
              className="w-full rounded-2xl object-cover shadow-md"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {recommendedCourses.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
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
                      <span>▦ {c.topic || "Parenting"}</span>
                      <span>◷ {c.duration || "3 Months"}</span>
                    </div>
                    <h4 className="font-semibold mb-2 px-1 text-sm line-clamp-1">
                      {c.title}
                    </h4>
                    <p className="text-xs text-ink-500 mb-4 px-1 line-clamp-2">
                      {c.description || "Practical tools to manage daily routines and child behavior efficiently."}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/courses/${recId}`)}
                    className="w-full h-10 rounded-full bg-accent-500 text-white text-sm font-medium transition-colors hover:bg-accent-600 cursor-pointer"
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