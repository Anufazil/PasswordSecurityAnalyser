import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
} from "lucide-react";

function SecurityStatus({ result }) {
  if (!result) return null;

  let title = "";
  let description = "";
  let bg = "";
  let Icon = ShieldCheck;

  if (result.breached) {
    title = "Critical Risk";
    description =
      "This password has appeared in public data breaches. Replace it immediately.";

    bg = "bg-red-900/30 border-red-600";

    Icon = ShieldX;
  } else if (result.health_score >= 80) {
    title = "Excellent Security";

    description =
      "Strong password with no known breaches.";

    bg = "bg-green-900/30 border-green-600";

    Icon = ShieldCheck;
  } else if (result.health_score >= 60) {
    title = "Moderate Security";

    description =
      "Good password, but there is room for improvement.";

    bg = "bg-yellow-900/30 border-yellow-600";

    Icon = ShieldAlert;
  } else {
    title = "Weak Security";

    description =
      "Password should be strengthened before use.";

    bg = "bg-orange-900/30 border-orange-600";

    Icon = ShieldAlert;
  }

  return (
    <div
      className={`mt-8 rounded-2xl border p-6 ${bg}`}
    >
      <div className="flex items-center gap-4">

        <Icon size={40} />

        <div>

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <p className="text-slate-300 mt-2">
            {description}
          </p>

        </div>

      </div>
    </div>
  );
}

export default SecurityStatus;