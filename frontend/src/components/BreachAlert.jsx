function BreachAlert({ breached, breachCount }) {
  if (breached) {
    return (
      <div className="bg-red-900 border border-red-500 rounded-xl p-5 mt-6">
        <h2 className="text-xl font-bold text-red-300">
          ⚠ Password Found in Data Breaches
        </h2>

        <p className="mt-2">
          This password has appeared{" "}
          <strong>
            {breachCount.toLocaleString()}
          </strong>{" "}
          times.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-green-900 border border-green-500 rounded-xl p-5 mt-6">
      <h2 className="text-xl font-bold text-green-300">
        ✅ No Known Breaches
      </h2>

      <p className="mt-2">
        This password was not found in known data breaches.
      </p>
    </div>
  );
}

export default BreachAlert;