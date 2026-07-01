import jsPDF from "jspdf";

function ExportButtons({ result, entropy, crackTime }) {
  if (!result) return null;

  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-");

  const exportJSON = () => {
    const report = {
      generated_at: new Date().toLocaleString(),
      strength: result.strength,
      score: result.score,
      health_score: result.health_score,
      security_grade: result.security_grade || "N/A",
      entropy,
      crack_time: crackTime,
      breached: result.breached,
      breach_count: result.breach_count,
      feedback: result.feedback || [],
      recommendations: result.recommendations || [],
      checks: result.checks || {},
    };

    const blob = new Blob(
      [JSON.stringify(report, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Password_Report_${timestamp}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const report = [
      ["Property", "Value"],
      ["Generated At", new Date().toLocaleString()],
      ["Strength", result.strength],
      ["Score", result.score],
      ["Health Score", result.health_score],
      ["Security Grade", result.security_grade || "N/A"],
      ["Entropy", entropy],
      ["Crack Time", crackTime],
      ["Breached", result.breached ? "Yes" : "No"],
      ["Breach Count", result.breach_count],
      ["Feedback", (result.feedback || []).join(" | ")],
      ["Recommendations", (result.recommendations || []).join(" | ")],
    ];

    const csvContent = report
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Password_Report_${timestamp}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Password Security Analyzer", 20, y);

    y += 10;

    doc.setFontSize(14);
    doc.text("Security Report", 20, y);

    y += 15;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, y);

    y += 15;

    doc.text(`Strength: ${result.strength}`, 20, y);
    y += 8;

    doc.text(`Score: ${result.score}`, 20, y);
    y += 8;

    doc.text(`Health Score: ${result.health_score}/100`, 20, y);
    y += 8;

    doc.text(
      `Security Grade: ${result.security_grade || "N/A"}`,
      20,
      y
    );
    y += 8;

    doc.text(`Entropy: ${entropy} bits`, 20, y);
    y += 8;

    doc.text(`Crack Time: ${crackTime}`, 20, y);
    y += 8;

    doc.text(
      `Breached: ${result.breached ? "YES" : "NO"}`,
      20,
      y
    );

    y += 15;

    doc.setFont("helvetica", "bold");
    doc.text("Recommendations", 20, y);

    y += 8;

    doc.setFont("helvetica", "normal");

    if (
      result.recommendations &&
      result.recommendations.length > 0
    ) {
      result.recommendations.forEach((item) => {
        doc.text(`• ${item}`, 25, y);
        y += 7;
      });
    } else {
      doc.text("No recommendations.", 25, y);
      y += 7;
    }

    if (result.checks) {
      y += 8;

      doc.setFont("helvetica", "bold");
      doc.text("Security Checklist", 20, y);

      y += 8;

      doc.setFont("helvetica", "normal");

      const checklist = [
        ["Minimum 8 Characters", result.score >= 25],
        ["Contains Uppercase", result.checks?.uppercase],
        ["Contains Lowercase", result.checks?.lowercase],
        ["Contains Numbers", result.checks?.numbers],
        ["Contains Special Characters", result.checks?.special],
        ["Not Common Password", !result.is_common],
        ["No Known Data Breach", !result.breached],
        ["No Keyboard Pattern", !result.checks?.keyboard_pattern],
        ["No Sequential Pattern", !result.checks?.sequence],
        ["No Dictionary Word", !result.checks?.dictionary_word],
        ["No Repeated Characters", !result.checks?.repeated]
        ];

        checklist.forEach(([label, passed]) => {
        doc.text(
            `${passed ? "✔ PASS" : "✘ FAIL"}   ${label}`,
            25,
            y
        );
        y += 8;
        });
    }

    doc.save(`Password_Report_${timestamp}.pdf`);
  };

  return (
    <div className="mt-8 flex justify-center gap-4 flex-wrap">
      <button
        onClick={exportJSON}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
      >
        📄 Export JSON
      </button>

      <button
        onClick={exportCSV}
        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition"
      >
        📊 Export CSV
      </button>

      <button
        onClick={exportPDF}
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold transition"
      >
        📕 Export PDF
      </button>
    </div>
  );
}

export default ExportButtons;