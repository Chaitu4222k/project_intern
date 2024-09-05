import React, { useState, useEffect } from 'react';
import { fetchTasks } from '../../api'; // Import API function

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

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

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {task.description} - {new Date(task.dueDate).toLocaleDateString()} - {task.priority}
                        {/* Add a link to task details if needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
