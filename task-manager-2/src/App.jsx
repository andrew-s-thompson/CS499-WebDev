import { useEffect, useState } from 'react'; 
import { Routes, Route, NavLink } from 'react-router'; 
import Home from './pages/Home'; 
import Tasks from './pages/Tasks'; 
import TaskDetails from './pages/TaskDetails'; 
import About from './pages/About'; 
 
export default function App() { 
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
 
  useEffect(() => { 
    async function loadTasks() { 
      try { 
        const response = await fetch('/api/tasks'); 
        if (!response.ok) throw new Error('Unable to load tasks'); 
        setTasks(await response.json()); 
      } catch (err) { 
        setError(err.message); 
      } finally { 
        setLoading(false); 
      } 
    } 
    loadTasks(); 
  }, []); 
 
  async function handleAddTask(taskText) { 
    try { 
      const response = await fetch('/api/tasks', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ text: taskText }) 
      }); 
      if (!response.ok) throw new Error('Could not add task'); 
      const created = await response.json(); 
      setTasks(prev => [...prev, created]); 
      setError(''); 
    } catch (err) { 
      setError(err.message); 
    } 
  } 
 
  async function handleToggleTask(task) { 
    try { 
      const response = await fetch(`/api/tasks/${task.id}`, { 
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ completed: !task.completed }) 
      }); 
      if (!response.ok) throw new Error('Could not update task'); 
 
      const updated = await response.json(); 
      setTasks(prev => prev.map(item => 
        item.id === updated.id ? updated : item 
      )); 
      setError(''); 
    } catch (err) { 
      setError(err.message); 
    } 
  } 
 
  async function handleRemoveTask(taskId) { 
    try { 
      const response = await fetch(`/api/tasks/${taskId}`, { 
        method: 'DELETE' 
      }); 
      if (!response.ok) throw new Error('Could not delete task'); 
      setTasks(prev => prev.filter(item => item.id !== taskId)); 
      setError(''); 
    } catch (err) { 
      setError(err.message); 
    } 
  } 
 
  return ( 
    <div className="app"> 
      <h1>Task Manager</h1> 
      <nav> 
        <NavLink to="/" end>Home</NavLink>{' | '} 
        <NavLink to="/tasks">Tasks</NavLink>{' | '} 
        <NavLink to="/about">About</NavLink> 
      </nav> 
      {error && <p role="alert">{error}</p>} 
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/tasks" element={ 
          <Tasks tasks={tasks} loading={loading} 
            onAddTask={handleAddTask} 
            onRemoveTask={handleRemoveTask} 
            onToggleTask={handleToggleTask} /> 
        } /> 
        <Route path="/tasks/:taskId" element={ 
          <TaskDetails tasks={tasks} loading={loading} /> 
        } /> 
        <Route path="/about" element={<About />} /> 
        <Route path="*" element={<h2>404 - Page Not Found</h2>} /> 
      </Routes> 
    </div> 
  ); 
}