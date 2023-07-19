const taskService = require("./task.service");

// Retrieve a list of tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    return res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    return res.status(500).json({ err: "Something happened" });
  }
};

exports.getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const singleTask = await taskService.getSingleTask(id);
    if (!singleTask) {
      return res.status(404).json({
        success: false,
        message: `Task with id ${id} does not exist`,
      });
    }
    return res.status(200).json({ success: true, data: singleTask });
  } catch (error) {
    return res.status(500).json({ err: "Something happened" });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and Description are required",
      });
    }
    const newTask = await taskService.createTask(req.body);
    return res.status(201).json({ data: newTask });
  } catch (error) {
    return res.status(500).json({ err: "Something happened" });
  }
};

// Update the status of a task
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["Pending", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid Status" });
    }

    const updatedTask = await taskService.updateStatus(id, status);

    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    return res.status(500).json({ err: "Something happened" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await taskService.deleteTask(id);
    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    const response = { id: id, message: "Task deleted successfully" };
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    return res.status(500).json({ err: "Something happened" });
  }
};
