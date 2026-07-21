import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ProgressBar from "../../components/ui/ProgressBar";



export default function ChildrenAges() {
  const navigate = useNavigate();
  const location = useLocation();


  const count = location.state?.count || 2;


  const [ages, setAges] = useState(Array.from({ length: count }, () => 18));

  const [activeIndex, setActiveIndex] = useState(0);

  const activeAge = ages[activeIndex];


  function setActiveAge(newAge) {
    setAges((prev) => {
      const next = [...prev];
      next[activeIndex] = newAge;
      return next;
    });
  }

  return (
    <div className="w-full max-w-3xl">
      <ProgressBar current={3} />

      <h1 className="text-3xl font-bold text-center mb-10">
        List the ages of your children
      </h1>


      <div className="flex flex-wrap justify-center gap-5 mb-12">
        {ages.map((age, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`relative w-44 h-24 rounded-xl border text-left px-5 pt-4 ${
              i === activeIndex ? "border-brand-500" : "border-ink-300"
            }`}
          >
            <span
              className={`absolute -top-2.5 left-4 bg-white px-1 text-sm ${
                i === activeIndex ? "text-brand-500" : "text-ink-500"
              }`}
            >
              Child {i + 1}
            </span>
            <span className="text-2xl">{age}</span>
          </button>
        ))}
      </div>


      <div className="flex flex-col items-center gap-2 mb-12 select-none">
        <button
          type="button"
          onClick={() => setActiveAge(activeAge + 1)}
          aria-label="Increase age"
          className="w-10 h-10 rounded-full flex items-center justify-center text-brand-500 hover:bg-brand-500/10 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {[activeAge - 2, activeAge - 1, activeAge, activeAge + 1, activeAge + 2].map((val, idx) => {
          const isCenter = idx === 2;
          const isNear = idx === 1 || idx === 3;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveAge(val)}
              className={
                isCenter
                  ? "w-20 h-20 rounded-2xl bg-accent-500 text-white text-3xl font-bold flex items-center justify-center ring-4 ring-accent-500/20"
                  : isNear
                  ? "text-2xl font-bold text-ink-700"
                  : "text-lg text-ink-300"
              }
            >
              {val}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setActiveAge(activeAge - 1)}
          aria-label="Decrease age"
          className="w-10 h-10 rounded-full flex items-center justify-center text-brand-500 hover:bg-brand-500/10 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>


      <div className="flex justify-center mb-10">
        <button
          onClick={() => navigate("/onboarding/type")}
          className="px-16 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600"
        >
          Save &amp; Next
        </button>
      </div>
    </div>
  );
}