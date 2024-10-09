// src/components/Layout/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/'); // Use navigate instead of history.push
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Peer Review Platform
        </Typography>
        {token ? (
          <>
            {role === 'ADMIN' && (
              <Button color="inherit" component={Link} to="/admin-dashboard">
                Dashboard
              </Button>
            )}
            {role === 'STUDENT' && (
              <>
                <Button color="inherit" component={Link} to="/student-dashboard">
                  Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/collaboration">
                  Collaboration
                </Button>
                <Button color="inherit" component={Link} to="/review-feedback">
                  Review
                </Button>
              </>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
