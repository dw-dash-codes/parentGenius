import { useParams, useNavigate } from "react-router-dom";
import { FaLightbulb, FaStar, FaRegBookmark } from "react-icons/fa6";
import homeBanner from "../assets/home_banner.jpg";
import courseImg from "../assets/home_course_img.png";
import TopicHero from "../components/TopicHero";

export default function CourseTopic() {
  const { topic } = useParams();
  const navigate = useNavigate();

  const topicName = topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : "Chores";

  const cards = Array.from({ length: 12 });

  return (
    <div>
      <TopicHero label="Topic" title={topicName} icon={<FaLightbulb size={22} />} />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-8">Courses by Topic</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((_, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden h-72 group cursor-pointer"
              onClick={() => navigate(`/courses/solutions/${topic || "chores"}`)}
            >
              <img src={courseImg} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-brand-500 text-white text-xs px-3 py-1 rounded-full">{topicName}</span>

                  <span className="flex items-center gap-1 text-white text-xs">
                    <FaStar className="text-yellow-400" size={11} /> 4.2
                  </span>

                </div>

                <button onClick={(e) => e.stopPropagation()} className="text-white hover:text-yellow-400">
                  <FaRegBookmark size={16} />
                </button>

              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold mb-2">Fun Chores for Kids</h3>

                <p className="text-xs text-white/80 mb-4 max-w-[70%]">
                  Teaching kids to do chores builds responsibility, confidence.....
                </p>

                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/courses/solutions/${topic || "chores"}`); }}
                  className="border border-white/70 text-white text-sm px-5 py-2 rounded-full transition-colors hover:bg-white hover:text-brand-500"
                >
                  Upgrade to Unlock
                </button>

              </div>

            </div>

          ))}
        </div>

      </section>

    </div>

  );
}