import { motion } from "framer-motion";

function Header() {
  return (
    <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
    >

      <img
        src="/logo.png"
        alt="logo"
        className="w-24 mx-auto mb-4"
      />

      <h1 className="text-5xl font-bold tracking-wide">
        Password Security Analyzer
      </h1>

      <p className="text-slate-400 mt-3">
        Analyze password strength, entropy and breach status
      </p>

    </motion.div>
  );
}

export default Header;