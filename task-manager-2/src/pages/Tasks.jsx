import { useSearchParams } from 'react-router';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
export default function Tasks({
tasks,
loading,
onAddTask,
onRemoveTask
}) {
const [searchParams, setSearchParams] =
useSearchParams();
const view = searchParams.get('view') ?? 'all';
const visibleTasks = tasks.filter(task => {
if (view === 'completed') {
return task.completed;
}
if (view === 'active') {
return !task.completed;
}
return true;
});
return (
<div>
<h2>My Tasks</h2>
<TaskForm onAddTask={onAddTask} />
<label htmlFor="task-view">Show: </label>
<select
id="task-view"
value={view}
onChange={e =>
setSearchParams({ view: e.target.value })
}
>
<option value="all">All Tasks</option>
<option value="active">Active Tasks</option>
<option value="completed">Completed Tasks</option>
</select>
{loading ? (
<p>Loading tasks...</p>
) : (
<TaskList
tasks={visibleTasks}
onRemoveTask={onRemoveTask}
/>
)}
</div>
);
}