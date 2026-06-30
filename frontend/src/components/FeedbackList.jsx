function FeedbackList({ feedback }) {
  if (!feedback || feedback.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl p-5 shadow-lg mt-6">
        <h2 className="text-xl font-bold mb-3">
          Recommendations
        </h2>

        <p className="text-green-400">
          ✅ Excellent! No improvements needed.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-5 shadow-lg mt-6">
      <h2 className="text-xl font-bold mb-3">
        Recommendations
      </h2>

      <ul className="space-y-2">
        {feedback.map((item, index) => (
          <li key={index}>
            ⚠ {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackList;