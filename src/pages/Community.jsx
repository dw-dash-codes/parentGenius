import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import homeBanner from "../assets/home_banner.jpg";

const AGES = [
  "Newborn (0-2mo)", "Infant (3-11mo)", "Toddler (1-3 yrs)",
  "Child (4-12yrs)", "Teen (13+)",
];

const TOPICS = [
  "Tantrums & Emotional Regulation", "Sleep & Routines", "Discipline & Boundaries",
  "Screen Time & Technology", "Chores", "Parent-Child Communication",
  "Anxiety, Worry & Mental Health", "Sibling Relationships", "Co-Parenting & Divorce",
  "Social Skills & Friendships", "School & Learning Support", "Behavior Issues",
  "Confidence & Self-Esteem", "Puberty & Development", "Parent Burnout & Self-Care",
];

const ALL_REVIEWS = [
  { id: 1, user: "CatLover92", date: "22 Jul", topic: "Sleep & Routines" },
  { id: 2, user: "CatLover92", date: "22 Jul", topic: "Chores" },
  { id: 3, user: "CatLover92", date: "22 Jul", topic: "Discipline & Boundaries" },
  { id: 4, user: "CatLover92", date: "22 Jul", topic: "Sleep & Routines" },
  { id: 5, user: "CatLover92", date: "22 Jul", topic: "Chores" },
  { id: 6, user: "CatLover92", date: "22 Jul", topic: "Behavior Issues" },
];

export default function Community() {
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [search, setSearch] = useState("");
  const [solution, setSolution] = useState("");

  const toggleTopic = (topic) =>
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );

  const filtered = ALL_REVIEWS.filter((r) => {
    const matchSearch = r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.topic.toLowerCase().includes(search.toLowerCase());
    const matchTopic = selectedTopics.length === 0 || selectedTopics.includes(r.topic);
    return matchSearch && matchTopic;
  });

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-500 text-white text-center px-6 py-16 sm:py-24">
        <img src={homeBanner} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Community Solutions</h1>
          <p className="italic text-lg sm:text-xl text-white/90 leading-relaxed">
            Explore short, expert-led courses for real parenting challenges—on your time. Start by choosing your child's age, then browse or filter to find the right challenge.
          </p>
        </div>
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
                  onClick={() => setSelectedAge(selectedAge === age ? null : age)}
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
                <label key={topic} className="flex items-center gap-2 text-sm text-ink-700 cursor-pointer hover:text-brand-500">
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold">Community Solutions</h2>
            <div className="relative w-full sm:max-w-xs">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500" size={14} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Single Parenting"
                className="w-full h-11 rounded-xl bg-ink-50 pl-10 pr-4 text-sm outline-none ring-1 ring-ink-100 focus:ring-brand-500"
              />
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filtered.map((r) => (
                <div key={r.id} className="bg-brand-50 rounded-2xl p-2">
                  <div className="bg-white rounded-xl p-4 ring-1 ring-ink-100 h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded-full" />
                      <span className="text-sm font-medium">{r.user}</span>
                      <span className="text-xs text-ink-500">· {r.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <FaStar key={s} className="text-yellow-400" size={12} />
                      ))}
                      <span className="text-xs text-ink-500 ml-1">(30)</span>
                    </div>
                    <p className="text-sm text-ink-700 leading-relaxed">
                      KaiB was amazing with our cats!! This was our first time using a pet-sitting service, so we were naturally quite anxious. We took a chance on Kai and completely lucked out! We booked Kai to come twice a day for three days. K...
                    </p>
                    <button className="text-brand-500 text-sm font-medium mt-2 hover:underline block">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-ink-500 mb-8">No solutions match your search.</p>
          )}

          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="Type your solution"
              className="flex-1 h-14 rounded-2xl border border-ink-200 px-5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
            <button
              onClick={() => {
                if (solution.trim()) {
                  alert(`Solution submitted: ${solution}`);
                  setSolution("");
                }
              }}
              className="h-14 px-8 rounded-2xl bg-brand-500 text-white font-semibold transition-colors hover:bg-brand-600"
            >
              Submit
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}