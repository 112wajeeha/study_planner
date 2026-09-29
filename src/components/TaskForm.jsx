import { useState, useEffect } from 'react';

function TaskForm({ onAddTask, onUpdateTask, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setSubject(editingTask.subject);
      setDueDate(editingTask.dueDate);
      setPriority(editingTask.priority);
    } else {
      setTitle('');
      setSubject('');
      setDueDate('');
      setPriority('Medium');
    }
  }, [editingTask]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !subject.trim() || !dueDate) {
      alert('Please fill in title, subject, and due date.');
      return;
    }

    if (editingTask) {
      onUpdateTask({ ...editingTask, title, subject, dueDate, priority });
    } else {
      onAddTask({
        id: Date.now(),
        title,
        subject,
        dueDate,
        priority,
        completed: false,
      });
    }

    setTitle('');
    setSubject('');
    setDueDate('');
    setPriority('Medium');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
      {editingTask && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;