// localStorage utility functions for task management

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const getTasks = () => {
  try {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error getting tasks from localStorage:', error);
    return [];
  }
};

export const saveAuthToken = (token) => {
  try {
    localStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

export const getAuthToken = () => {
  try {
    return localStorage.getItem('authToken');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const removeAuthToken = () => {
  try {
    localStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

export const saveUserEmail = (email) => {
  try {
    localStorage.setItem('userEmail', email);
  } catch (error) {
    console.error('Error saving user email:', error);
  }
};

export const getUserEmail = () => {
  try {
    return localStorage.getItem('userEmail');
  } catch (error) {
    console.error('Error getting user email:', error);
    return null;
  }
};

export const removeUserEmail = () => {
  try {
    localStorage.removeItem('userEmail');
  } catch (error) {
    console.error('Error removing user email:', error);
  }
};
