import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskStatus } from '../redux/taskSlice';
import toast from 'react-hot-toast';

const TaskItem = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
      toast.success('Task deleted successfully!');
    }
  };

  const handleToggleStatus = () => {
    dispatch(toggleTaskStatus(task.id));
    toast.success(`Task marked as ${task.status === 'Completed' ? 'Pending' : 'Completed'}!`);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Completed' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-blue-100 text-blue-800';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-lg font-semibold ${task.status === 'Completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {task.title}
        </h3>
        <div className="flex space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
      </div>
      
      {task.description && (
        <p className={`text-sm mb-3 ${task.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-600'}`}>
          {task.description}
        </p>
      )}
      
      <div className="text-xs text-gray-500 mb-4">
        <p>Due: {formatDate(task.dueDate)}</p>
        <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleToggleStatus}
          className={`px-3 py-1 rounded text-xs font-medium ${
            task.status === 'Completed'
              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          }`}
        >
          {task.status === 'Completed' ? 'Mark Pending' : 'Mark Complete'}
        </button>
        
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium hover:bg-blue-200"
        >
          Edit
        </button>
        
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-100 text-red-800 rounded text-xs font-medium hover:bg-red-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
