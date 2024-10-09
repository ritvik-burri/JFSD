// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import Collaboration from './components/Collaboration/Collaboration';
import ReviewFeedback from './components/Review/ReviewFeedback';
import PrivateRoute from './components/Layout/PrivateRoute';
import Assignments from './components/Assignments';
import Profile from './components/Profile';
import { AuthContext } from './context/AuthContext';
import MockLogin from './components/Auth/MockLogin';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MockLogin />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/review-feedback" element={<ReviewFeedback />} /> */}
          <Route 
            path="/admin-dashboard" 
            element={<PrivateRoute element={<AdminDashboard />} role="ADMIN" />} 
          />
          <Route 
            path="/student-dashboard" 
            element={<PrivateRoute element={<StudentDashboard />} role="STUDENT" />} 
          />
           <Route
            path="/assignments"
            element={<PrivateRoute element={<Assignments />} role="STUDENT" />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} role="STUDENT" />}
          />
          <Route 
            path="/collaboration" 
            element={<PrivateRoute element={<Collaboration />} role="STUDENT" />} 
          />
          <Route 
            path="/review-feedback" 
            element={<PrivateRoute element={<ReviewFeedback />} role="STUDENT" />} 
          />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
