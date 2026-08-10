import Logo from "./ui/Logo";
import footerLogo from "../assets/footer-img.png";
import emoji from  "../assets/challenge_completion_emoji.png"

export default function CompletionModal({ isOpen, onClose, onContinue }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="bg-brand-500 py-5 flex justify-center">
          <Logo src={footerLogo} width={160} />
        </div>

        <div className="relative flex flex-col items-center pt-8 pb-4 px-8">
          <img src={emoji} width={200}/>

          <div className="w-36 h-px bg-ink-100 mb-6" />

          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="w-10 h-10 bg-yellow-400 shrink-0"
              style={{
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              }}
            />
            <p className="text-3xl font-black text-ink-900">
              10 <span className="text-xl font-semibold text-ink-500">points received</span>
            </p>
          </div>

          <h2 className="text-2xl font-black text-ink-900 text-center mb-3">
            You learned 12 days<br />in a row!
          </h2>

          <p className="text-ink-500 text-center leading-relaxed mb-8">
            Come back tomorrow again to lean more and to protect your streak
          </p>

          <button
            onClick={onContinue}
            className="w-full h-14 rounded-full bg-brand-500 text-white font-semibold text-lg transition-colors hover:bg-brand-600 mb-2"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}