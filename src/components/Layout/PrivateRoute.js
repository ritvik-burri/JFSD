import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ element, role }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  // Check for authentication and role
  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect to the login page if not authenticated
  }

  if (user.role !== role) {
    return <Navigate to="/" />; // Redirect to the login page if the role does not match
  }

  // If authenticated and role matches, render the element (dashboard)
  return element;
};

export default PrivateRoute;
