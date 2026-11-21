export default function ProjectsPanel({ projects, projectName, onProjectNameChange, onCreateProject }) {
  return (
    <div className="panel" id="projects">
      <div className="panel-heading">
        <div><p className="eyebrow">YOUR WORK</p><h2>Projects</h2></div>
        <span className="count-badge">{projects.length}</span>
      </div>

      <form className="inline-form" onSubmit={onCreateProject}>
        <input
          placeholder="New project name"
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          required
        />
        <button className="primary-button">Add project</button>
      </form>

      <div className="project-list">
        {projects.map((project) => (
          <div className="project-item" key={project._id}>
            <div className="project-symbol">◈</div>
            <div><b>{project.name}</b><small>{project.status}</small></div>
            <span className="project-arrow">↗</span>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="muted small-text">No projects yet. Create your first project above.</p>
        )}
      </div>
    </div>
  );
}
