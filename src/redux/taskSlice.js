import { createSlice } from '@reduxjs/toolkit';
import { getTasks, saveTasks } from '../utils/localStorage';

const initialState = {
  tasks: [],
  currentUserEmail: null,
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadTasksForUser: (state, action) => {
      const userEmail = action.payload;
      state.currentUserEmail = userEmail;
      state.tasks = getTasks(userEmail);
    },
    
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        dueDate: action.payload.dueDate,
        status: action.payload.status || 'Pending',
        priority: action.payload.priority || 'Medium',
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
      saveTasks(state.tasks, state.currentUserEmail);
    },
    
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
        saveTasks(state.tasks, state.currentUserEmail);
      }
    },
    
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasks(state.tasks, state.currentUserEmail);
    },
    
    toggleTaskStatus: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.status = task.status === 'Completed' ? 'Pending' : 'Completed';
        saveTasks(state.tasks, state.currentUserEmail);
      }
    },
    
    clearTasks: (state) => {
      state.tasks = [];
      state.currentUserEmail = null;
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  loadTasksForUser,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  clearTasks,
  setLoading,
  setError,
} = taskSlice.actions;

export default taskSlice.reducer;
