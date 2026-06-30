import {
  Shield,
  KeyRound,
  Lock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

function AIRecommendations({ result }) {
  if (!result) return null;

  const recommendations = [];

  // Critical recommendation
  if (result.breached) {
    recommendations.push({
      icon: AlertTriangle,
      color: "text-red-400",
      text: "Replace this password immediately. It appears in known data breaches.",
    });
  }

  // Feedback from backend
  result.feedback.forEach((item) => {
    recommendations.push({
      icon: KeyRound,
      color: "text-yellow-400",
      text: item,
    });
  });

  // General security advice
  recommendations.push({
    icon: Shield,
    color: "text-blue-400",
    text: "Enable Multi-Factor Authentication (MFA).",
  });

  recommendations.push({
    icon: Lock,
    color: "text-green-400",
    text: "Store passwords in a trusted password manager.",
  });

  // Strong password message
  if (
    result.feedback.length === 0 &&
    !result.breached
  ) {
    recommendations.unshift({
      icon: CheckCircle,
      color: "text-green-400",
      text: "Excellent! Your password follows strong security practices.",
    });
  }

  return (
    <div className="mt-8 bg-slate-800/70 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 shadow-xl">

      <h2 className="text-2xl font-bold mb-6">
        🧠 AI Security Recommendations
      </h2>

      <div className="space-y-4">

        {recommendations.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-4"
            >
              <Icon
                className={item.color}
                size={24}
              />

              <p className="text-slate-300">
                {item.text}
              </p>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default AIRecommendations;