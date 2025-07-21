import axios from 'axios';

// API base configuration - automatically detects environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const apiService = {
  // Health check
  health: () => api.get('/health'),

  // Authentication endpoints
  auth: {
    register: async (userData) => {
      const response = await api.post('/register', userData);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    },
    login: async (credentials) => {
      const response = await api.post('/login', credentials);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    },
    logout: () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },
    getCurrentUser: () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },
    isAuthenticated: () => {
      return !!localStorage.getItem('authToken');
    }
  },

  // Task endpoints
  tasks: {
    getAll: async () => {
      const response = await api.get('/tasks');
      return response.data;
    },
    create: async (taskData) => {
      const response = await api.post('/tasks', taskData);
      return response.data;
    },
    update: async (id, taskData) => {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data;
    },
    delete: async (id) => {
      const response = await api.delete(`/tasks/${id}`);
      return response.data;
    },
    toggleStatus: async (id, currentTask) => {
      const newStatus = currentTask.status === 'Completed' ? 'Pending' : 'Completed';
      const response = await api.put(`/tasks/${id}`, {
        ...currentTask,
        status: newStatus
      });
      return response.data;
    }
  },
};

export default api;
