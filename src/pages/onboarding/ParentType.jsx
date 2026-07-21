import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProgressBar from "../../components/ui/ProgressBar";



export default function ParentType() {
  const navigate = useNavigate();

  const options = [
    "Single Parent",
    "Married/Partnered",
    "Co-Parenting (divorced/separated)",
    "Guardian/Grandparent",
    "Other",
  ];

  const [selected, setSelected] = useState("Married/Partnered");
  const [note, setNote] = useState("");
  const maxLen = 10;

  return (
    <div className="w-full max-w-2xl">
      <ProgressBar current={4}/>

      <h1 className="text-3xl font-bold text-center mb-10">Are you a:</h1>


      <div className="space-y-3 mb-4">
        {options.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setSelected(opt)}
              className={`w-full flex items-center justify-between px-6 h-16 rounded-xl border text-left transition-colors ${
                isSelected
                  ? "bg-accent-500 border-accent-500 text-white"
                  : "bg-white border-ink-100 text-ink-700 shadow-sm"
              }`}
            >
              <span className="font-medium">{opt}</span>

              <span
                className={`w-6 h-6 rounded-md flex items-center justify-center border ${
                  isSelected
                    ? "bg-white border-white text-accent-500"
                    : "border-ink-300"
                }`}
              >
                {isSelected && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className={`relative rounded-xl border shadow-sm p-5 mb-10 ${
          selected === "Other"
            ? "bg-white border-ink-100"
            : "bg-ink-100 border-ink-100 opacity-60"
        }`}
      >
        <textarea
          value={note}
          onClick={() => {
            setSelected(opt);
            if (opt !== "Other") setNote(""); 
          }}
          disabled={selected !== "Other"}
          placeholder={selected === "Other" ? "Please specify..." : ""}
          rows={3}
          className="w-full resize-none outline-none text-ink-900 text-sm bg-transparent disabled:cursor-not-allowed"
        />
        <div className="absolute bottom-3 right-4 flex items-center gap-1 text-xs text-ink-500">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
          </svg>
          {note.length}/{maxLen}
        </div>
      </div>


      <div className="flex justify-center mb-10">
        <button
          onClick={() => navigate("/onboarding/goals")}
          className="px-16 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600"
        >
          Save &amp; Next
        </button>
      </div>
    </div>
  );
}