import { motion } from "framer-motion";

function RiskMeter({ result }) {

  if (!result) return null;

    let risk = "";
    let color = "";
    let message = "";

    let progress = result.breached
    ? 100
    : Math.max(0, Math.min(100, 100 - result.health_score));

    if (result.breached) {

    risk = "CRITICAL";

    color = "bg-red-600";

    message =
        "This password has appeared in public data breaches. Replace it immediately.";

    }

    else if (progress <= 20) {

    risk = "LOW";

    color = "bg-green-500";

    message =
        "Excellent security. This password is considered safe.";

    }

    else if (progress <= 50) {

    risk = "MEDIUM";

    color = "bg-yellow-500";

    message =
        "Good password, but improving it further is recommended.";

    }

    else {

    risk = "HIGH";

    color = "bg-orange-500";

    message =
        "Weak password. Strengthen it before using it online.";

    }

  return (

    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.5 }}

      className="mt-8 bg-slate-800/70 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 shadow-xl"
    >

      <h2 className="text-2xl font-bold mb-6">
        🚨 Password Risk Meter
      </h2>

      <div className="flex justify-between mb-3">

        <span className="text-lg font-semibold">
          {risk} RISK
        </span>

        <span>
          {progress}%
        </span>

      </div>

      <div className="w-full h-4 rounded-full bg-slate-700 overflow-hidden">

        <motion.div

          initial={{ width:0 }}

          animate={{
            width:`${progress}%`
          }}

          transition={{
            duration:1
          }}

          className={`h-full ${color}`}

        />

      </div>

      <p className="mt-5 text-slate-300">
        {message}
      </p>

    </motion.div>

  );

}

export default RiskMeter;