import Logo from "./ui/Logo";

export default function NotificationModal({ isOpen, onClose, onAllow }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
      >

        <div className="bg-brand-500 py-6 flex justify-center">
          <Logo src={"src/assets/footer-img.png"} width={170} />
        </div>

        <div className="px-8 py-8 text-center">
          <h2 className="text-xl font-bold mb-8">Turn On Notifications</h2>

          <img
            src="https://placehold.co/180x180"
            alt="Notifications"
            className="w-44 h-44 mx-auto mb-8 object-contain"
          />

          <p className="text-ink-500 mb-8">
            Turn on notifications to get daily tips, reminders, and updates tailored just for you.
          </p>

          <button
            onClick={onAllow}
            className="w-full h-14 rounded-full bg-brand-500 text-white font-semibold text-lg hover:bg-brand-600"
          >
            Allow
          </button>
        </div>

      </div>
    </div>
  );
}