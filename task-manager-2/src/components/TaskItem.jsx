export default function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleTask(task.id)}
        aria-label={`Mark ${task.text} complete`}
      />
      <span className={task.completed ? 'done' : ''}>{task.text}</span>
      <button type="button" onClick={() => onDeleteTask(task.id)}>Delete</button>
    </li>
  );
}
