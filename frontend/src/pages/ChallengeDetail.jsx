import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopicHero from "../components/TopicHero";
import CompletionModal from "../components/CompletionModal";
import { FaLightbulb } from "react-icons/fa6";

export default function ChallengeDetail() {
  const { day } = useParams();
  const navigate = useNavigate();
  const [journal, setJournal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setShowModal(true);
        setLoading(false);
        return;
      }

      // Backend API call to update user points and streak upon challenge completion
      const response = await fetch("${import.meta.env.VITE_API_BASE_URL}/api/users/complete-challenge", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          dayNumber: day,
          journalText: journal,
          pointsEarned: 100,
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        
        // Update local storage user details if available
        const storage = localStorage.getItem("user") ? localStorage : sessionStorage;
        const currentUser = JSON.parse(storage.getItem("user") || "{}");
        storage.setItem("user", JSON.stringify({ ...currentUser, ...updatedData }));
      }
    } catch (error) {
      console.error("Error completing challenge:", error);
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  return (
    <div>
      <TopicHero
        label={`Day ${day}`}
        title="Calm is Contagious"
        icon={<FaLightbulb size={22} />}
      />

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-5">
        <div className="bg-green-50 rounded-2xl p-6 ring-1 ring-green-100">
          <h2 className="text-xl font-bold text-accent-600 text-center mb-4">
            Why It Matters
          </h2>
          <p className="text-ink-700 text-center leading-relaxed">
            Maintaining a calm demeanor in front of your children teaches emotional regulation. When you model composure, they learn how to handle their own big feelings effectively.
          </p>
        </div>

        <div className="bg-brand-50 rounded-2xl p-6 ring-1 ring-brand-100 flex items-center gap-5">
          <span className="text-4xl shrink-0">🎯</span>
          <div>
            <h3 className="text-lg font-bold text-brand-500 mb-1">
              Quick Strategy
            </h3>
            <p className="italic text-brand-500">
              Try whispering when you feel like yelling.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 ring-1 ring-ink-100">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl shrink-0">📒</span>
            <div>
              <h3 className="text-lg font-bold">Your Journal</h3>
              <p className="text-ink-500 text-sm">When did I last model calm?</p>
            </div>
          </div>
          <textarea
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="Write your thoughts here..."
            rows={4}
            className="w-full rounded-xl border border-ink-200 p-4 text-sm outline-none resize-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 text-ink-700 placeholder:text-ink-300"
          />
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="button"
            disabled={loading}
            onClick={handleComplete}
            className="h-14 px-16 rounded-full bg-accent-500 hover:bg-accent-600 text-white font-semibold text-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? "Processing..." : "Mark as Complete"}
          </button>
        </div>
      </div>

      <CompletionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onContinue={() => {
          setShowModal(false);
          navigate("/challenges");
        }}
      />
    </div>
  );
}