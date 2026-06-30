import CircularGauge from "./CircularGauge";
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