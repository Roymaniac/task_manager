const express = require("express");
const {
  getAllTasks,
  getSingleTask,
  createTask,
  updateStatus,
  deleteTask,
} = require("./task.controller");
const router = express.Router();

// Retrieve a list of tasks
router.get("/", getAllTasks);
router.get("/:id", getSingleTask);
router.post("/", createTask);
router.put("/:id", updateStatus);
router.delete("/:id", deleteTask);

module.exports = router;
