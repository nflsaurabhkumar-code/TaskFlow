// One row of the task list.
export default function TaskItem({ task, onChangeStatus, onDelete }) {
  return (
    <article className="task-item">
      <div className={`task-check ${task.status === "done" ? "checked" : ""}`} />
      <div className="task-info">
        <b>{task.title}</b>
        <small>{task.project?.name || "Project"} · {task.priority}</small>
      </div>
      <select
        aria-label="Task status"
        value={task.status}
        onChange={(e) => onChangeStatus(task, e.target.value)}
      >
        <option value="todo">To do</option>
        <option value="in_progress">In progress</option>
        <option value="done">Done</option>
      </select>
      <button className="icon-button" title="Delete task" onClick={() => onDelete(task._id)}>×</button>
    </article>
  );
}
