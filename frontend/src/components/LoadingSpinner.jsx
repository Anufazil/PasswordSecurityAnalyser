import { motion } from "framer-motion";

function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center mt-10"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear"
        }}
        className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent"
      />

      <p className="mt-6 text-xl text-slate-300">
        Analyzing Password...
      </p>
    </motion.div>
  );
}

export default LoadingSpinner;