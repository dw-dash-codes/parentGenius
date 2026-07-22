import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/ui/ProgressBar";
import bannerImg from "../../assets/children_img.png"

function FloatingInput({ label, children, ...props }) {
  return (
    <div className="relative border border-brand-500 rounded-xl h-14 flex items-center px-4">
      <label className="absolute -top-2.5 left-4 bg-white px-1 text-xs text-brand-500">
        {label}
      </label>
      {children ? (
        children
      ) : (
        <input className="w-full outline-none text-ink-900 text-sm bg-transparent" {...props} />
      )}
    </div>
  );
}

export default function ChildrenCount() {
  const navigate = useNavigate();
  const [count, setCount] = useState(2);

  return (
    <div className="w-full max-w-3xl">
      <ProgressBar current={2}  />

      <h1 className="text-3xl font-bold text-center mb-8">
        How many children do you have?
      </h1>

      <div className="flex justify-center mb-10">
        <img
          src={bannerImg}
          alt="Children"
          className="w-full max-w-xl rounded-2xl object-cover"
        />
      </div>

      <div className="max-w-xl mx-auto">
        <FloatingInput
          label="Number of Children"
          type="number"
          defaultValue="2"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </div>

      <div className="flex justify-center mt-10 mb-10">
        <button
          onClick={() => navigate("/onboarding/ages", { state: { count } })}
          className="px-16 py-3 rounded-full bg-brand-500 text-white font-semibold hover:bg-brand-600"
        >
          Save &amp; Next
        </button>
      </div>
    </div>
  );
}