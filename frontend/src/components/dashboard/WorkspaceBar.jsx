export default function WorkspaceBar({
  organizations, activeOrgId, onSelectOrg, orgName, onOrgNameChange, onCreateOrg,
}) {
  return (
    <section className="workspace-row">
      <div>
        <p className="eyebrow">ACTIVE WORKSPACE</p>
        <select value={activeOrgId || ""} onChange={(e) => onSelectOrg(e.target.value)}>
          {organizations.map((org) => (
            <option key={org._id} value={org._id}>{org.name} · {org.myRole}</option>
          ))}
        </select>
      </div>

      <form className="inline-form compact" onSubmit={onCreateOrg}>
        <input
          placeholder="New workspace name"
          value={orgName}
          onChange={(e) => onOrgNameChange(e.target.value)}
          required
        />
        <button className="secondary-button">+ Workspace</button>
      </form>
    </section>
  );
}
