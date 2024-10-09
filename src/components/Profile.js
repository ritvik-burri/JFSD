import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  course: 'Computer Science',
  year: 'Sophomore',
  bio: 'Passionate about technology and programming. Enjoys working on innovative projects.',
};

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: '#e3f2fd',
  borderRadius: '12px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  },
}));

const Profile = () => {
  const [user, setUser] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // Simulate fetching user data
    setUser(mockUser);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* AppBar for the Header */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2', mb: 4 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Menu for Navigation */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>
          Dashboard
        </MenuItem>
        <MenuItem component={Link} to="/assignments" onClick={handleMenuClose}>
          Assignments
        </MenuItem>
        <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
          Profile
        </MenuItem>
      </Menu>

      {/* Profile Card */}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                {user.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Email: {user.email}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Course: {user.course}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Year: {user.year}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                Bio: {user.bio}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
