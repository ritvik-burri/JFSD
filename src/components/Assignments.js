import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

// Mock data for assignments
const mockAssignments = [
  { id: 1, title: 'Assignment 1', description: 'Description for Assignment 1', dueDate: '2024-10-05', status: 'Pending', progress: 70 },
  { id: 2, title: 'Assignment 2', description: 'Description for Assignment 2', dueDate: '2024-10-10', status: 'Completed', progress: 100 },
  { id: 3, title: 'Assignment 3', description: 'Description for Assignment 3', dueDate: '2024-10-20', status: 'Pending', progress: 30 },
];

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

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    setLoading(true);
    // Simulate fetching data
    setTimeout(() => {
      setAssignments(mockAssignments);
      setLoading(false);
    }, 1000);
  };

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
            Assignments
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

      {/* Loading State */}
      {loading && <LinearProgress sx={{ marginBottom: 2 }} />}

      {/* Assignment Cards */}
      <Grid container spacing={4}>
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <Grid item xs={12} sm={6} md={4} key={assignment.id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    {assignment.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {assignment.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
                  </Typography>

                  {/* Progress Bar */}
                  <Box mt={2} display="flex" alignItems="center">
                    <Typography variant="body2" color="textSecondary">
                      Progress:
                    </Typography>
                    <Box sx={{ flexGrow: 1, mx: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={assignment.progress}
                        sx={{ height: 8, borderRadius: '4px', backgroundColor: '#bbdefb' }}
                      />
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {assignment.progress}%
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No assignments available.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Assignments;
