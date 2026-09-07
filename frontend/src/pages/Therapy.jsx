import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import homeBanner from "../assets/home_banner.jpg";
import courseImg from "../assets/home_course_img.png";

const TYPES = [
  { key: "individual", label: "Individual" },
  { key: "couples", label: "Couples" },
  { key: "family", label: "Family" },
];

export default function Therapy() {
  const [selected, setSelected] = useState("individual");
  const [showModal, setShowModal] = useState(false);

  const selectedLabel = TYPES.find((t) => t.key === selected)?.label || "Individual";

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-500 text-white text-center px-6 py-16 sm:py-20">
        <img
          src={homeBanner}
          alt=""
          className="absolute inset-0 w-full h-auto object-cover opacity-20"
        />
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 py-10">
          Professional Support
        </h1>

        <p className="italic max-w-2xl mx-auto text-white/90 text-xl font-medium">
          Some challenges need more than tips. Whether you need marriage or
          family support, Parent Genius connects you with licensed therapists
          online—affordable, private, and convenient. Get the support you need
          from a qualified expert for more personalized solutions.
        </p>
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
                className={`relative rounded-2xl overflow-hidden h-72 group transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "ring-4 ring-brand-500 shadow-xl"
                    : "ring-1 ring-ink-100 hover:ring-2 hover:ring-brand-300 hover:shadow-lg"
                }`}
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
            onClick={() => setShowModal(true)}
            className="h-14 px-16 rounded-full bg-accent-500 text-white font-semibold text-lg transition-colors hover:bg-accent-600 cursor-pointer"
          >
            Free Consultation
          </button>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl ring-1 ring-ink-100">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheck size={28} />
            </div>
            
            <h3 className="text-2xl font-bold text-ink-900 mb-2">
              Consultation Booked Successfully!
            </h3>
            
            <p className="text-sm text-ink-600 mb-6">
              Your free <span className="font-semibold text-brand-500">{selectedLabel}</span> consultation session has been scheduled. Our team will contact you shortly with the session details.
            </p>
            
            <button
              onClick={() => setShowModal(false)}
              className="h-11 px-8 rounded-full bg-brand-500 text-white font-medium text-sm hover:bg-brand-600 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}