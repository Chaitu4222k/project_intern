const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { name, dueDate, status } = req.body;
        if (!name || !dueDate || !status) {
            return res.status(400).json({ status: false, msg: 'All fields are required' });
        }

        const task = await Task.create({ user: req.user.id, name, dueDate, status });
        res.status(201).json({ task, status: true, msg: 'Task created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};

// Get all tasks for the authenticated user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json({ tasks, status: true, msg: 'Tasks retrieved successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};

// Get a single task by ID
exports.getTask = async (req, res) => {
    try {
        const task = await Task.findOne({ user: req.user.id, _id: req.params.taskId });
        if (!task) {
            return res.status(404).json({ status: false, msg: 'Task not found' });
        }
        res.status(200).json({ task, status: true, msg: 'Task retrieved successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
    try {
        const { name, dueDate, status } = req.body;
        if (!name || !dueDate || !status) {
            return res.status(400).json({ status: false, msg: 'All fields are required' });
        }

        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ status: false, msg: 'Task not found' });
        }

        if (task.user != req.user.id) {
            return res.status(403).json({ status: false, msg: 'You cannot update another user\'s task' });
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, { name, dueDate, status }, { new: true });
        res.status(200).json({ task: updatedTask, status: true, msg: 'Task updated successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};

// Delete a task by ID
/* exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ status: false, msg: 'Task not found' });
        }

        if (task.user != req.user.id) {
            return res.status(403).json({ status: false, msg: 'You cannot delete another user\'s task' });
        }

        await Task.findByIdAndDelete(req.params.taskId);
        res.status(200).json({ status: true, msg: 'Task deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
}; */
