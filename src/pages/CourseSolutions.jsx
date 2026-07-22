import { useParams } from "react-router-dom";
import { useState } from "react";
import { FaStar, FaRegBookmark, FaCartShopping } from "react-icons/fa6";
import homeBanner from "../assets/home_banner.jpg";
import courseImg from "../assets/home_course_img.png";
import bookImg from "../assets/book_img.png";
import FeedbackModal from "../components/FeedbackModal";
import TopicHero from "../components/TopicHero";

export default function CourseSolutions() {
  const { topic } = useParams();
  const topicName = topic
    ? topic
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Chores";

  const [helpful, setHelpful] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackAnswer, setFeedbackAnswer] = useState(null);

  const reviews = Array.from({ length: 6 });
  const expertCourses = Array.from({ length: 3 });
  const resources = Array.from({ length: 6 });

  return (
    <div>
      <TopicHero label={topicName} title="Mini Courses" icon={<FaStar size={22} />} />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Community Solutions</h2>

          <button className="h-10 px-5 rounded-full bg-brand-500 text-white text-sm font-medium transition-colors hover:bg-brand-600">
            Upgrade to Unlock
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((_, i) => (
            <div key={i} className="bg-brand-50 rounded-2xl p-2">
              <div className="bg-white rounded-xl p-4 ring-1 ring-ink-100">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src="https://placehold.co/32x32"
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">CatLover92</span>

                  <span className="text-xs text-ink-500">· 22 Jul</span>

                </div>

                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <FaStar key={s} className="text-yellow-400" size={12} />
                  ))}
                  <span className="text-xs text-ink-500 ml-1">(30)</span>

                </div>

                <p className="text-sm text-ink-700 leading-relaxed">
                  KaiB was amazing with our cats!! This was our first time using
                  a pet-sitting service, so we were naturally quite anxious. We
                  took a chance on Kai and completely lucked out! We booked Kai
                  to come twice a day for three days. K...
                  <button className="text-brand-500 font-medium ml-1 hover:underline">
                    Read More
                  </button>

                </p>

              </div>

            </div>

          ))}
        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Expert Courses</h2>

          <button className="h-10 px-5 rounded-full bg-brand-500 text-white text-sm font-medium transition-colors hover:bg-brand-600">
            Upgrade to Unlock
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertCourses.map((_, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden h-64 group"
            >
              <img
                src={courseImg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-brand-500 text-white text-xs px-3 py-1 rounded-full">
                    {topicName}
                  </span>

                  <span className="flex items-center gap-1 text-white text-xs">
                    <FaStar className="text-yellow-400" size={11} /> 4.2
                  </span>

                </div>

                <button className="text-white hover:text-yellow-400">
                  <FaRegBookmark size={16} />
                </button>

              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold mb-2">Fun Chores for Kids</h3>

                <p className="text-xs text-white/80 mb-4 max-w-[70%]">
                  Teaching kids to do chores builds responsibility,
                  confidence.....
                </p>

                <button className="border border-white/70 text-white text-sm px-5 py-2 rounded-full transition-colors hover:bg-white hover:text-brand-500">
                  Upgrade to Unlock
                </button>

              </div>

            </div>

          ))}
        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Resources</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((_, i) => (
            <div
              key={i}
              className="flex gap-4 p-3 rounded-xl ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-accent-400 hover:bg-brand-50"
            >
              <img
                src={bookImg}
                alt=""
                className="w-24 h-36 rounded-lg object-cover shrink-0"
              />
              <div className="flex flex-col">
                <h4 className="font-semibold text-sm mb-1">
                  The Time Has Come
                </h4>

                <p className="text-xs text-ink-500 mb-2">
                  Lindbergh's Pharmacy is an Athens, Georgia, institution...
                </p>
                <p className="text-sm mb-3">
                  <span className="font-bold">$ 27.89</span>{" "}
                  <span className="text-ink-500 line-through text-xs">
                    $ 30.99
                  </span>
                </p>
                <button
                  onClick={() => alert("Added to basket!")}
                  className="mt-auto h-9 px-4 rounded-full bg-accent-500 text-white text-xs font-medium inline-flex items-center gap-1.5 self-start transition-colors hover:bg-accent-600"
                >
                  <FaCartShopping size={11} /> Add to basket
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">1-on-1 Help for Your Family</h2>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden">
            <img src={courseImg} alt="" className="w-full h-72 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <p className="text-white font-semibold text-lg max-w-[70%]">
                Turning everyday tasks into powerful moments of growth and
                self-worth.
              </p>
              <button className="h-9 px-4 rounded-full bg-brand-500 text-white text-xs font-medium shrink-0 transition-colors hover:bg-brand-600">
                Learn More
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-center mb-6">
              Did this solution help?
            </h3>
            <div className="space-y-3 max-w-md mx-auto">
              <button
                onClick={() => {
                  setFeedbackAnswer("yes");
                  setShowFeedback(true);
                }}
                className="w-full h-14 rounded-xl border border-ink-200 text-left px-6 font-medium bg-white text-ink-700 transition-colors hover:border-accent-400"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setFeedbackAnswer("no");
                  setShowFeedback(true);
                }}
                className="w-full h-14 rounded-xl border border-ink-200 text-left px-6 font-medium bg-white text-ink-700 transition-colors hover:border-accent-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </section>

      <FeedbackModal
        isOpen={showFeedback}
        initialAnswer={feedbackAnswer}
        onClose={() => setShowFeedback(false)}
        onSubmit={(data) => {
          console.log("Feedback submitted:", data);
          setShowFeedback(false);
        }}
      />
    </div>
  );
}
