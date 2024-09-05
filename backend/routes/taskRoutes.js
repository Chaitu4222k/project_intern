const express = require("express");
const router = express.Router();
const { getTasks, getTask, createTask, updateTask, deleteTask } = require("../controllers/taskController");

// Routes beginning with /api/tasks
router.get("/", getTasks);
router.get("/:taskId", getTask);
router.post("/", createTask);
router.put("/:taskId", updateTask);
//router.delete("/:taskId", deleteTask);

module.exports = router;
