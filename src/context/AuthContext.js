import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
  });

  // Check if the user is authenticated
  const isAuthenticated = !!auth.token;

  // Login function to set token and role in localStorage and state
  const login = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setAuth({ token, role });
  };

  // Logout function to clear token and role from localStorage and state
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuth({ token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role: auth.role, token: auth.token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
