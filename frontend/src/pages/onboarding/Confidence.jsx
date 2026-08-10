import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProgressBar from "../../components/ui/ProgressBar";

export default function Confidence() {
  const navigate = useNavigate();

  const TOTAL = 5;
  const [scale, setScale] = useState(4);

  return (
    <div className="w-full max-w-3xl">
      <ProgressBar current={8}/>

      <h1 className="text-3xl font-bold text-center mb-14">
        How confident do you feel in your parenting skills today?
      </h1>

      <div className="flex justify-center mb-4">
        <div className="flex bg-white rounded-2xl shadow-md overflow-hidden h-20 w-80">
          {Array.from({ length: TOTAL }).map((_, i) => {
            const value = i + 1;
            const isFilled = value < scale;
            const isCurrent = value === scale;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setScale(value)}
                className={`flex-1 flex items-center justify-center border-r border-white last:border-r-0 ${
                  isCurrent
                    ? "bg-brand-500 text-white rounded-xl ring-2 ring-brand-200"
                    : isFilled
                    ? "bg-accent-500 text-white/70"
                    : "bg-white text-transparent"
                }`}
              >
                {isCurrent ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 6l6 6-6 6M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className="w-0.5 h-6 bg-white/80 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-center text-lg font-bold text-ink-900 mb-14">Scale {scale}</p>

      <div className="flex justify-center mb-10">
        <button
          onClick={() => navigate("/onboarding/email-optin")}
          className="px-16 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600"
        >
          Save &amp; Next
        </button>
      </div>
    </div>
  );
}