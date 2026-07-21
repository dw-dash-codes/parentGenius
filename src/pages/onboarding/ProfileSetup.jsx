import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/ui/ProgressBar";
import profileImg from "../../assets/profile_img.jpg"


function FloatingInput({ label, children, ...props }) {
  return (
    <div className="relative border border-brand-500 rounded-xl h-14 flex items-center px-4">
      <label className="absolute -top-2.5 left-4 bg-white px-1 text-xs text-brand-500">
        {label}
      </label>
      {children ? (
        children
      ) : (
        <input
          className="w-full outline-none text-ink-900 text-sm bg-transparent"
          {...props}
        />
      )}
    </div>
  );
}

export default function ProfileSetup() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-3xl">
      <ProgressBar current={1} total={10} />

      <h1 className="text-3xl font-bold text-center mb-8">Profile Setup</h1>


      <div className="flex justify-center mb-10">
        <div className="relative">
          <img
            src={profileImg}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover"
          />
          <button
            type="button"
            className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-accent-500 flex items-center justify-center text-white text-sm ring-4 ring-white hover:bg-accent-600"
          >
            ✎
          </button>
        </div>
      </div>


      <div className="max-w-xl mx-auto space-y-5">
        <FloatingInput label="Full Name" defaultValue="Debborah Willson" />
        <FloatingInput
          label="Email Address"
          type="email"
          defaultValue="abc@gmail.com"
        />

        <FloatingInput label="Phone Number">
          <div className="flex items-center gap-2">
            <span className="text-xl">🇬🇧</span>
            <span className="text-ink-500 text-xs">▾</span>
            <input
              className="flex-1 outline-none text-ink-900 text-sm bg-transparent"
              defaultValue="0000000"
            />
          </div>
        </FloatingInput>

        <FloatingInput label="Country & Time Zone">
          <select className="w-full outline-none text-ink-900 text-sm bg-transparent appearance-none pr-6">
            <option>cityabc,ayx</option>
            <option>Another city</option>
          </select>
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-500 pointer-events-none"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M6 9l6 6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </FloatingInput>
      </div>


      <div className="flex justify-center mt-10 mb-10">
        <button
          onClick={() => navigate("/onboarding/children")}
          className="px-16 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600"
        >
          Save &amp; Next
        </button>
      </div>
    </div>
  );
}