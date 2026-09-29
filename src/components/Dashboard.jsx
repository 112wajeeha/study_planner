import StatCard from './StatCard';

function Dashboard({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const highPriority = tasks.filter((task) => task.priority === 'High').length;

  return (
    <div className="dashboard">
      <StatCard label="Total Tasks" value={total} />
      <StatCard label="Completed" value={completed} />
      <StatCard label="Pending" value={pending} />
      <StatCard label="High Priority" value={highPriority} />
    </div>
  );
}

export default Dashboard;