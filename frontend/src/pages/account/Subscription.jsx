import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaStar, FaCircleCheck } from "react-icons/fa6";
import homeBanner from "../../assets/home_banner.jpg";
import PaymentCompleteModal from "../../components/PaymentCompleteModal";

export default function Subscription() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("full");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        await fetch("${import.meta.env.VITE_API_BASE_URL}/api/users/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ tier: "Tier 4" }),
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/account");
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-accent-500 text-white pt-28 pb-20 px-6">
        <img
          src={homeBanner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500/95 via-green-600/85 to-accent-500/95" />

        <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-wide">
            Subscription
          </h1>

          <div className="flex items-center gap-1.5 text-yellow-300 mb-6">
            <FaStar size={18} />
            <FaStar size={18} />
            <FaStar size={18} />
            <FaStar size={18} />
            <FaStar size={18} />
          </div>

          <blockquote className="text-xl sm:text-2xl font-bold max-w-2xl leading-snug">
            &ldquo;Building trust with doctors leads to lasting success in
            therapy.&rdquo;
          </blockquote>
          <div className="w-12 h-0.5 bg-white/70 mt-4 rounded-full" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-10 sm:-mt-12 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl ring-1 ring-ink-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center text-white">
                    <FaGraduationCap size={18} />
                  </div>
                  <span className="font-extrabold text-lg text-ink-900">
                    Free
                  </span>
                </div>
                <span className="text-3xl font-black text-ink-900">$0</span>
              </div>

              <p className="text-xs text-ink-500 mb-6 leading-relaxed">
                For curious parents ready to start the transformation.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Full access to the 30-Day Challenge",
                  "Preview mini-course",
                  "Parenting tools & apps",
                  "Curated book recommendations",
                  "Access to paid course library",
                  "Opt-in for weekly parenting tips (email series)",
                ].map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-700"
                  >
                    <FaCircleCheck
                      className="text-accent-500 shrink-0 mt-0.5"
                      size={14}
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl ring-1 ring-ink-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center text-white">
                  <FaGraduationCap size={18} />
                </div>
                <span className="font-extrabold text-lg text-ink-900">
                  Premium Plan
                </span>
              </div>

              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-3xl font-black text-ink-900">
                  $29/month
                </span>
                <span className="text-xs font-semibold text-ink-400 uppercase">
                  Cancel Anytime
                </span>
              </div>

              <p className="text-xs text-ink-500 mb-6 leading-relaxed">
                For proactive parents who want daily tools and community
                support. Includes everything in Free version, plus:
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Quick Search tool for 100+ Solutions by challenge & age",
                  "52-Week Family Reset Plan: Rebuild the family the right way",
                  "Community Solutions: what's working for other parents - our most powerful tool",
                  "Character Building courses for kids",
                  "Resource Library",
                  "Access to paid expert courses",
                  "Track Progress and Earn Rewards",
                  "Weekly Tips",
                ].map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-700"
                  >
                    <FaCircleCheck
                      className="text-accent-500 shrink-0 mt-0.5"
                      size={14}
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-4">
              <button
                type="button"
                onClick={handlePayment}
                className="w-full h-11 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Upgrade Plan
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#3b5bff] via-[#2f49e6] to-[#1a2d9c] rounded-3xl p-6 sm:p-8 shadow-2xl text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <FaGraduationCap size={18} />
                </div>
                <span className="font-extrabold text-lg">Ambassador Plan</span>
              </div>

              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-3xl font-black">$19/month</span>
                <span className="text-xs font-semibold text-white/70 uppercase">
                  Cancel Anytime
                </span>
              </div>

              <p className="text-xs text-white/85 mb-6 leading-relaxed">
                Everything in the premium plan for less! Share a helpful
                parenting tip on socials once a month using our one-click
                &lsquo;smart&rsquo; share button. We provide the content—you
                just click and share the tip, that&rsquo;s it!
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited access to over 100 expert-led mini-courses",
                  "Early access to new courses and content drops",
                  "Priority support and onboarding help",
                  "Ambassador Program discount",
                  "Future features included",
                ].map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-white/95"
                  >
                    <FaCircleCheck
                      className="text-white shrink-0 mt-0.5"
                      size={14}
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-4">
              <button
                type="button"
                onClick={handlePayment}
                className="w-full h-11 rounded-full bg-white text-brand-600 font-bold text-sm shadow-md transition-all hover:bg-ink-100 active:scale-95 cursor-pointer"
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-ink-100 my-14" />

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 items-start mb-12">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-ink-900 mb-4">
                Choose how to pay
              </h3>

              <div className="space-y-3">
                <label
                  onClick={() => setPaymentMethod("full")}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "full"
                      ? "border-ink-900 bg-white shadow-sm ring-1 ring-ink-900"
                      : "border-ink-200 bg-white hover:border-ink-400"
                  }`}
                >
                  <span className="text-sm font-bold text-ink-900">
                    Pay $1,137.00 now
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      paymentMethod === "full"
                        ? "border-ink-900 bg-ink-900 text-white"
                        : "border-ink-300"
                    }`}
                  >
                    {paymentMethod === "full" && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod("klarna")}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "klarna"
                      ? "border-ink-900 bg-white shadow-sm ring-1 ring-ink-900"
                      : "border-ink-200 bg-white hover:border-ink-400"
                  }`}
                >
                  <div>
                    <span className="text-sm font-bold text-ink-900 block">
                      Pay monthly with Klarna
                    </span>
                    <span className="text-xs text-ink-500">
                      From $106 per month for 12 months. Interest may apply.
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      paymentMethod === "klarna"
                        ? "border-ink-900 bg-ink-900 text-white"
                        : "border-ink-300"
                    }`}
                  >
                    {paymentMethod === "klarna" && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-2 lg:pt-11">
              <button
                type="button"
                disabled={loading}
                onClick={handlePayment}
                className="w-full h-12 rounded-full bg-[#4caf50] hover:bg-[#429646] text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Processing..." : "Proceed The Payment"}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-ink-900 mb-4">
              Add New Card
            </h3>

            <form onSubmit={handlePayment} className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                  Name on Card
                </label>
                <input
                  type="text"
                  name="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={handleChange}
                  placeholder="E.g. John Doe"
                  className="w-full h-12 rounded-xl border border-ink-200 px-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="E.g. 1234-5678-9012-3456"
                  className="w-full h-12 rounded-xl border border-ink-200 px-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="E.g. 07/28"
                    className="w-full h-12 rounded-xl border border-ink-200 px-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                    CVC
                  </label>
                  <input
                    type="text"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full h-12 rounded-xl border border-ink-200 px-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <PaymentCompleteModal
        isOpen={showModal}
        onClose={handleModalClose}
      />
    </div>
  );
}