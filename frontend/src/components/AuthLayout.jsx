// Common design used by both the Login and Register pages.
export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <main className="auth-layout">
      <section className="auth-panel">
        <div className="brand-mark">TF</div>
        <p className="eyebrow">YOUR WORKSPACE, IN FLOW</p>

        <h1>{title}</h1>
        <p className="muted">{subtitle}</p>

        {children}

        <p className="switch-auth">{footer}</p>
      </section>

      <aside className="auth-aside">
        <div className="aside-orb" />
        <p className="eyebrow">LESS CHAOS. MORE MOMENTUM.</p>
        <h2>
          Bring every project
          <br />
          into focus.
        </h2>
        <p>
          Plan work, align your team, and move important things forward —
          together.
        </p>

        <div className="mini-board">
          <div>
            <span className="dot purple" /> Product launch <b>82%</b>
          </div>
          <div className="progress">
            <i />
          </div>
          <div>
            <span className="dot green" /> Website refresh <b>64%</b>
          </div>
          <div className="progress">
            <i className="progress-two" />
          </div>
        </div>
      </aside>
    </main>
  );
}
