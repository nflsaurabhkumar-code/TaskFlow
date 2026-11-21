// Shown when the user does not have any organization yet.
export default function EmptyWorkspace({ orgName, onOrgNameChange, onSubmit }) {
  return (
    <section className="empty-workspace">
      <div className="empty-icon">✳</div>
      <h2>Create your first workspace</h2>
      <p className="muted">
        An organization keeps your projects and team work together.
      </p>
      <form className="inline-form" onSubmit={onSubmit}>
        <input
          placeholder="Organization name"
          value={orgName}
          onChange={(e) => onOrgNameChange(e.target.value)}
          required
        />
        <button className="primary-button">Create workspace</button>
      </form>
    </section>
  );
}
