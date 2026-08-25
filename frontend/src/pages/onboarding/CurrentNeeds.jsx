import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProgressBar from "../../components/ui/ProgressBar";

export default function CurrentNeeds() {
  const navigate = useNavigate();

  const options = [
    "Need to tune-up my parenting skills",
    "Learn more Parenting tools",
    "Lack of routines",
    "Just need help with one issue",
    "Need to know whats working with other parents",
    "Need more Resources",
    "Need Marriage help",
    "Need a professional therapist",
  ];

  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("onboardingData") || "{}");
    if (savedData.currentNeeds && savedData.currentNeeds.length > 0) {
      setSelected(savedData.currentNeeds);
    } else {
      setSelected(["Learn more Parenting tools"]);
    }
  }, []);

  function toggle(opt) {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  }

  const handleComplete = async () => {
    setError("");
    setLoading(true);

    try {
      const existingData = JSON.parse(localStorage.getItem("onboardingData") || "{}");
      const finalData = { ...existingData, currentNeeds: selected };

      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication error. Please login again.");
      }

      const response = await fetch("http://localhost:5000/api/users/onboarding", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(finalData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to complete onboarding.");
      }

      localStorage.removeItem("onboardingData");

      const storage = localStorage.getItem("user") ? localStorage : sessionStorage;
      const currentUser = JSON.parse(storage.getItem("user") || "{}");
      storage.setItem("user", JSON.stringify({ ...currentUser, ...data.user, onboardingCompleted: true }));

      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <ProgressBar current={10} total={10} />

      <h1 className="text-3xl font-bold text-center mb-12">
        Tell us about your current needs
      </h1>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm mb-6 text-center border border-red-200">
          {error}
        </div>
      )}

      <div className="space-y-3 mb-12">
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
          onClick={handleComplete}
          disabled={loading}
          className="px-16 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Saving..." : "Let's Get To Work"}
        </button>
      </div>
    </div>
  );
}