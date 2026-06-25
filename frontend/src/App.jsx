import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [entropy, setEntropy] = useState("");
  const [crackTime, setCrackTime] = useState("");

  const analyzePassword = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/analyze/${password}`
      );

      const data = await response.json();

      setResult(data);

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
    } catch (error) {
      console.error(error);
    }
  };

  const getColor = () => {
    if (!result) return "black";

    if (result.strength === "Weak") {
      return "red";
    }

    if (result.strength === "Medium") {
      return "orange";
    }

    return "green";
  };

  const generatePassword = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/generate-password"
      );

      const data = await response.json();

      setPassword(data.password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Password Security Analyzer</h1>

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide" : "Show"}
      </button>

      <button onClick={analyzePassword}>
        Analyze
      </button>

      <button onClick={generatePassword}>
        Generate Password
      </button>

      {result && (
        <div>
          <h2>Result</h2>

          <p>Score: {result.score}</p>

          {!result.is_common && (
            <>
              <p>Entropy: {entropy} bits</p>

              <p>
                Estimated Crack Time: {crackTime}
              </p>
            </>
          )}

          <div
            style={{
              width: "300px",
              height: "20px",
              border: "1px solid gray",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "10px"
            }}
          >
            <div
              style={{
                width: `${result.score}%`,
                height: "100%",
                backgroundColor: getColor(),
                transition: "0.5s"
              }}
            />
          </div>

          <p
            style={{
              color: getColor(),
              fontWeight: "bold"
            }}
          >
            Strength: {result.strength}
          </p>

          <ul>
            {result.feedback.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;