import { useState, useEffect, useRef } from "react";

import Header from "./components/Header";
import PasswordForm from "./components/PasswordForm";
import ResultPanel from "./components/ResultPanel";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import HistoryPanel from "./components/HistoryPanel";
import DashboardStats from "./components/DashboardStats";

import toast from "react-hot-toast";



function App() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [entropy, setEntropy] = useState("");
  const [crackTime, setCrackTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const debounceRef = useRef(null);

  const [history, setHistory] = useState(() => {
  const saved = localStorage.getItem("passwordHistory");
  return saved ? JSON.parse(saved) : [];
  });

  const analyzePassword = async () => {
    clearTimeout(debounceRef.current);

    if (!password.trim()) return;

    try {
      setLoading(true);

      // Password Analysis
      const response = await fetch(
        `http://127.0.0.1:8000/analyze/${password}`
      );

      const data = await response.json();

      setResult(data);

      toast.success("✅ Password analyzed successfully!");

      const newEntry = {
        password,
        strength: data.strength,
        healthScore: data.health_score,
        breached: data.breached,
        timestamp: new Date().toLocaleTimeString(),
      };

      setHistory((prev) => {
        const updated = [
          newEntry,
          ...prev.filter(item => item.password !== password),
        ].slice(0, 10);

        localStorage.setItem(
          "passwordHistory",
          JSON.stringify(updated)
        );

        return updated;
      });

      if (data.breached) {
        toast.error(
          `⚠ Password found in ${data.breach_count.toLocaleString()} breaches`
        );
      }

      // Entropy
      if (data.is_common) {
        setEntropy("");
        setCrackTime("");
      } else {
        const entropyResponse = await fetch(
          `http://127.0.0.1:8000/entropy/${password}`
        );

        const entropyData = await entropyResponse.json();

        setEntropy(entropyData.entropy);
        setCrackTime(entropyData.crack_time);
      }

      setLoading(false);

    } catch (error) {
      console.error(error);

      toast.error("❌ Something went wrong!");

      setLoading(false);
    }
  };

  const generatePassword = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/generate-password"
      );

      const data = await response.json();

      setPassword(data.password);

      toast.success("✅ Secure password generated!");

    } catch (error) {
      console.error(error);

      toast.error("❌ Something went wrong!");
    }
  };

  const copyPassword = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);

      setCopied(true);

      toast.success("📋 Password copied!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {
      console.error(error);

      toast.error("❌ Failed to copy password!");
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("passwordHistory");
    toast.success("✅ History cleared!");
  };

  const deleteHistoryItem = (passwordToDelete) => {
  const updated = history.filter(
    (item) => item.password !== passwordToDelete
  );

  setHistory(updated);

  localStorage.setItem(
    "passwordHistory",
    JSON.stringify(updated)
  );

  toast.success("History item removed");
};

  useEffect(() => {
    if (!password.trim()) {
      setResult(null);
      setEntropy("");
      setCrackTime("");
      return;
    }

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      analyzePassword();
    }, 3000);

    return () => clearTimeout(debounceRef.current);

  }, [password]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <Header />

        <DashboardStats
            history={history}
        />

        <PasswordForm
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          analyzePassword={analyzePassword}
          generatePassword={generatePassword}
          copyPassword={copyPassword}
          copied={copied}
          loading={loading}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <ResultPanel
            result={result}
            entropy={entropy}
            crackTime={crackTime}
          />
        )}

        <HistoryPanel
          history={history}
          setPassword={setPassword}
          clearHistory={clearHistory}
          deleteHistoryItem={deleteHistoryItem}
        />

        <Footer />

      </div>

    </div>
  );
}

export default App;