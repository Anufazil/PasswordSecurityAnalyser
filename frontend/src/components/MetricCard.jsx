function MetricCard({ title, value }) {
  return (
    <div
      className="
      bg-slate-800/70
      backdrop-blur-lg
      rounded-2xl
      border
      border-slate-700
      shadow-xl
      hover:border-blue-500
      hover:scale-[1.02]
      transition-all
      duration-300

      h-36
      p-6

      flex
      flex-col
      justify-between
      "
    >
      <h3 className="text-slate-400 text-lg">
        {title}
      </h3>

      <p className="text-4xl font-bold">
        {value}
      </p>
    </div>
  );
}

export default MetricCard;