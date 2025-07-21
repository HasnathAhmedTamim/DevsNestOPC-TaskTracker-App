const express = require('express');
const { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  toggleTaskStatus 
} = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/tasks
// @desc    Get all tasks for authenticated user
// @access  Private
router.get('/', auth, getTasks);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', auth, createTask);

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', auth, updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, deleteTask);

// @route   PATCH /api/tasks/:id/toggle
// @desc    Toggle task status
// @access  Private
router.patch('/:id/toggle', auth, toggleTaskStatus);

module.exports = router;
