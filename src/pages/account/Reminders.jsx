import { useState } from "react";
import homeBanner from "../../assets/home_banner.jpg";

export default function Reminders() {
  const [reminders, setReminders] = useState([
    { id: 1, title: "Challenges", description: "Remind yourself to complete your daily challenges to earn more points", enabled: false },
    { id: 2, title: "Challenges", description: "Remind yourself to complete your daily challenges to earn more points", enabled: true },
    { id: 3, title: "Challenges", description: "Remind yourself to complete your daily challenges to earn more points", enabled: false },
    { id: 4, title: "Challenges", description: "Remind yourself to complete your daily challenges to earn more points", enabled: true },
    { id: 5, title: "Challenges", description: "Remind yourself to complete your daily challenges to earn more points", enabled: false },
    { id: 6, title: "Challenges", description: "Remind yourself to complete your daily challenges to earn more points", enabled: true },
  ]);

  const toggleReminder = (id) => {
    setReminders((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-accent-500 text-white pt-28 pb-24 px-6 min-h-[780px] flex flex-col items-center">
        <img
          src={homeBanner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500/95 via-green-600/85 to-accent-500/95" />

        <div className="relative max-w-4xl mx-auto w-full flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 tracking-wide">
            Reminders
          </h1>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {reminders.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-md flex items-start justify-between gap-4 transition-all duration-200 hover:shadow-lg"
              >
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-brand-500 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleReminder(item.id)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer shrink-0 mt-0.5 ${
                    item.enabled ? "bg-accent-500" : "bg-ink-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      item.enabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}