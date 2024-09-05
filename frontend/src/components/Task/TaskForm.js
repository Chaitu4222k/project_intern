import React, { useState } from 'react';
import { createTask } from '../../api'; // Import API function

const TaskForm = ({ refreshTasks }) => {
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            description,
            dueDate,
            priority
        };
        try {
            await createTask(newTask);
            refreshTasks(); // Refresh the list after adding
            setDescription('');
            setDueDate('');
            setPriority('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Task</h2>
            <label>Description:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <label>Due Date:
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            </label>
            <label>Priority:
                <input type="text" value={priority} onChange={(e) => setPriority(e.target.value)} required />
            </label>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
