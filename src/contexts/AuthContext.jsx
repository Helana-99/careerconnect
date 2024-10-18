import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null); 
  const [userId, setUserId] = useState(null); // Storing userId

  const login = (type, id) => {
    setIsAuthenticated(true);
    setUserType(type); 
    setUserId(id); // Set userId when logging in
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null); 
    setUserId(null); // Clear userId on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, setIsAuthenticated, userType, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};