import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProgressBar from "../../components/ui/ProgressBar";



export default function Struggles() {
  const navigate = useNavigate();

  const options = [
    "Emotional outbursts",
    "Defiance/disrespect",
    "Lack of routines",
    "Social media issues",
    "My partner and I are not on the same page",
    "No cooperation with chores/schoolwork",
    "I feel overwhelmed and unsure of what to do",
    "Other",
  ];

  const [selected, setSelected] = useState([
    "Defiance/disrespect",
    "No cooperation with chores/schoolwork",
  ]);

  function toggle(opt) {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <ProgressBar current={7}/>

      <h1 className="text-3xl font-bold text-center mb-10">
        What are your biggest struggles right now?
      </h1>

      <div className="space-y-3 mb-10">
        {options.map((opt) => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`w-full flex items-center justify-between px-6 h-14 rounded-xl border text-left transition-colors ${
                isSelected
                  ? "bg-accent-500 border-accent-500 text-white"
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
          onClick={() => navigate("/onboarding/confidence")}
          className="px-16 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600"
        >
          Save &amp; Next
        </button>
      </div>
    </div>
  );
}