import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import { apiService } from './services/api';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    const savedUser = apiService.auth.getCurrentUser();
    
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    apiService.auth.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/" 
              element={<Home isAuthenticated={isAuthenticated} />} 
            />
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/tasks" replace /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/tasks" 
              element={isAuthenticated ? <Tasks user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} 
            />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/tasks" : "/"} replace />} />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
