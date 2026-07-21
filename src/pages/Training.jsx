import { useParams, Link } from "react-router-dom";

const TABS = [
  { key: "parent", label: "Parent Training" },
  { key: "child", label: "Child Training" },
  { key: "tutorials", label: "Tutorials Guidance" },
];

function ParentContent() {
  const books = [1, 2, 3, 4];
  const courses = [1, 2, 3, 4];
  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Resources</h2>
          <a href="#" className="text-sm font-medium text-brand-500">See all</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((b) => (
            <div key={b} className="flex gap-4">
              <img src="https://placehold.co/90x130" alt="" className="w-20 h-28 rounded-lg object-cover shrink-0" />
              <div>
                <h4 className="font-semibold text-sm mb-1">The Time Has Come</h4>
                <p className="text-xs text-ink-500 mb-2">Lindbergh's Pharmacy is an Athens, Georgia, institution...</p>
                <p className="text-sm mb-3"><span className="font-bold">$ 27.89</span> <span className="text-ink-500 line-through text-xs">$ 30.99</span></p>
                <button className="h-9 px-4 rounded-full bg-accent-500 text-white text-xs font-medium">Add to basket</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Course Spotlight</h2>
            <a href="#" className="text-sm font-medium text-brand-500">See all</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((c) => (
              <div key={c} className="bg-white rounded-2xl p-3">
                <img src="https://placehold.co/300x180" alt="" className="w-full h-40 rounded-xl object-cover mb-3" />
                <div className="flex items-center gap-4 text-xs text-ink-500 mb-2 px-1">
                  <span>▦ Parenting Guidance</span><span>◷ 3 Month</span>
                </div>
                <h4 className="font-semibold mb-2 px-1">Step-by-Step Parenting and Children Guidance</h4>
                <p className="text-xs text-ink-500 mb-4 px-1">Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor</p>
                <button className="w-full h-11 rounded-full bg-accent-500 text-white text-sm font-medium mb-1">View Detail</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Software Solutions</h2>
          <a href="#" className="text-sm font-medium text-brand-500">See all</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((b) => (
            <div key={b} className="flex gap-4">
              <img src="https://placehold.co/90x130" alt="" className="w-20 h-28 rounded-lg object-cover shrink-0" />
              <div>
                <h4 className="font-semibold text-sm mb-1">The Time Has Come</h4>
                <p className="text-xs text-ink-500 mb-2">Lindbergh's Pharmacy is an Athens, Georgia, institution...</p>
                <p className="text-sm mb-3"><span className="font-bold">$ 27.89</span> <span className="text-ink-500 line-through text-xs">$ 30.99</span></p>
                <button className="h-9 px-4 rounded-full bg-accent-500 text-white text-xs font-medium">Add to basket</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ChildContent() {
  const cards = Array.from({ length: 9 });
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-xl font-bold mb-6">Child Training</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm ring-1 ring-ink-100 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="p-3">
              <img src="https://placehold.co/400x240" alt="" className="w-full h-52 object-cover rounded-2xl" />
            </div>
            <div className="px-4 pb-4">
              <div className="flex items-start gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-brand-500 shrink-0 mt-0.5" />
                <h4 className="font-semibold text-sm">Age-appropriate character building activities</h4>
              </div>
              <p className="text-xs text-ink-500 mb-4 pl-8">Age-appropriate character building activities</p>
              <div className="flex items-center justify-between pt-3 border-t border-ink-100">
                <a href="#" className="text-sm text-ink-700 underline">Read more</a>
                <span className="flex items-center gap-1 text-xs text-ink-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                  251,232
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TutorialsContent() {
  const steps = [
    { t: "Start a Daily Parenting Plan", d: "Begin your journey by selecting one of our structured daily plans designed to create lasting positive changes in your family dynamics." },
    { t: "Focus on One Challenge", d: "Choose just one specific parenting challenge to work on. Success comes from focused effort rather than trying to fix everything at once." },
    { t: "Complete the 7-Day Training", d: "Follow our proven 7-day intensive training program specifically designed for your chosen challenge. Consistency is key to building new habits." },
    { t: "Explore Community Solutions", d: "If you need additional support, browse our community-tested solutions and learn from other parents who have faced similar challenges." },
    { t: "Consider Expert Courses", d: "For deeper transformation, explore our expert-led courses that provide comprehensive strategies and personalized guidance." },
    { t: "Seek Professional Support", d: "For more complex family dynamics, consider connecting with professional therapists who can provide personalized, one-on-one guidance." },
  ];
  const recommended = [1, 2, 3];

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-6">Tutorials Guidance</h2>

          <div className="bg-gradient-to-b from-brand-500 to-brand-700 rounded-2xl p-10 text-center text-white mb-6">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-16">▶</div>
            <h3 className="text-xl font-bold mb-2">Getting Started with Your Parenting Journey</h3>
            <p className="text-white/80 text-sm">Watch this 5-minute overview to understand our proven approach</p>
          </div>

          <div className="space-y-3">
            {steps.map((s, i) => (
              <div key={i} className="bg-brand-50 rounded-xl p-4 flex gap-4">
                <span className="w-7 h-7 rounded-full bg-brand-500 text-white text-sm flex items-center justify-center shrink-0">{i + 1}</span>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{s.t}</h4>
                  <p className="text-xs text-ink-500">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 text-center">Recommended</h2>
          <div className="space-y-6">
            {recommended.map((r) => (
              <div key={r} className="bg-white rounded-2xl shadow-sm ring-1 ring-ink-100 overflow-hidden">
                <div className="p-3">
                  <img src="https://placehold.co/400x200" alt="" className="w-full h-40 object-cover rounded-2xl" />
                </div>
                <div className="px-4 pb-4">
                  <h4 className="font-semibold text-sm mb-1">Age-appropriate character building activities</h4>
                  <p className="text-xs text-ink-500 mb-3">Age-appropriate character building activities</p>
                  <div className="flex items-center justify-between pt-3 border-t border-ink-100">
                    <a href="#" className="text-sm text-ink-700 underline">Read more</a>
                    <span className="flex items-center gap-1 text-xs text-ink-500">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                      </svg>
                      251,232
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Training() {
  const { tab } = useParams();
  const validTabs = ["parent", "child", "tutorials"];
  const activeKey = validTabs.includes(tab) ? tab : "parent";

  return (
    <div>
      <section className="bg-brand-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold leading-tight mb-6">
              Even a 10-minute play break can brighten your child's day.
            </h1>
            <div className="bg-white rounded-2xl p-5 text-ink-900">
              <p className="font-medium mb-2">What do you want to fix today?</p>
              <div className="flex gap-3">
                <input type="text" placeholder="Type here..." className="flex-1 h-12 rounded-full border border-ink-300 px-5 text-sm outline-none focus:border-brand-500" />
                <button className="h-12 px-6 rounded-full bg-accent-500 text-white font-medium hover:bg-accent-600">Submit</button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-ink-900 flex items-center justify-between">
            <div>
              <p className="text-sm text-ink-500 mb-1">3 April, 2025</p>
              <h3 className="text-2xl font-bold mb-4">30-Day<br />Challenges</h3>
              <button className="h-11 px-5 rounded-full bg-accent-500 text-white text-sm font-medium hover:bg-accent-600">Continue Challenge</button>
            </div>
            <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: "conic-gradient(#4caf50 65%, #eef0f4 0)" }}>
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                <span className="text-xl font-bold">65 %</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-wrap justify-center gap-4">
          {TABS.map((t) => {
            const isActive = t.key === activeKey;
            return (
              <Link key={t.key} to={`/training/${t.key}`}
                className={`flex items-center gap-3 rounded-full pl-2 pr-6 py-2 border transition-colors ${
                  isActive ? "bg-accent-500 text-white border-accent-500" : "bg-white border-ink-100 hover:border-brand-300"
                }`}>
                <img src="https://placehold.co/44x44" alt="" className="w-11 h-11 rounded-full object-cover" />
                <span className="font-medium">{t.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {activeKey === "parent" && <ParentContent />}
      {activeKey === "child" && <ChildContent />}
      {activeKey === "tutorials" && <TutorialsContent />}
    </div>
  );
}