function DashboardCard({ children }) {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg p-6">
      {children}
    </div>
  );
}

export default DashboardCard;