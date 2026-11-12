import { Link } from 'react-router';
export default function Home() {
    return (
        <div>
        <h2>Welcome to Task Manager</h2>
        <p>Organize and track your tasks.</p>
        <Link to="/tasks">View My Tasks</Link>
        </div>
    );
    }