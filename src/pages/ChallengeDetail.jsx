import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import TopicHero from "../components/TopicHero";
import CompletionModal from "../components/CompletionModal";
import { FaLightbulb } from "react-icons/fa6";

export default function ChallengeDetail() {
  const { day } = useParams();
  const navigate = useNavigate();
  const [journal, setJournal] = useState("");
  const [showModal, setShowModal] = useState(false);

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
            KaiB was amazing with our cats!! This was our first time using a
            pet-sitting service, so we were naturally quite anxious. We took a
            chance on Kai and completely lucked out! We booked Kai to come
            twice a day for three days. Kai spent a considerable amount of time
            playing and engaging with our cats.
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
            onClick={() => setShowModal(true)}
            className="h-14 px-16 rounded-full bg-accent-500 text-white font-semibold text-lg transition-colors hover:bg-accent-600"
          >
            Mark as Complete
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