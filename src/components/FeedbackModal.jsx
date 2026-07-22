import { useState } from "react";
import Logo from "./ui/Logo";
import { FaStar } from "react-icons/fa6";

export default function FeedbackModal({ isOpen, onClose, onSubmit, initialAnswer = null }) {
  const [answer, setAnswer] = useState(initialAnswer);
  const [rating, setRating] = useState(4);
  const [text, setText] = useState("");
  const MAX = 250;

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="bg-brand-500 py-6 flex justify-center">
          <Logo width={170} />
        </div>

        <div className="px-8 py-8 text-center">
          <h2 className="text-xl font-bold mb-6">Did this solution help?</h2>

          <div className="space-y-3 mb-6">
            <button
              onClick={() => setAnswer("yes")}
              className={`w-full h-14 rounded-xl border text-left px-6 font-medium transition-colors ${
                answer === "yes"
                  ? "bg-accent-500 text-white border-accent-500 ring-2 ring-accent-200"
                  : "bg-white text-ink-700 border-ink-200 hover:border-accent-400"
              }`}
            >
              Yes
            </button>

            <button
              onClick={() => setAnswer("no")}
              className={`w-full h-14 rounded-xl border text-left px-6 font-medium transition-colors ${
                answer === "no"
                  ? "bg-accent-500 text-white border-accent-500 ring-2 ring-accent-200"
                  : "bg-white text-ink-700 border-ink-200 hover:border-accent-400"
              }`}
            >
              No
            </button>
          </div>

          <p className="text-sm text-ink-500 mb-6">
            If no, browse our community solutions or mini-courses, or additional resources.
          </p>

          <h3 className="text-lg font-bold mb-4">Provide you feedback</h3>

          <div className="flex justify-center gap-3 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)} className="transition-transform hover:scale-110">
                <FaStar size={32} className={star <= rating ? "text-yellow-400" : "text-ink-300"} />
              </button>
            ))}
          </div>

          <div className="text-left mb-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, MAX))}
              rows={4}
              placeholder="Type here...."
              className="w-full rounded-xl border border-ink-200 p-4 text-sm outline-none resize-none focus:border-brand-500"
            />
          </div>

          <p className="text-right text-xs text-ink-500 mb-6">
            *{MAX - text.length} Characters Remaining
          </p>

          <button
            onClick={() => onSubmit({ answer, rating, text })}
            className="w-full h-14 rounded-full bg-brand-500 text-white font-semibold text-lg transition-colors hover:bg-brand-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
