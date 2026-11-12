import { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import About from './pages/About';
import TaskDetails from './pages/TaskDetails';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadTasks() {
      const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=5'
      );
      const data = await response.json();
      const formattedTasks = data.map(todo => ({
        id: todo.id,
        text: todo.title,
        completed: todo.completed
      }));
      setTasks(formattedTasks);
      setLoading(false);
    }
    loadTasks();
  }, []);

  function handleAddTask(taskText) {
    const newTask = {
      id: crypto.randomUUID(),
      text: taskText,
      completed: false
    };
    setTasks(prevTasks => [
      ...prevTasks,
      newTask
    ]);
  }
  function handleRemoveTask(taskId) {
    setTasks(prevTasks =>
    prevTasks.filter(task => task.id !== taskId)
    );
  }
  return (
  <div className="app">
    <h1>Task Manager</h1>
    <nav>
      <NavLink to="/" end>Home</NavLink>
      {' | '}
      <NavLink to="/tasks">Tasks</NavLink>
      {' | '}
      <NavLink to="/about">About</NavLink>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
      path="/tasks"
      element={
      <Tasks
      tasks={tasks}
      loading={loading}
      onAddTask={handleAddTask}
      onRemoveTask={handleRemoveTask}
      />
      }
      />
      <Route
        path="/tasks/:taskId"
        element={
        <TaskDetails
          tasks={tasks}
          loading={loading}
        />
        }
      />
      <Route path="/about" element={<About />} />
      <Route
      path="*"
      element={<h2>404 - Page Not Found</h2>}
      />
    </Routes>
  </div>
  );
}