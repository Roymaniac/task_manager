const Task = require("./task.model");

exports.getAllTasks = async () => {
  const task = await Task.find();
  return task;
};

exports.getSingleTask = async (id) => {
  return await Task.findOne({ id: id });
};

exports.createTask = async (taskData) => {
  const task = new Task({ ...taskData });
  await task.save();
  return task;
};

exports.updateStatus = async (id, status) => {
  return await Task.findOneAndUpdate({ id: id }, { status }, { new: true });
};

exports.deleteTask = async (taskId) => {
  return await Task.findOneAndDelete({ id: taskId });
};
