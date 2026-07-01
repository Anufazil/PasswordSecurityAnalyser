import { CheckCircle, XCircle } from "lucide-react";

function SecurityChecklist({ checks }) {

  if (!checks) return null;

  const labels = {
    length: "Length",
    uppercase: "Uppercase",
    lowercase: "Lowercase",
    numbers: "Numbers",
    symbols: "Symbols",
    common: "Not Common Password",
    breached: "Not Breached",
    keyboard: "No Keyboard Pattern",
    sequence: "No Sequential Pattern",
    repeat: "No Repeated Characters",
    dictionary: "No Dictionary Words",
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 mt-8">

      <h2 className="text-2xl font-bold mb-5">
        Security Checklist
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {Object.entries(labels).map(([key, label]) => (

          <div
            key={key}
            className="flex items-center gap-3"
          >

            {checks[key] ? (
              <CheckCircle className="text-green-500" />
            ) : (
              <XCircle className="text-red-500" />
            )}

            <span>{label}</span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SecurityChecklist;