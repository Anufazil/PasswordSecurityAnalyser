import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const maskPassword = (password) => {
  if (password.length <= 4) {
    return "•".repeat(password.length);
  }

  const first = password.slice(0, 3);
  const last = password.slice(-2);

  return first + "•".repeat(password.length - 5) + last;
};

const getStrengthBadge = (strength) => {
  switch (strength) {
    case "Strong":
      return "bg-green-500/20 text-green-400";

    case "Medium":
      return "bg-yellow-500/20 text-yellow-400";

    case "Weak":
      return "bg-orange-500/20 text-orange-400";

    case "Very Weak":
      return "bg-red-500/20 text-red-400";

    default:
      return "bg-slate-600 text-white";
  }
};

function HistoryPanel({
  history,
  setPassword,
  clearHistory,
  deleteHistoryItem,
}) {
  return (
    <div className="mt-10 bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-700 shadow-xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          📜 Recent Analysis
        </h2>

        <button
          onClick={clearHistory}
          className="
            bg-gradient-to-r
            from-red-600
            to-red-500
            hover:scale-105
            transition
            duration-300
            px-5
            py-2
            rounded-xl
            font-semibold
            shadow-lg
          "
        >
          Clear History
        </button>

      </div>

      {history.length === 0 ? (

        <p className="text-slate-400 text-center py-8">
          No history yet.
        </p>

      ) : (

        <div className="space-y-4">

          {history.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.02,
                y: -4,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={() => setPassword(item.password)}
              className="
                cursor-pointer
                rounded-2xl
                bg-slate-800/60
                backdrop-blur-xl
                border
                border-slate-700
                hover:border-cyan-500/50
                shadow-lg
                hover:shadow-cyan-500/20
                transition-all
                duration-300
                p-5
              "
            >

              {/* Top Row */}
              <div className="flex justify-between items-start">

                <div>

                  <p className="font-mono text-cyan-300 text-lg">
                    🔒 {maskPassword(item.password)}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Click to analyze again
                  </p>

                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteHistoryItem(item.password);
                  }}
                  className="
                    p-2
                    rounded-lg
                    hover:bg-red-500/20
                    transition
                  "
                >
                  <Trash2
                    size={18}
                    className="text-red-400"
                  />
                </button>

              </div>

              {/* Bottom Row */}
              <div className="flex justify-between items-center mt-5">

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    ${getStrengthBadge(item.strength)}
                  `}
                >
                  {item.strength}
                </span>

                <div className="text-right">

                  <p className="text-cyan-400 text-lg font-bold">
                    {item.healthScore}/100
                  </p>

                  <p className="text-xs text-slate-400">
                    Health
                  </p>

                </div>

                <span className="text-slate-400 text-sm">
                  {item.timestamp}
                </span>

              </div>

            </motion.div>

          ))}

        </div>

      )}

    </div>
  );
}

export default HistoryPanel;