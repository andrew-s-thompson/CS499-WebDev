import { useParams, Link } from 'react-router';

export default function TaskDetails({ tasks, loading }) {
    const { taskId } = useParams();
    const task = tasks.find(
    task => String(task.id) === taskId
    );
    if (loading) {
        return <p>Loading task...</p>;
    }
    if (!task) {
        return (
            <div>
            <h2>Task Not Found</h2>
            <Link to="/tasks">Back to Tasks</Link>
            </div>
        );
    }
    return (
        <div>
            <h2>Task Details</h2>
            <p><strong>ID:</strong> {task.id}</p>
            <p><strong>Task:</strong> {task.text}</p>
            <p>
            <strong>Status:</strong>{' '}
            {task.completed ? 'Completed' : 'Active'}
            </p>
            <Link to="/tasks">Back to Tasks</Link>
        </div>
    );
}