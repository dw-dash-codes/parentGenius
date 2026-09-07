import { useState, useEffect } from "react";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
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

export default function Community() {
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [search, setSearch] = useState("");
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states for structured submission
  const [formContent, setFormContent] = useState("");
  const [formTopic, setFormTopic] = useState(TOPICS[0]);
  const [formAge, setFormAge] = useState(AGES[2]);
  
  // Track expanded cards for "Read More" slide toggle
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await fetch("${import.meta.env.VITE_API_BASE_URL}/api/community");
        if (response.ok) {
          const data = await response.json();
          setSolutions(data);
        }
      } catch (error) {
        console.error("Error fetching community solutions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  const toggleTopic = (topic) =>
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRateSolution = async (id, newRating) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        alert("Please login to rate solutions.");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/community/${id}/rate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: newRating }),
      });

      if (response.ok) {
        const updatedSolution = await response.json();
        setSolutions((prev) =>
          prev.map((sol) => (sol._id === id || sol.id === id ? updatedSolution : sol))
        );
      } else {
        const err = await response.json();
        alert(err.message || "Failed to submit rating.");
      }
    } catch (error) {
      console.error("Error rating solution:", error);
    }
  };

  const handleSubmitSolution = async (e) => {
    e.preventDefault();
    if (!formContent.trim()) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        alert("Please login to submit a solution.");
        setSubmitting(false);
        return;
      }

      const response = await fetch("${import.meta.env.VITE_API_BASE_URL}/api/community", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: formContent,
          topic: formTopic,
          ageGroup: formAge,
        }),
      });

      if (response.ok) {
        const createdSolution = await response.json();
        setSolutions([createdSolution, ...solutions]);
        setFormContent("");
        alert("Solution published successfully!");
      } else {
        const err = await response.json();
        alert(err.message || "Failed to submit solution.");
      }
    } catch (error) {
      console.error("Error submitting solution:", error);
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = solutions.filter((r) => {
    const matchSearch =
      (r.user && r.user.toLowerCase().includes(search.toLowerCase())) ||
      (r.content && r.content.toLowerCase().includes(search.toLowerCase())) ||
      (r.topic && r.topic.toLowerCase().includes(search.toLowerCase()));
    
    const matchTopic =
      selectedTopics.length === 0 || selectedTopics.includes(r.topic);
    
    const matchAge =
      !selectedAge || r.ageGroup === selectedAge;

    return matchSearch && matchTopic && matchAge;
  });

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-500 text-white text-center px-6 py-16 sm:py-20">
        <img
          src={homeBanner}
          alt=""
          className="absolute inset-0 w-full h-auto object-cover opacity-20"
        />
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 py-10">
          Community Solutions
        </h1>

        <p className="italic max-w-2xl mx-auto text-white/90 text-xl font-medium">
          Explore real parenting solutions shared by the community—on your time.
          Start by choosing your child's age, then browse or filter to find the right advice.
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
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
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
                    className="w-4 h-4 accent-brand-500 cursor-pointer"
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
              <FaSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500"
                size={14}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search solutions..."
                className="w-full h-11 rounded-xl bg-ink-50 pl-10 pr-4 text-sm outline-none ring-1 ring-ink-100 focus:ring-brand-500"
              />
            </div>
          </div>

          {loading ? (
            <p className="text-ink-500 text-center py-10">Loading community solutions...</p>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filtered.map((r) => {
                const cardId = r._id || r.id;
                const isExpanded = expandedCards[cardId];
                const isLongText = r.content && r.content.length > 90;

                return (
                  <div key={cardId} className="bg-brand-50 rounded-2xl p-2">
                    <div className="bg-white rounded-xl p-4 ring-1 ring-ink-100 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src="https://placehold.co/32x32"
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm font-medium">{r.user || "Parent"}</span>
                          <span className="text-xs text-ink-500">· {r.date || "Recent"}</span>
                        </div>

                        {/* Interactive Rating Widget for Other Users to Rate */}
                        <div className="flex items-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              size={13}
                              onClick={() => handleRateSolution(cardId, star)}
                              className={`cursor-pointer transition-colors ${
                                star <= Math.round(r.rating || 5) ? "text-yellow-400" : "text-ink-200"
                              }`}
                              title={`Rate ${star} stars`}
                            />
                          ))}
                          <span className="text-xs text-ink-500 ml-1">({r.topic || "General"})</span>
                        </div>

                        <p className="text-xs font-semibold text-brand-500 mb-1">Age: {r.ageGroup || "All Ages"}</p>
                        
                        <div className={`text-sm text-ink-700 leading-relaxed overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96" : "max-h-16"}`}>
                          {r.content}
                        </div>
                      </div>

                      {isLongText && (
                        <button 
                          onClick={() => toggleExpand(cardId)}
                          className="text-brand-500 text-sm font-medium hover:underline self-start mt-3 flex items-center gap-1 cursor-pointer"
                        >
                          {isExpanded ? <>Show Less <FaChevronUp size={10} /></> : <>Read More <FaChevronDown size={10} /></>}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-ink-500 mb-8">No solutions match your search or filter criteria.</p>
          )}

          {/* Structured Submission Form */}
          <form onSubmit={handleSubmitSolution} className="bg-white rounded-3xl p-6 ring-1 ring-ink-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-ink-900">Share Your Solution</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">Select Topic</label>
                <select
                  value={formTopic}
                  onChange={(e) => setFormTopic(e.target.value)}
                  className="w-full h-11 rounded-xl border border-ink-200 px-3 text-xs outline-none focus:border-brand-500 bg-white"
                >
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">Child Age Group</label>
                <select
                  value={formAge}
                  onChange={(e) => setFormAge(e.target.value)}
                  className="w-full h-11 rounded-xl border border-ink-200 px-3 text-xs outline-none focus:border-brand-500 bg-white"
                >
                  {AGES.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <textarea
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                placeholder="Describe your parenting solution or advice in detail..."
                rows={3}
                className="w-full rounded-xl border border-ink-200 p-4 text-sm outline-none resize-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 text-ink-700 placeholder:text-ink-300"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="h-12 px-8 rounded-full bg-brand-500 text-white font-semibold text-sm transition-colors hover:bg-brand-600 cursor-pointer disabled:opacity-50"
              >
                {submitting ? "Publishing..." : "Publish Solution"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}