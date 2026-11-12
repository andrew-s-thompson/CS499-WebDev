import { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  // Controlled input: React state is the source of truth.
  const [taskText, setTaskText] = useState('');

  function handleSubmit(event) {
    event.preventDefault(); // Avoid a page reload.
    const trimmedText = taskText.trim();
    if (!trimmedText) return;
    onAddTask(trimmedText); // Send data up to App.
    setTaskText(''); // Clear the input after adding.
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        aria-label="New task"
        placeholder="Enter a new task"
        value={taskText}
        onChange={event => setTaskText(event.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
