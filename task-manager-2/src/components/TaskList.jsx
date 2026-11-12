import { Link } from 'react-router';
export default function TaskList({
    tasks,
    onRemoveTask
  }) {
  return (
    <ul>
      {tasks.map(task => (
      <li key={task.id}>
        <Link to={`/tasks/${task.id}`}>
          {task.text}
        </Link>
        {' '}
        <button
          onClick={() => onRemoveTask(task.id)}
          >
          Remove
        </button>
      </li>
      ))}
    </ul>
  );
}