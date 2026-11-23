import { Link } from 'react-router'; 
 
export default function TaskList({ 
  tasks, onRemoveTask, onToggleTask 
}) { 
  return ( 
    <ul> 
      {tasks.map(task => ( 
        <li key={task.id}> 
          <Link to={`/tasks/${task.id}`}>{task.text}</Link>{' '} 
          <span>({task.completed ? 'Completed' : 'Active'})</span>{' '} 
          <button onClick={() => onToggleTask(task)}> 
            {task.completed ? 'Mark Active' : 'Complete'} 
          </button>{' '} 
          <button onClick={() => onRemoveTask(task.id)}> 
            Remove 
          </button> 
        </li> 
      ))} 
    </ul> 
  ); 
} 