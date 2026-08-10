import homeBanner from "../assets/home_banner.jpg";

export default function TopicHero({ label, title, icon }) {
  return (
    <section className="relative overflow-hidden bg-brand-500 text-white px-6 pt-16 pb-14 sm:pt-20 sm:pb-16">
      <img
        src={homeBanner}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-base sm:text-lg mb-2 py-6">{label}</p>

        <h1 className="text-3xl sm:text-4xl font-bold mb-8">{title}</h1>

        <div className="bg-accent-500 rounded-2xl p-5 sm:p-6 flex items-start gap-4 text-left">
          <span className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-yellow-400 flex items-center justify-center text-white">
            {icon}
          </span>

          <div>
            <p className="font-semibold mb-1 text-sm sm:text-base">
              Start with the first solution. If it doesn't work, just move down the list. Each step offers deeper support—simple and effective!
            </p>
            <p className="italic text-white/90 text-sm sm:text-base">
              Turn chores into a game—set a timer and race to beat the clock!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}