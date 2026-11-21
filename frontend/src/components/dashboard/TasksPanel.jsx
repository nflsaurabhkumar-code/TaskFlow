import TaskItem from "./TaskItem";

export default function TasksPanel({
  tasks, projects, taskTitle, onTaskTitleChange,
  selectedProject, onSelectProject, onCreateTask, onChangeStatus, onDeleteTask,
}) {
  return (
    <div className="panel" id="tasks">
      <div className="panel-heading">
        <div><p className="eyebrow">STAY ON TRACK</p><h2>Tasks</h2></div>
        <span className="count-badge">{tasks.length}</span>
      </div>

      {projects.length > 0 && (
        <form className="task-create" onSubmit={onCreateTask}>
          <input
            placeholder="What needs to get done?"
            value={taskTitle}
            onChange={(e) => onTaskTitleChange(e.target.value)}
            required
          />
          <select
            value={selectedProject || projects[0]._id}
            onChange={(e) => onSelectProject(e.target.value)}
          >
            {projects.map((project) => (
              <option key={project._id} value={project._id}>{project.name}</option>
            ))}
          </select>
          <button className="primary-button">Add task</button>
        </form>
      )}

      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} onChangeStatus={onChangeStatus} onDelete={onDeleteTask} />
        ))}
        {tasks.length === 0 && (
          <p className="muted small-text">No tasks yet. Add a project, then create your first task.</p>
        )}
      </div>
    </div>
  );
}
