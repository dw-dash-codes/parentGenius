import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaLightbulb, FaStar, FaRegBookmark } from "react-icons/fa6";
import courseImg from "../assets/home_course_img.png";
import TopicHero from "../components/TopicHero";

export default function CourseTopic() {
  const { topic } = useParams();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format topic string for display (e.g., "sleep-routines" -> "Sleep Routines")
  const formattedTopic = topic 
    ? topic.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") 
    : "Parenting";

  useEffect(() => {
    const fetchCoursesByTopic = async () => {
      try {
        setLoading(true);
        // Fetch courses filtered by topic from backend API
        const response = await fetch(`http://localhost:5000/api/courses?topic=${encodeURIComponent(formattedTopic)}`);
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error("Error fetching topic courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesByTopic();
    window.scrollTo(0, 0);
  }, [topic, formattedTopic]);

  return (
    <div>
      <TopicHero label="Topic" title={formattedTopic} icon={<FaLightbulb size={22} />} />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-8 text-ink-900">Courses for {formattedTopic}</h2>

        {loading ? (
          <p className="text-ink-500 py-10 text-center">Loading topic courses...</p>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c) => {
              const courseId = c._id || c.id;
              return (
                <div
                  key={courseId}
                  className="relative rounded-2xl overflow-hidden h-72 group cursor-pointer shadow-sm"
                  onClick={() => navigate(`/courses/${courseId}`)}
                >
                  <img src={c.image || courseImg} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-brand-500 text-white text-xs px-3 py-1 rounded-full">{c.topic || formattedTopic}</span>
                      <span className="flex items-center gap-1 text-white text-xs font-semibold">
                        <FaStar className="text-yellow-400" size={11} /> 4.8
                      </span>
                    </div>

                    <button onClick={(e) => { e.stopPropagation(); }} className="text-white hover:text-yellow-400 cursor-pointer">
                      <FaRegBookmark size={16} />
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-2 line-clamp-1">{c.title}</h3>

                    <p className="text-xs text-white/80 mb-4 max-w-[85%] line-clamp-2">
                      {c.description || "Explore expert guidance and structured practices designed to support your journey."}
                    </p>

                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/courses/${courseId}`); }}
                      className="border border-white/70 text-white text-sm px-5 py-2 rounded-full transition-colors hover:bg-white hover:text-brand-500 cursor-pointer font-medium"
                    >
                      View Course
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-brand-50 rounded-3xl ring-1 ring-brand-100">
            <p className="text-ink-600 mb-4">No courses available for this topic right now.</p>
            <button
              onClick={() => navigate("/courses")}
              className="h-11 px-6 rounded-full bg-brand-500 text-white font-medium text-sm hover:bg-brand-600 cursor-pointer"
            >
              Browse All Courses
            </button>
          </div>
        )}
      </section>
    </div>
  );
}