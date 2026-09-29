function TaskCard({ task, onDeleteTask, onToggleComplete, onEditTask }) {
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      <h3>{task.title}</h3>
      <p>Subject: {task.subject}</p>
      <p>Due: {task.dueDate}</p>
      <p>Priority: {task.priority}</p>
      <button onClick={() => onEditTask(task)}>Edit</button>
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </div>
  );
}

export default TaskCard;