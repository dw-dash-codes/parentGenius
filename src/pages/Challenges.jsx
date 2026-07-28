import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFire, FaCalendarDays, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import homeBanner from "../assets/home_banner.jpg";
import courseImg from "../assets/children_img.png";

const WEEK_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const WEEK_DATES  = [22, 23, 24, 25, 26, 27, 28];
const COMPLETED   = [22, 23, 24];
const TODAY       = 25;

const MINI_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const STREAK_GRID = [
  [true,  true,  true,  true,  true,  false, false],
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false],
];

const CHALLENGES = [
  { day: 1, title: "Calm is Contagious", points: 100 },
  { day: 2, title: "Calm is Contagious", points: 100 },
  { day: 3, title: "Calm is Contagious", points: 100 },
  { day: 4, title: "Calm is Contagious", points: 100 },
];

export default function Challenges() {
  const navigate      = useNavigate();
  const [progress]    = useState(0);
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeDate, setActiveDate] = useState(TODAY);

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-500">
        <img
          src={homeBanner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative text-center py-30 px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wide">
            Challenges
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden -mt-20 mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-500/90 to-green-400/80" />
          <img
            src={courseImg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
          />
          <div className="relative p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-white text-xl sm:text-2xl font-bold">
                30-Day Parenting Challenge
              </h2>
              <div className="shrink-0 bg-brand-500 text-white rounded-2xl px-4 py-2 text-center shadow-lg">
                <div className="text-yellow-300 text-xl mb-0.5">⭐</div>
                <div className="text-xs font-bold leading-tight">NEW<br />YOUR BADGE</div>
              </div>
            </div>
            <div className="mt-6 h-4 rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-brand-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-white text-sm font-semibold mt-2">
              <span>Day 0 of 30</span>
              <span>{progress} % Complete</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8 pb-16">

          <div>
            <div className="bg-white rounded-2xl p-5 ring-1 ring-ink-100 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="grid grid-cols-7 mb-2">
                    {WEEK_LABELS.map((d) => (
                      <p key={d} className="text-xs text-ink-500 text-center font-medium">{d}</p>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-y-1">
                    {WEEK_DATES.map((date) => {
                      const done   = COMPLETED.includes(date);
                      const today  = date === TODAY;
                      const active = date === activeDate;
                      const future = date > TODAY;
                      return (
                        <button
                          key={date}
                          onClick={() => setActiveDate(date)}
                          className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                            ${done   ? "bg-accent-500 text-white"
                            : active && today ? "ring-2 ring-brand-500 text-brand-500 bg-white"
                            : active ? "bg-brand-100 text-brand-500"
                            : future ? "text-ink-300 cursor-default"
                            : "text-ink-700 hover:bg-ink-100"}`}
                          disabled={future}
                        >
                          {date}
                        </button>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-7 mt-1">
                    {WEEK_DATES.map((date) => (
                      <div key={date} className="flex justify-center">
                        {date === TODAY && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 block" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-brand-500 font-semibold text-sm whitespace-nowrap pt-1">
                  <span>May</span>
                  <FaCalendarDays size={14} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {CHALLENGES.map((c) => (
                <div
                  key={c.day}
                  className="bg-white rounded-2xl p-4 ring-1 ring-ink-100 flex items-center gap-4 transition-all hover:shadow-md"
                >
                  <img
                    src={courseImg}
                    alt=""
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-brand-500 font-semibold mb-0.5">
                      Day {c.day}:
                    </p>
                    <p className="font-bold text-sm mb-1.5 truncate">{c.title}</p>
                    <span className="inline-flex items-center gap-1 bg-accent-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      ⭐ {c.points} Points
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/challenges/${c.day}`)}
                    className="shrink-0 h-10 px-5 rounded-full border-2 border-brand-500 text-brand-500 text-sm font-semibold whitespace-nowrap transition-colors hover:bg-brand-500 hover:text-white"
                  >
                    Start Challenge
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-brand-50 rounded-2xl p-6 ring-1 ring-ink-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-7xl font-black text-ink-900 leading-none">05</p>
                  <p className="text-accent-500 font-bold text-xl mt-1">Streak Days !</p>
                  <p className="text-ink-500 text-sm mt-1">
                    This is the longest Streak you've ever had
                  </p>
                </div>
                <FaFire className="text-orange-500 shrink-0" size={52} />
              </div>

              <div className="mt-5">
                <div className="relative h-3 rounded-full bg-yellow-100 overflow-visible">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"
                    style={{ width: "40%" }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="w-8 h-8 rounded-full bg-orange-400 text-white text-xs font-bold flex items-center justify-center shadow">
                    7
                  </span>
                  <span className="w-8 h-8 rounded-full bg-orange-300 text-white text-xs font-bold flex items-center justify-center shadow">
                    14
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 ring-1 ring-ink-100">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setWeekOffset(w => w - 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-ink-100 text-ink-500"
                >
                  <FaChevronLeft size={12} />
                </button>
                <div className="grid grid-cols-7 flex-1 mx-2">
                  {MINI_LABELS.map((d) => (
                    <p key={d} className="text-[10px] text-ink-500 text-center font-medium">
                      {d}
                    </p>
                  ))}
                </div>
                <button
                  onClick={() => setWeekOffset(w => w + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-ink-100 text-ink-500"
                >
                  <FaChevronRight size={12} />
                </button>
              </div>

              <div className="space-y-2">
                {STREAK_GRID.map((week, wi) => (
                  <div key={wi} className="grid grid-cols-7">
                    {week.map((done, di) => (
                      <div key={di} className="flex justify-center items-center h-8">
                        {done
                          ? <FaFire className="text-orange-400" size={18} />
                          : <span className="w-5 h-5 rounded-full bg-ink-100 block" />
                        }
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}