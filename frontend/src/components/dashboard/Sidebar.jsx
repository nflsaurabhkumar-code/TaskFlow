export default function Sidebar({ user, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand"><span className="brand-mark small">TF</span><b>taskflow</b></div>
      <p className="nav-caption">WORKSPACE</p>
      <a className="nav-item active" href="#overview">▦ <span>Overview</span></a>
      <a className="nav-item" href="#projects">◫ <span>Projects</span></a>
      <a className="nav-item" href="#tasks">☷ <span>My tasks</span></a>
      <div className="sidebar-bottom">
        <div className="user-mini">
          <div className="avatar">{user?.name?.[0]?.toUpperCase() || "U"}</div>
          <div><b>{user?.name}</b><small>{user?.email}</small></div>
        </div>
        <button className="text-button" onClick={onLogout}>Sign out</button>
      </div>
    </aside>
  );
}
