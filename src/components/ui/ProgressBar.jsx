export default function ProgressBar({ current, total = 10 }) {
  return (
    <div className="flex gap-2 max-w-3xl mx-auto mb-12">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
            i < current ? "bg-accent-500" : "bg-ink-300"
          }`}
        />
      ))}
    </div>
  );
}