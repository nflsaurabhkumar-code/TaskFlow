function StatCard({ icon, iconClass, label, value, hint }) {
  return (
    <article className="stat-card">
      <span className={`stat-icon ${iconClass}`}>{icon}</span>
      <p>{label}</p>
      <strong>{value}</strong>
      <small>{hint}</small>
    </article>
  );
}

export default function StatsGrid({ stats }) {
  return (
    <section className="stats-grid">
      <StatCard icon="▦" iconClass="violet" label="Total tasks" value={stats.total} hint="Across this workspace" />
      <StatCard icon="◷" iconClass="amber" label="In progress" value={stats.inProgress} hint="Currently being worked on" />
      <StatCard icon="✓" iconClass="green-bg" label="Completed" value={stats.done} hint="Tasks marked as done" />
    </section>
  );
}
