import { useState } from "react";
import Logo from "./ui/Logo";

export default function RatingModal({ isOpen, onClose, onSubmit }) {
  const [rating, setRating] = useState(4);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="bg-brand-500 py-6 flex justify-center">
          <Logo width={170} />
        </div>

        <div className="px-8 py-8 text-center">
          <h2 className="text-xl font-bold mb-1">Rate Us</h2>
          <p className="text-ink-500 mb-6">Rate our app.</p>

          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill={star <= rating ? "#f5a623" : "#9aa4b2"}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            ))}
          </div>

          <button
            onClick={() => onSubmit(rating)}
            className="w-full h-14 rounded-full bg-brand-500 text-white font-semibold text-lg hover:bg-brand-600"
          >
            I will do Later
          </button>
        </div>
      </div>
    </div>
  );
}