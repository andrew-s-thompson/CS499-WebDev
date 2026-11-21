import express from 'express'; 
import { readFile, writeFile } from 'node:fs/promises'; 
import { randomUUID } from 'node:crypto'; 
 
const app = express(); 
const PORT = 3001; 
const dataFile = new URL('./tasks.json', import.meta.url); 
 
app.use(express.json()); 
 
async function readTasks() { 
  const text = await readFile(dataFile, 'utf8'); 
  return JSON.parse(text); 
} 
 
async function saveTasks(tasks) { 
  await writeFile(dataFile, JSON.stringify(tasks, null, 2)); 
} 
 
// READ: return all tasks 
app.get('/api/tasks', async (req, res) => { 
  try { 
    res.json(await readTasks()); 
  } catch (error) { 
    res.status(500).json({ error: 'Could not read tasks' }); 
  } 
}); 
 
// CREATE: add one task 
app.post('/api/tasks', async (req, res) => { 
  const text = req.body?.text; 
  if (typeof text !== 'string' || !text.trim()) { 
    return res.status(400).json({ error: 'Task text is required' }); 
  } 
  try { 
    const tasks = await readTasks(); 
    const task = { 
      id: randomUUID(), 
      text: text.trim(), 
      completed: false 
    }; 
    tasks.push(task); 
    await saveTasks(tasks); 
    res.status(201).json(task); 
  } catch (error) { 
    res.status(500).json({ error: 'Could not create task' }); 
  } 
}); 
 
// UPDATE: change the completed field 
app.patch('/api/tasks/:id', async (req, res) => { 
 
  if (typeof req.body?.completed !== 'boolean') { 
    return res.status(400).json({ error: 'completed must be true or false' }); 
  } 
  try { 
    const tasks = await readTasks(); 
    const task = tasks.find(item => item.id === req.params.id); 
    if (!task) { 
      return res.status(404).json({ error: 'Task not found' }); 
    } 
    task.completed = req.body.completed; 
    await saveTasks(tasks); 
    res.json(task); 
  } catch (error) { 
    res.status(500).json({ error: 'Could not update task' }); 
  } 
}); 
 
// DELETE: remove one task 
app.delete('/api/tasks/:id', async (req, res) => { 
  try { 
    const tasks = await readTasks(); 
    const remaining = tasks.filter(item => item.id !== req.params.id); 
    if (remaining.length === tasks.length) { 
      return res.status(404).json({ error: 'Task not found' }); 
    } 
    await saveTasks(remaining); 
    res.status(204).send(); 
  } catch (error) { 
    res.status(500).json({ error: 'Could not delete task' }); 
  } 
}); 
 
app.listen(PORT, () => { 
  console.log(`API running at http://localhost:${PORT}`); 
});