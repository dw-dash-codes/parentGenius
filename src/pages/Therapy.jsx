import { useState } from "react";
import homeBanner from "../assets/home_banner.jpg";
import courseImg from "../assets/home_course_img.png";

const TYPES = [
  { key: "individual", label: "Individual" },
  { key: "couples", label: "Couples" },
  { key: "family", label: "Family" },
];

export default function Therapy() {
  const [selected, setSelected] = useState("individual");

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-500 text-white text-center px-6 py-16 sm:py-24">
        <img
          src={homeBanner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 mt-6">
            Professional Support
          </h1>
          <p className="italic text-lg sm:text-xl text-white/90 leading-relaxed">
            Some challenges need more than tips. Whether you need marriage or
            family support, Parent Genius connects you with licensed therapists
            online—affordable, private, and convenient. Get the support you need
            from a qualified expert for more personalized solutions.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">
          Select Therapy Type
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {TYPES.map((t) => {
            const isSelected = selected === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setSelected(t.key)}
                className="relative rounded-2xl overflow-hidden h-72 group transition-all duration-200
                  ring-1 ring-ink-100 hover:ring-2 hover:ring-brand-300 hover:shadow-lg"
              >
                <img
                  src={courseImg}
                  alt={t.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-0 right-0 text-center">
                  <span className="text-white text-2xl font-bold">
                    {t.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => alert(`Free Consultation booked for: ${selected}`)}
            className="h-14 px-16 rounded-full bg-accent-500 text-white font-semibold text-lg transition-colors hover:bg-accent-600"
          >
            Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
}