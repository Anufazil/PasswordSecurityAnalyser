import { Shield, Lock, AlertTriangle, Activity } from "lucide-react";
import { motion } from "framer-motion";

function DashboardStats({ history }) {

  const total = history.length;

  const strong = history.filter(
    (item) => item.strength === "Strong"
  ).length;

  const breached = history.filter(
    (item) => item.breached
  ).length;

  const validHistory = history.filter(
    (item) => typeof item.healthScore === "number"
  );

  const avgHealth =
    total === 0
      ? 0
      : Math.round(
          history.reduce(
            (sum, item) => sum + item.healthScore,
            0
          ) / total
        );

  const cards = [
    {
      title: "Total Analyses",
      value: total,
      icon: Activity,
      color: "text-cyan-400",
    },
    {
      title: "Strong Passwords",
      value: strong,
      icon: Shield,
      color: "text-green-400",
    },
    {
      title: "Breached",
      value: breached,
      icon: AlertTriangle,
      color: "text-red-400",
    },
    {
      title: "Avg Health",
      value: `${avgHealth}%`,
      icon: Lock,
      color: "text-blue-400",
    },
  ];
  console.log(history);

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

      {cards.map((card, index) => {

        const Icon = card.icon;

        return (

          <motion.div
            key={index}
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:index * 0.1 }}
            whileHover={{
              scale:1.03,
              y:-4
            }}
            className="
                bg-gradient-to-br
                from-slate-800/80
                to-slate-900/80
                backdrop-blur-xl
                rounded-2xl
                border
                border-slate-700
                hover:border-cyan-500/50
                p-6
                shadow-xl
                hover:shadow-cyan-500/20
                transition-all
                duration-300
                "
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400 text-sm">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {card.value}
                </h2>

                <p className="text-xs text-slate-400 mt-2">
                    Live Dashboard
                </p>

              </div>

            <motion.div
                    animate={{
                        scale:[1,1.1,1]
                    }}

                    transition={{
                        repeat:Infinity,
                        duration:2
                    }}
                >
                <Icon
                    size={42}
                    className={card.color}
                />
            </motion.div>

            </div>

          </motion.div>

        );

      })}

    </div>

  );

}

export default DashboardStats;