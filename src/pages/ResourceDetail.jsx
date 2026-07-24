import { useParams } from "react-router-dom";
import { FaStar, FaCartShopping } from "react-icons/fa6";
import bookImg from "../assets/book_img.png";

const PARAGRAPHS = [
  `He searches out eight leading climate thinkers from collapse-psychologist Jamey Hecht to grassroots strategist adrienne maree brown, eco-philosopher Joanna Macy, and Indigenous botanist Robin Wall Kimmerer — asking them: "Is it really the end of the world? and if so, now what?"`,
  `With gallows humor and a broken heart, Boyd steers readers through their climate angst as he walks his own. From storm-battered coastlines to pipeline blockades and "hopelessness workshops," he maps out our existential options, and tackles some familiar dilemmas:`,
];

export default function ResourceDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="grid lg:grid-cols-[1fr_420px] gap-10 mb-12">

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            I want to become a Better Parent
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="font-semibold text-lg">Andrew Boyd</span>
            <span className="inline-flex items-center gap-1.5 bg-ink-900 text-white text-sm px-3 py-1 rounded-full">
              <FaStar className="text-yellow-400" size={13} /> 4.8 (1k+ Review)
            </span>
          </div>

          <p className="text-ink-500 mb-8">The story follows a woman named Nora Seed</p>

          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <div className="space-y-4">
            {PARAGRAPHS.map((p, i) => (
              <p key={i} className="text-ink-500 leading-relaxed">{p}</p>
            ))}
          </div>
        </div>

        <div>
          <img
            src={bookImg}
            alt="Book cover"
            className="w-full  object-cover mb-5 mt-10"
          />
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => alert("Order placed!")}
              className="h-14 rounded-full bg-accent-500 text-white font-medium inline-flex items-center justify-center gap-2 transition-colors hover:bg-accent-600"
            >
              <FaCartShopping size={16} /> Order Now
            </button>
            <button
              onClick={() => alert("Free trial started!")}
              className="h-14 rounded-full bg-accent-500 text-white font-medium inline-flex items-center justify-center gap-2 transition-colors hover:bg-accent-600"
            >
              <FaCartShopping size={16} /> Free Trial
            </button>
          </div>
        </div>
      </div>

      <section className="pb-10">
        <h2 className="text-2xl font-bold mb-4">Section 1</h2>
        <div className="space-y-6">
          {[1, 2, 3].map((block) => (
            <div key={block} className="space-y-4">
              {PARAGRAPHS.map((p, i) => (
                <p key={i} className="text-ink-500 leading-relaxed">{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}