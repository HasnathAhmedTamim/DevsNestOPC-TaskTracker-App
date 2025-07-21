const Task = require('../models/Task');

// Get all tasks for a user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;

    const task = new Task({
      title,
      description,
      dueDate,
      status,
      priority,
      userId: req.user._id
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, status, priority } = req.body;

    const task = await Task.findOne({ _id: id, userId: req.user._id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate, status, priority },
      { new: true, runValidators: true }
    );

    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, userId: req.user._id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Toggle task status
const toggleTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, userId: req.user._id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = task.status === 'Completed' ? 'Pending' : 'Completed';
    const updatedTask = await task.save();
    
    res.json(updatedTask);
  } catch (error) {
    console.error('Toggle task status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus
};
