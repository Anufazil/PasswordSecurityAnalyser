import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function CircularGauge({
  title,
  value,
  max = 100,
  unit = "",
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [progress, setProgress] = useState(0);

  const percentage = (value / max) * 100;

  const getColor = (percent) => {
    if (percent >= 80) return "#22c55e";
    if (percent >= 60) return "#facc15";
    return "#ef4444";
  };

  useEffect(() => {
    let start = 0;

    const duration = 1000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        start = value;
        clearInterval(timer);
      }

      setDisplayValue(Math.round(start));
      setProgress((start / max) * 100);
    }, 16);

    return () => clearInterval(timer);
  }, [value, max]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.85,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
      }}
      transition={{
        duration: 0.5,
      }}
      className="bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-700 hover:border-blue-500 p-6 w-72 flex flex-col items-center"
    >
      <div className="w-40 h-40">
        <CircularProgressbar
          value={progress}
          text={`${displayValue}${unit}`}
          styles={buildStyles({
            pathColor: getColor(progress),
            trailColor: "#334155",
            textColor: "#ffffff",
            textSize: "16px",
            pathTransition: "none",
          })}
        />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-white">
        {title}
      </h2>
    </motion.div>
  );
}

export default CircularGauge;