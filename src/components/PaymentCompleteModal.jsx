import { useNavigate } from "react-router-dom";
import Logo from "./ui/Logo";
import footerLogo from "../assets/footer-img.png";

export default function PaymentCompleteModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="bg-brand-500 py-5 flex justify-center">
          <Logo src={footerLogo} width={160} />
        </div>

        <div
          className="h-3 w-full bg-[#dbe8e1]"
          style={{
            borderRadius: "0 0 50% 50% / 0 0 100% 100%",
          }}
        />

        <div className="flex flex-col items-center px-8 pt-8 pb-8 text-center">
          <div className="relative flex items-center justify-center mb-8">
            <span className="absolute -top-3 -left-5 w-4 h-4 rounded-full bg-[#529e64]" />
            <span className="absolute -top-4 right-1 w-2 h-2 rounded-full bg-[#529e64]" />
            <span className="absolute top-2 -right-4 w-4 h-4 rounded-full bg-[#529e64]" />
            <span className="absolute -right-6 bottom-4 w-2.5 h-2.5 rounded-full bg-[#529e64]" />
            <span className="absolute right-0 -bottom-3 w-2.5 h-2.5 rounded-full bg-[#529e64]" />
            <span className="absolute right-8 -bottom-5 w-1.5 h-1.5 rounded-full bg-[#529e64]" />
            <span className="absolute left-6 -bottom-4 w-2 h-2 rounded-full bg-[#529e64]" />
            <span className="absolute -left-6 bottom-3 w-3 h-3 rounded-full bg-[#529e64]" />
            <span className="absolute -left-7 top-4 w-1.5 h-1.5 rounded-full bg-[#529e64]" />

            <div className="w-32 h-32 rounded-full bg-[#529e64] flex items-center justify-center shadow-md">
              <div
                className="w-16 h-16 bg-white flex items-center justify-center"
                style={{
                  clipPath:
                    "polygon(50% 0%, 61% 10%, 75% 6%, 80% 19%, 95% 23%, 91% 37%, 100% 50%, 91% 63%, 95% 77%, 80% 81%, 75% 94%, 61% 90%, 50% 100%, 39% 90%, 25% 94%, 20% 81%, 5% 77%, 9% 63%, 0% 50%, 9% 37%, 5% 23%, 20% 19%, 25% 6%, 39% 10%)",
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#529e64"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-ink-900 mb-2">
            Payment Complete!
          </h2>

          <p className="text-sm sm:text-base text-ink-500 mb-8">
            You have successfully subscribed
          </p>

          <button
            type="button"
            onClick={() => {
              if (onClose) onClose();
              navigate("/home");
            }}
            className="w-full h-12 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition-all active:scale-95"
          >
            Go Back To Home
          </button>
        </div>
      </div>
    </div>
  );
}