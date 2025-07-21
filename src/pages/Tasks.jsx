import React, { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useDispatch } from "react-redux";
import { loadTasksForUser, clearTasks } from "../redux/taskSlice";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Tasks = () => {
  const { user, logout } = useAuth();
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load tasks for the current user
  useEffect(() => {
    if (user?.email) {
      dispatch(loadTasksForUser(user.email));
    }
  }, [user?.email, dispatch]);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  const handleLogout = () => {
    dispatch(clearTasks());
    logout();
    toast.success("Logged out successfully!");
  };

  return (
    <div className="min-h-screen bg-[#000435]">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center py-6">
            <Link to="/">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Task<span className="text-navy-500">Tracker</span>
                </h1>
                <p className="text-sm text-gray-600">
                  Welcome back, {user?.email}
                </p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-navy-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-navy-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500"
              >
                {showForm ? "Hide Form" : "Add Task"}
              </button>

              <button
                onClick={handleLogout}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Task Form */}
        {showForm && (
          <TaskForm editingTask={editingTask} onCancel={handleCancelEdit} />
        )}

        {/* Task List */}
        <TaskList onEditTask={handleEditTask} />
      </main>
    </div>
  );
};

export default Tasks;
