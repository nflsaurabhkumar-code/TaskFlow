export default function Topbar({ user }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">MONDAY, YOUR WAY</p>
        <h1>Good work starts here.</h1>
      </div>
      <div className="topbar-right">
        <span className="status-pill"><i /> All systems operational</span>
        <div className="avatar">{user?.name?.[0]?.toUpperCase() || "U"}</div>
      </div>
    </header>
  );
}
