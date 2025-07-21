import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

const TaskList = ({ onEditTask }) => {
  const { tasks } = useSelector((state) => state.tasks);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'priority': {
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const getTaskCounts = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'Completed').length;
    const pending = tasks.filter(task => task.status === 'Pending').length;
    return { total, completed, pending };
  };

  const { total, completed, pending } = getTaskCounts();

  return (
    <div className="space-y-6">
      {/* Task Statistics */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Overview</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-navy-500">{total}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="filter" className="block text-sm font-medium text-gray-700">
                Filter:
              </label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="All">All Tasks</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="createdAt">Date Created</option>
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {sortedTasks.length} of {total} tasks
          </div>
        </div>
      </div>

      {/* Task Grid */}
      {sortedTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEditTask}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filter === 'All' ? 'No tasks yet' : `No ${filter.toLowerCase()} tasks`}
          </h3>
          <p className="text-gray-500">
            {filter === 'All' 
              ? 'Create your first task to get started!' 
              : `No tasks with ${filter.toLowerCase()} status found.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
