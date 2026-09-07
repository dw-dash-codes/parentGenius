import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar, FaCartShopping, FaArrowLeft, FaCheck, FaBookOpen } from "react-icons/fa6";
import bookImg from "../assets/book_img.png";

const STATIC_FALLBACK_RESOURCES = {
  "amz-1": {
    title: "The Whole-Brain Child",
    author: "Daniel J. Siegel & Tina Payne Bryson",
    rating: "4.9 (2.4k+ Reviews)",
    tagline: "12 Revolutionary Strategies to Nurture Your Child's Developing Mind",
    price: "$ 18.99",
    oldPrice: "$ 24.99",
    overview: [
      "In this pioneering, practical book, Daniel J. Siegel, neuropsychiatrist, and parenting expert Tina Payne Bryson demystify the meltdowns and tantrums of childhood.",
      "By applying these insights to everyday parenting, you can turn any outburst, argument, or fear into a chance to integrate your child's brain and foster vital growth."
    ],
    keyPoints: [
      "Connect and Redirect: Calming emotional storms with empathy before logic.",
      "Name It to Tame It: Helping kids tell the story of what frightened or upset them.",
      "Engage, Don't Enrage: Keeping the upstairs brain active during tough moments."
    ]
  },
  "default": {
    title: "I Want to Become a Better Parent",
    author: "Dr. Andrew Boyd",
    rating: "4.8 (1.2k+ Reviews)",
    tagline: "Practical blueprints for calm, conscious, and connected modern parenting",
    price: "$ 27.89",
    oldPrice: "$ 30.99",
    overview: [
      "A step-by-step exploration of positive parenting methods designed to build emotional intelligence, mutual respect, and consistent communication with children of all ages.",
      "Learn how to manage parental burnout, establish healthy daily routines, and handle behavioral challenges without relying on yelling or punishment."
    ],
    keyPoints: [
      "Building emotional resilience in toddlers and pre-teens through validation.",
      "Establishing bedtime and screen-time boundaries that kids respect.",
      "De-escalating conflicts using calm tone modeling and active listening."
    ]
  }
};

export default function ResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(STATIC_FALLBACK_RESOURCES[id] || STATIC_FALLBACK_RESOURCES.default);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResourceDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/resources/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.title) {
            setResource(data);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResourceDetail();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <button
        onClick={() => navigate("/resources")}
        className="flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 mb-8 cursor-pointer"
      >
        <FaArrowLeft size={13} /> Back to Resources
      </button>

      <div className="grid lg:grid-cols-[1fr_380px] gap-12 mb-12 items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 bg-ink-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
              <FaStar className="text-yellow-400" size={12} /> {resource.rating || "4.8 (1k+ Reviews)"}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-500 bg-brand-50 px-3 py-1 rounded-full ring-1 ring-brand-100">
              Parenting Guide
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 mb-3 leading-tight">
            {resource.title}
          </h1>

          <p className="text-sm font-semibold text-ink-600 mb-4">
            By <span className="text-ink-900">{resource.author || "ParentGenius Editorial"}</span>
          </p>

          <p className="text-base text-brand-600 font-medium italic mb-8">
            "{resource.tagline || resource.desc || "Actionable strategies for positive family dynamics."}"
          </p>

          <div className="bg-white rounded-3xl p-6 ring-1 ring-ink-100 mb-8 shadow-sm">
            <h2 className="text-xl font-bold text-ink-900 mb-4">Book Overview</h2>
            <div className="space-y-4">
              {(resource.overview || [resource.desc || "Detailed practical guide."]).map((p, i) => (
                <p key={i} className="text-ink-700 leading-relaxed text-sm sm:text-base">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="bg-brand-50 rounded-3xl p-6 ring-1 ring-brand-100">
            <h3 className="text-lg font-bold text-ink-900 mb-4 flex items-center gap-2">
              <FaBookOpen className="text-brand-500" size={18} /> What You Will Learn
            </h3>
            <div className="space-y-3">
              {(resource.keyPoints || [
                "Practical daily routines to eliminate morning stress.",
                "Emotional regulation frameworks for parents and kids.",
                "Proven approaches to positive boundary reinforcement."
              ]).map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <FaCheck size={10} />
                  </span>
                  <p className="text-sm text-ink-700 leading-normal">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 ring-1 ring-ink-100 shadow-lg sticky top-24">
          <img
            src={resource.image || bookImg}
            alt={resource.title}
            className="w-full h-80 rounded-2xl object-cover mb-6 shadow-sm"
          />

          <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-ink-100">
            <div>
              <span className="text-3xl font-extrabold text-ink-900">{resource.price || "$ 27.89"}</span>
              {resource.oldPrice && (
                <span className="text-ink-400 line-through text-sm ml-2 font-medium">
                  {resource.oldPrice}
                </span>
              )}
            </div>
            <span className="text-xs font-bold text-accent-600 bg-accent-50 px-2.5 py-1 rounded-md ring-1 ring-accent-200">
              Save 20%
            </span>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => alert(`Order placed for ${resource.title}!`)}
              className="w-full h-12 rounded-full bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <FaCartShopping size={14} /> Order on Amazon
            </button>
            <button
              onClick={() => alert("Digital preview sample sent to your email!")}
              className="w-full h-12 rounded-full border-2 border-brand-500 text-brand-500 hover:bg-brand-50 font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Read Free Sample
            </button>
          </div>

          <p className="text-center text-[11px] text-ink-400 mt-4">
            Instant digital access available upon verified purchase.
          </p>
        </div>
      </div>
    </div>
  );
}