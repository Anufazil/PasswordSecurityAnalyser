import CircularGauge from "./CircularGauge";
import SecurityChecklist from "./SecurityChecklist";
import MetricCard from "./MetricCard";
import FeedbackList from "./FeedbackList";
import BreachAlert from "./BreachAlert";
import SecurityStatus from "./SecurityStatus";
import AIRecommendations from "./AIRecommendations";
import RiskMeter from "./RiskMeter";

function ResultPanel({ result, entropy, crackTime }) {
  if (!result) return null;

  return (
    <div className="mt-10">

      {/* Gauges */}
      <div className="flex flex-wrap justify-center gap-10 ">

        <CircularGauge
          title="Health Score"
          value={result.health_score}
        />

        <CircularGauge
          title="Strength Score"
          value={result.score}
        />
        <SecurityChecklist
            checks={result.checks}
        />

      </div>
      <div className="bg-slate-800 rounded-2xl p-6 text-center mt-8">

          <h2 className="text-2xl font-bold mb-3">
              Overall Security Grade
          </h2>

          <div className="text-7xl font-extrabold text-cyan-400">
              {result.security_grade}
          </div>

      </div>
      <div className="bg-slate-800 rounded-2xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
              💡 Smart Recommendations
          </h2>

          <ul className="space-y-3">

              {result.recommendations.map((item, index) => (

                  <li
                      key={index}
                      className="bg-slate-700 rounded-lg p-3"
                  >
                      {item}
                  </li>

              ))}

          </ul>

      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 items-stretch">

        <MetricCard
          title="🧠 Entropy"
          value={`${entropy} bits`}
        />

        <MetricCard
          title="⏳ Crack Time"
          value={crackTime}
        />

        <MetricCard
          title="🛡️ Strength"
          value={result.strength}
        />

        <MetricCard
          title="🔑 Common Password"
          value={result.is_common ? "Yes" : "No"}
        />

      </div>

      <SecurityStatus result={result} />

      <AIRecommendations result={result} />

      <RiskMeter result={result} />

      <BreachAlert
        breached={result.breached}
        breachCount={result.breach_count}
      />

      <FeedbackList
        feedback={result.feedback}
      />

    </div>
  );
}

export default ResultPanel;