const Task = require("./task.model");

exports.getAllTasks = async () => {
  const task = await Task.find();
  return task;
};

exports.getSingleTask = async (id) => {
  return await Task.findOne({ _id: id });
};

exports.createTask = async (taskData) => {
  const task = new Task({ ...taskData });
  await task.save();
  return task;
};

exports.updateStatus = async (_id, status) => {
  return await Task.findOneAndUpdate(_id, { status }, { new: true });
};

exports.deleteTask = async (taskId) => {
  return await Task.findOneAndDelete({ taskId });
};
