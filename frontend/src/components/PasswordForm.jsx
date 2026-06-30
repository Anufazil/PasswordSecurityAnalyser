import { Eye, EyeOff, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

function PasswordForm({
  password,
  setPassword,
  showPassword,
  setShowPassword,
  analyzePassword,
  generatePassword,
  copyPassword,
  copied,
  loading,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-slate-800/70 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-slate-700"
    >
      <label className="font-semibold text-lg">
        Password
      </label>

      <div className="flex mt-3">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          className="
            flex-1
            bg-slate-900
            border
            border-slate-700
            rounded-l-xl
            px-5
            py-4
            text-white
            focus:border-blue-500
            focus:outline-none
            transition
          "
        />

        <button
          onClick={() => setShowPassword(!showPassword)}
          className="bg-slate-700 hover:bg-slate-600 transition px-5 rounded-r-xl"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <div className="flex gap-6 mt-8 flex-wrap">
        <button
          onClick={analyzePassword}
          disabled={loading}
          className="
            bg-blue-600
            hover:bg-blue-700
            hover:scale-105
            transition-all
            duration-300
            shadow-lg
            rounded-xl
            px-6
            py-3
            font-semibold
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        <button
          onClick={generatePassword}
          className="
            bg-green-600
            hover:bg-green-700
            hover:scale-105
            transition-all
            duration-300
            shadow-lg
            rounded-xl
            px-6
            py-3
            font-semibold
          "
        >
          Generate Password
        </button>

        <button
          onClick={copyPassword}
          disabled={!password}
          className={`
            flex items-center gap-2
            px-6 py-3
            rounded-xl
            font-semibold
            shadow-lg
            transition-all
            duration-300
            ${
              copied
                ? "bg-emerald-600"
                : "bg-purple-600 hover:bg-purple-700 hover:scale-105"
            }
            ${
              !password
                ? "opacity-50 cursor-not-allowed"
                : ""
            }
          `}
        >
          {copied ? (
            <>
              <Check size={20} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={20} />
              Copy Password
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default PasswordForm;