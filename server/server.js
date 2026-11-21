import express from 'express'; 
import { pool } from './db.js'; 
 
const app = express(); 
const PORT = 3001; 
 
app.use(express.json()); 
 
// READ: all tasks 
app.get('/api/tasks', async (req, res) => { 
  try { 
    const result = await pool.query( 
      'SELECT id, text, completed FROM tasks ORDER BY text' 
    ); 
    res.json(result.rows); 
  } catch (error) { 
    console.error(error); 
    res.status(500).json({ error: 'Could not read tasks' }); 
  } 
}); 
 
// CREATE: one task 
app.post('/api/tasks', async (req, res) => { 
  const text = req.body?.text; 
  if (typeof text !== 'string' || !text.trim()) { 
    return res.status(400).json({ error: 'Task text is required' }); 
  } 
  try { 
    const result = await pool.query( 
      'INSERT INTO tasks (text) VALUES ($1) RETURNING id, text, completed', 
      [text.trim()] 
    ); 
    res.status(201).json(result.rows[0]); 
  } catch (error) { 
    console.error(error); 
    res.status(500).json({ error: 'Could not create task' }); 
  } 
}); 
 
// UPDATE: completion status 
app.patch('/api/tasks/:id', async (req, res) => { 
  if (typeof req.body?.completed !== 'boolean') { 
    return res.status(400).json({ error: 'completed must be true or false' }); 
  } 
  try { 
    const result = await pool.query( 
      'UPDATE tasks SET completed = $1 WHERE id::text = $2 ' + 
      'RETURNING id, text, completed', 
      [req.body.completed, req.params.id] 
    ); 
    if (result.rowCount === 0) { 
 
      return res.status(404).json({ error: 'Task not found' }); 
    } 
    res.json(result.rows[0]); 
  } catch (error) { 
    console.error(error); 
    res.status(500).json({ error: 'Could not update task' }); 
  } 
}); 
 
// DELETE: one task 
app.delete('/api/tasks/:id', async (req, res) => { 
  try { 
    const result = await pool.query( 
      'DELETE FROM tasks WHERE id::text = $1', 
      [req.params.id] 
    ); 
    if (result.rowCount === 0) { 
      return res.status(404).json({ error: 'Task not found' }); 
    } 
    res.status(204).send(); 
  } catch (error) { 
    console.error(error); 
    res.status(500).json({ error: 'Could not delete task' }); 
  } 
}); 
 
// Check the connection before accepting requests. 
try { 
  await pool.query('SELECT 1'); 
  app.listen(PORT, () => { 
    console.log(`API running at http://localhost:${PORT}`); 
  }); 
} catch (error) { 
  console.error('Database connection failed:', error.message); 
  process.exitCode = 1; 
  await pool.end(); 
}