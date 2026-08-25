import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProgressBar from "../../components/ui/ProgressBar";

export default function EmailOptIn() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("No");

  const options = ["Yes", "No"];

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("onboardingData") || "{}");
    if (savedData.emailOptIn !== undefined) {
      setSelected(savedData.emailOptIn ? "Yes" : "No");
    }
  }, []);

  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem("onboardingData") || "{}");
    const updatedData = { ...existingData, emailOptIn: selected === "Yes" };
    localStorage.setItem("onboardingData", JSON.stringify(updatedData));
    
    navigate("/onboarding/needs");
  };

  return (
    <div className="w-full max-w-2xl">
      <ProgressBar current={9} total={10} />

      <h1 className="text-3xl font-bold text-center mb-12">
        Would you be open to receiving weekly tips, tools, and progress reports by email?
      </h1>

      <div className="space-y-3 mb-12 max-w-xl mx-auto">
        {options.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setSelected(opt)}
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
          onClick={handleNext}
          className="px-16 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600 cursor-pointer"
        >
          Save &amp; Next
        </button>
      </div>
    </div>
  );
}