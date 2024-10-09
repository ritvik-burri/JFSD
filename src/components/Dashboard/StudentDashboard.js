import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Avatar,
  LinearProgress,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Menu, // Import Menu for dropdown
  Modal, // Import Modal for BarChart
} from '@mui/material';
import { styled } from '@mui/system';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon
import BarChartIcon from '@mui/icons-material/BarChart'; // Import BarChartIcon
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

const AnalyticsBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#42a5f5',
  color: '#fff',
  borderRadius: '12px',
  padding: theme.spacing(2),
  textAlign: 'center',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
}));

const StudentDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor
  const [openModal, setOpenModal] = useState(false); // State for BarChart modal

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      // Simulate an API call with a delay
      setTimeout(() => {
        setAssignments(mockAssignments);
        setLoading(false);
      }, 1000); // Simulated network delay
    } catch (err) {
      setError('Failed to load assignments.');
      setLoading(false);
    }
  };

  const filteredAssignments = assignments.filter((assignment) => {
    if (filter === 'COMPLETED') return assignment.status === 'Completed';
    if (filter === 'PENDING') return assignment.status === 'Pending';
    return true;
  });

  const handleSubmissionNotification = () => {
    // Mock notification for assignment submission
    setNotification('Assignment submitted successfully!');
  };

  const handleCloseNotification = () => {
    setNotification('');
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    handleMenuClose(); // Close menu when opening modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
            Student Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleOpenModal}>
            <BarChartIcon />
          </IconButton>
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

      {/* Filter for Assignments */}
      <Select value={filter} onChange={(e) => setFilter(e.target.value)} variant="outlined" sx={{ marginBottom: 2 }}>
        <MenuItem value="ALL">All</MenuItem>
        <MenuItem value="COMPLETED">Completed</MenuItem>
        <MenuItem value="PENDING">Pending</MenuItem>
      </Select>

      {/* Loading State */}
      {loading && <LinearProgress sx={{ marginBottom: 2 }} />}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Dashboard Overview */}
      <Box display="flex" justifyContent="space-between" mb={4}>
        <AnalyticsBox width="30%">
          <Typography variant="h6">Total Assignments</Typography>
          <Typography variant="h3">{assignments.length}</Typography>
        </AnalyticsBox>
        <AnalyticsBox width="30%">
          <Typography variant="h6">Average Progress</Typography>
          <Typography variant="h3">
            {assignments.length > 0
              ? Math.round(assignments.reduce((acc, a) => acc + a.progress, 0) / assignments.length)
              : 0}
            %
          </Typography>
        </AnalyticsBox>
        <AnalyticsBox width="30%">
          <Typography variant="h6">Upcoming Deadlines</Typography>
          <Typography variant="h3">{assignments.filter(a => new Date(a.dueDate) > new Date()).length}</Typography>
        </AnalyticsBox>
      </Box>

      {/* Assignment Cards */}
      <Grid container spacing={4}>
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <Grid item xs={12} sm={6} md={4} key={assignment.id}>
              <StyledCard>
                <CardContent>
                  <Avatar sx={{ bgcolor: '#42a5f5', mb: 2 }}>
                    <AssignmentIcon />
                  </Avatar>
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

                  {/* Action Buttons */}
                  <Box mt={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ textTransform: 'none', mb: 1 }}
                      component={Link}
                      to={`/review-feedback?assignmentId=${assignment.id}`}
                      onClick={handleSubmissionNotification} // Trigger notification on click
                    >
                      Submit Review
                    </Button>
                    <Button variant="outlined" color="secondary" fullWidth sx={{ textTransform: 'none' }}>
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 4 }}>
              <Typography variant="h6">No assignments available.</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Notification Snackbar */}
      <Snackbar open={!!notification} autoHideDuration={3000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
          {notification}
        </Alert>
      </Snackbar>

      {/* BarChart Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ ...style, width: 400 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Analytics Overview
          </Typography>
          {/* Here you can include a chart component, e.g., a Bar Chart */}
          <Typography variant="body2">
            This is where the analytics or bar chart will be displayed.
          </Typography>
          <Button variant="contained" onClick={handleCloseModal} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 24,
  p: 4,
  borderRadius: '12px',
};

export default StudentDashboard;
