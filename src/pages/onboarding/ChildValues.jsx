import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProgressBar from "../../components/ui/ProgressBar";



export default function ChildValues() {
  const navigate = useNavigate();

  const options = [
    "Respect",
    "Kindness",
    "Integrity",
    "Discipline",
    "Emotional control",
    "Responsibility",
    "Gratitude",
    "Self-worth",
    "Faith/Spirituality",
    "Other",
  ];

  const MAX = 3;
  const [selected, setSelected] = useState(["Kindness", "Responsibility"]);

  function toggle(opt) {
    setSelected((prev) => {
      if (prev.includes(opt)) {
        return prev.filter((o) => o !== opt);   
      }
      if (prev.length >= MAX) {
        return prev;                             
      }
      return [...prev, opt];                     
    });
  }

  return (
    <div className="w-full max-w-2xl">
      <ProgressBar current={6}/>

      <h1 className="text-3xl font-bold text-center mb-3">
        What are your top 3 values you want your children to learn?
      </h1>
      <p className="text-center text-sm text-ink-500 mb-10">
        {selected.length}/{MAX} selected
      </p>


      <div className="space-y-3 mb-10">
        {options.map((opt) => {
          const isSelected = selected.includes(opt);
          const isLocked = !isSelected && selected.length >= MAX;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              disabled={isLocked}
              className={`w-full flex items-center justify-between px-6 h-14 rounded-xl border text-left transition-colors ${
                isSelected
                  ? "bg-accent-500 border-accent-500 text-white"
                  : isLocked
                  ? "bg-white border-ink-100 text-ink-300 cursor-not-allowed"
                  : "bg-white border-ink-100 text-ink-700 shadow-sm"
              }`}
            >
              <span className="font-medium">{opt}</span>
              <span
                className={`w-6 h-6 rounded-md flex items-center justify-center border ${
                  isSelected ? "bg-white border-white text-accent-500" : "border-ink-300"
                }`}
              >
                {isSelected && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </button>
          );
        })}
      </div>


      <div className="flex justify-center mb-10">
        <button
          onClick={() => navigate("/onboarding/struggles")}
          className="px-16 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600"
        >
          Save &amp; Next
        </button>
      </div>
    </div>
  );
}