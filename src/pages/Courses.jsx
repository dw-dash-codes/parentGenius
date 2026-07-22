import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaBookOpen, FaClock } from "react-icons/fa6";
import courseImg from "../assets/home_course_img.png";
import homeBanner from "../assets/home_banner.jpg";

const AGES = [
  "Newborn (0-2mo)",
  "Infant (3-11mo)",
  "Toddler (1-3 yrs)",
  "Child (4-12yrs)",
  "Teen (13+)",
];

const TOPICS = [
  "Tantrums & Emotional Regulation",
  "Sleep & Routines",
  "Discipline & Boundaries",
  "Screen Time & Technology",
  "Chores",
  "Parent-Child Communication",
  "Anxiety, Worry & Mental Health",
  "Sibling Relationships",
  "Co-Parenting & Divorce",
  "Social Skills & Friendships",
  "School & Learning Support",
  "Behavior Issues",
  "Confidence & Self-Esteem",
  "Puberty & Development",
  "Parent Burnout & Self-Care",
];

const CONTINUE = [
  {
    title: "AWS Certified Solutions Architect",
    lesson: "Lesson 5 of 7",
    progress: 70,
  },
  {
    title: "AWS Certified Solutions Architect",
    lesson: "Lesson 5 of 7",
    progress: 70,
  },
  {
    title: "AWS Certified Solutions Architect",
    lesson: "Lesson 5 of 7",
    progress: 70,
  },
];

export default function Courses() {
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [search, setSearch] = useState("");

  const recommended = Array.from({ length: 12 });

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-500 text-white text-center px-6 py-16 sm:py-20">
        <img
          src={homeBanner}
          alt=""
          className="absolute inset-0 w-full h-auto object-cover opacity-20"
        />
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 py-10">
          Short Lessons: Powerful Results
        </h1>

        <p className="italic max-w-2xl mx-auto text-white/90 text-xl font-medium">
          Explore short, expert-led courses for real parenting challenges—on
          your time. Start by choosing your child's age, then browse or filter
          to find the right challenge.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[260px_1fr] gap-8">
        <aside>
          <h2 className="text-xl font-bold mb-4">Courses by Topic</h2>

          <div className="rounded-2xl ring-1 ring-ink-100 p-4 mb-5">
            <p className="text-sm font-semibold mb-3">Child Age</p>
            <div className="flex flex-wrap gap-1">
              {AGES.map((age) => (
                <button
                  key={age}
                  onClick={() =>
                    setSelectedAge(selectedAge === age ? null : age)
                  }
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    selectedAge === age
                      ? "bg-brand-500 text-white border-brand-500"
                      : "bg-white text-ink-700 border-ink-200 hover:border-brand-400"
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl ring-1 ring-ink-100 p-4">
            <p className="text-sm font-semibold mb-3">Topics</p>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {TOPICS.map((topic) => (
                <label
                  key={topic}
                  className="flex items-center gap-2 text-sm text-ink-700 cursor-pointer hover:text-brand-500"
                >
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(topic)}
                    onChange={() => toggleTopic(topic)}
                    className="w-4 h-4 accent-brand-500"
                  />
                  {topic}
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main>
          <div className="flex justify-end mb-6">
            <div className="relative w-full sm:max-w-md">
              <FaSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-500"
                size={16}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && search.trim()) {
                    const slug = search
                      .trim()
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-|-$/g, "");
                    navigate(`/courses/topic/${slug}`);
                  }
                }}
                placeholder="Search for Courses"
                className="w-full h-12 rounded-xl bg-ink-50 pl-11 pr-4 text-sm outline-none ring-1 ring-ink-100 focus:ring-brand-500"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Welcome back, ready for your next lesson?
          </h2>
          <div className="bg-brand-50 rounded-2xl p-4 mb-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CONTINUE.map((c, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/courses/${i + 1}`)}
                  className="bg-white rounded-2xl p-3 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={courseImg}
                    alt=""
                    className="w-full h-36 rounded-xl object-cover mb-3"
                  />
                  <h4 className="font-semibold text-sm mb-2">{c.title}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src="https://placehold.co/24x24"
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-xs text-ink-500">Lina</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-ink-100 mb-1">
                    <div
                      className="h-full rounded-full bg-accent-500"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-ink-500 text-right">
                    {c.lesson}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Recommended for you</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {recommended.map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-3 ring-1 ring-ink-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-accent-400"
              >
                <img
                  src={courseImg}
                  alt=""
                  className="w-full h-40 rounded-xl object-cover mb-3"
                />
                <div className="flex items-center gap-1.5 text-xs text-ink-500 mb-2 px-1">
                  <span className="flex items-center gap-1">
                    <FaBookOpen size={11} /> Parenting Guidance
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock size={11} /> 3 Month
                  </span>
                </div>
                <h4 className="font-semibold mb-2 px-1 text-sm">
                  Step-by-Step Parenting and Children Guidance
                </h4>
                <p className="text-xs text-ink-500 mb-4 px-1">
                  Lorem ipsum dolor sit amet, consectetur adipising elit, sed do
                  eiusmod tempor
                </p>
                <button
                  onClick={() => navigate(`/courses/${i + 1}`)}
                  className="w-full h-10 rounded-full bg-accent-500 text-white text-sm font-medium transition-colors hover:bg-accent-600"
                >
                  View Detail
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
