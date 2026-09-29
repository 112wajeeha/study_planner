import { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import FilterButtons from './components/FilterButtons';
import TaskList from './components/TaskList';
import { loadTasks, saveTasks } from './utils/localStorage';

const initialTasks = [
  { id: 1, title: 'Practice Chapter 4', subject: 'Computer Architecture', dueDate: '2026-10-02', priority: 'High', completed: false },
  { id: 2, title: 'Finish Calculus Worksheet', subject: 'Multi-Variable Calculus', dueDate: '2026-10-05', priority: 'Medium', completed: false },
  { id: 3, title: 'Essay Draft', subject: 'Technical and Business Writing', dueDate: '2026-09-30', priority: 'Low', completed: true },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = loadTasks();
    return stored ? stored : initialTasks;
  });
  const [editingTask, setEditingTask] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function handleAddTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function handleToggleComplete(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleUpdateTask(updatedTask) {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  }

  const filteredTasks = tasks.filter((task) => {
    const text = searchText.toLowerCase();
    const matchesSearch =
      task.title.toLowerCase().includes(text) ||
      task.subject.toLowerCase().includes(text);

    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'pending' && !task.completed) ||
      (activeFilter === 'completed' && task.completed) ||
      (activeFilter === 'high' && task.priority === 'High');

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app">
      <Header />
      <Dashboard tasks={tasks} />
      <TaskForm
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        editingTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
      />
      <SearchBar searchText={searchText} onSearchChange={setSearchText} />
      <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <TaskList
        tasks={filteredTasks}
        onDeleteTask={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
        onEditTask={setEditingTask}
      />
    </div>
  );
}

export default App;