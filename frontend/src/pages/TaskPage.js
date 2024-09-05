import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api'; // Ensure API functions are defined
import './TaskPage.css'; // Import the CSS file

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Pending');
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [filterName, setFilterName] = useState('');
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const data = await fetchTasks();
                setTasks(data);
            } catch (error) {
                console.error('Error loading tasks:', error);
            }
        };
        loadTasks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { taskName, dueDate, status };
        try {
            if (editing) {
                await updateTask(currentId, newTask);
            } else {
                await createTask(newTask);
            }
            const updatedTasks = await fetchTasks();
            setTasks(updatedTasks);
            resetForm();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const handleEdit = (task) => {
        setTaskName(task.taskName);
        setDueDate(task.dueDate);
        setStatus(task.status);
        setEditing(true);
        setCurrentId(task._id);
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            const updatedTasks = await fetchTasks();
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const resetForm = () => {
        setTaskName('');
        setDueDate('');
        setStatus('Pending');
        setEditing(false);
        setCurrentId(null);
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const filteredTasks = tasks.filter(task => 
        (!filterName || task.taskName.toLowerCase().includes(filterName.toLowerCase())) &&
        (!filterDate || new Date(task.dueDate).toLocaleDateString().includes(new Date(filterDate).toLocaleDateString()))
    );

    return (
        <div className="task-page">
            <h1>Task Management</h1>

            <form onSubmit={handleSubmit} className="task-form">
                <input
                    type="text"
                    placeholder="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                />
                <div className="date-inputs">
                    <label htmlFor="dueDate">Due Date:</label>
                    <input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <button type="submit">{editing ? 'Update Task' : 'Add Task'}</button>
                <button type="button" onClick={resetForm}>Cancel</button>
            </form>

            <div className="task-filter">
                <h2>Search or Filter Here</h2>
                <input
                    type="text"
                    placeholder="Search by Task Name"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Filter by Due Date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
            </div>

            <table className="task-table">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.taskName}</td>
                            <td>{task.status}</td>
                            <td>{formatDate(task.dueDate)}</td>
                            <td>
                                <button onClick={() => handleEdit(task)}>Edit</button>
                                <button onClick={() => handleDelete(task._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskPage;
