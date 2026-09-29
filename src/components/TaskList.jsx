import TaskCard from './TaskCard';

function TaskList({ tasks, onDeleteTask, onToggleComplete, onEditTask }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks found. Try adding one or adjusting your search/filter.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onToggleComplete={onToggleComplete}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
}

export default TaskList;