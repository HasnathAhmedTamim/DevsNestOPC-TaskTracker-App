import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContextProvider';
import { getAuthToken, saveAuthToken, removeAuthToken, getUserEmail, saveUserEmail, removeUserEmail } from '../utils/localStorage';

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    const email = getUserEmail();
    if (token && email) {
      setIsLoggedIn(true);
      setUser({ email });
    }
    setLoading(false);
  }, []);

  const login = (email) => {
    const mockToken = `token_${Date.now()}`;
    saveAuthToken(mockToken);
    saveUserEmail(email);
    setIsLoggedIn(true);
    setUser({ email });
  };

  const logout = () => {
    removeAuthToken();
    removeUserEmail();
    setIsLoggedIn(false);
    setUser(null);
  };

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
