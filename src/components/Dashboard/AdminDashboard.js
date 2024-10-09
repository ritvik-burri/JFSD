import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/system';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack'; // Import useSnackbar

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
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
  '& svg': {
    marginBottom: theme.spacing(1),
  },
}));

const PlaceholderCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#f1f1f1',
  borderRadius: '12px',
  height: '100%',
  textAlign: 'center',
  padding: theme.spacing(4),
}));

const AdminDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [open, setOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchAssignments();
  }, []);

  // Mock data for assignments
  const mockAssignments = [
    {
      id: 1,
      title: 'JFSD',
      description: 'Complete the frontend.',
      dueDate: '2024-10-10',
      progress: 50,
      status: 'Pending',
    },
    {
      id: 2,
      title: 'PFSD',
      description: 'Complete the backend.',
      dueDate: '2024-10-15',
      progress: 30,
      status: 'Pending',
    },
    {
      id: 3,
      title: 'MSWD',
      description: 'Completed admin dashboard module.',
      dueDate: '2024-10-20',
      progress: 80,
      status: 'Completed',
    },
  ];

  const fetchAssignments = async () => {
    try {
      // Simulate an API call with mock data
      setAssignments(mockAssignments);
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Failed to fetch assignments.', { variant: 'error' });
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewAssignment({ title: '', description: '', dueDate: '' });
  };

  const handleChange = useCallback((e) => {
    setNewAssignment({ ...newAssignment, [e.target.name]: e.target.value });
  }, [newAssignment]);

  const handleCreate = async () => {
    try {
      // Simulate adding a new assignment
      const newId = assignments.length + 1;
      setAssignments([...assignments, { ...newAssignment, id: newId, status: 'Pending', progress: 0 }]);
      enqueueSnackbar('Assignment created successfully!', { variant: 'success' });
      handleClose();
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Failed to create assignment.', { variant: 'error' });
    }
  };

  const handleDelete = (id) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
    enqueueSnackbar('Assignment deleted successfully!', { variant: 'success' });
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
            Admin Dashboard
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

      {/* Analytics Section */}
      <Box display="flex" justifyContent="space-between" mb={4}>
        <AnalyticsBox width="30%">
          <TimelineIcon fontSize="large" />
          <Typography variant="h6">Total Assignments</Typography>
          <Typography variant="h3">{assignments.length}</Typography>
        </AnalyticsBox>
        <AnalyticsBox width="30%">
          <BarChartIcon fontSize="large" />
          <Typography variant="h6">Average Completion Rate</Typography>
          <Typography variant="h3">
            {assignments.length > 0
              ? Math.round(assignments.reduce((acc, a) => acc + a.progress, 0) / assignments.length)
              : 0}
            %
          </Typography>
        </AnalyticsBox>
        <AnalyticsBox width="30%">
          <AssessmentIcon fontSize="large" />
          <Typography variant="h6">Pending Reviews</Typography>
          <Typography variant="h3">{assignments.filter(a => a.status === 'Pending').length}</Typography>
        </AnalyticsBox>
      </Box>

      {/* Create Assignment Button */}
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
        Create New Assignment
      </Button>

      {/* Loading State */}
      {assignments.length === 0 && <LinearProgress sx={{ marginBottom: 2 }} />}

      {/* Assignment Cards */}
      <Grid container spacing={4}>
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
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
                  <Box mt={2}>
                    <Tooltip title="Completion Progress" arrow>
                      <LinearProgress variant="determinate" value={assignment.progress} />
                    </Tooltip>
                  </Box>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(assignment.id)} sx={{ mt: 2 }}>
                    Delete Assignment
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <PlaceholderCard elevation={3}>
              <Typography variant="h6">No assignments available. Create one!</Typography>
              <Button variant="outlined" onClick={handleOpen} sx={{ mt: 2 }}>
                Create Assignment
              </Button>
            </PlaceholderCard>
          </Grid>
        )}
      </Grid>

      {/* Create Assignment Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Assignment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            name="title"
            value={newAssignment.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={newAssignment.description}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            name="dueDate"
            value={newAssignment.dueDate}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Advanced Features Mockup */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Advanced Features
          </Typography>
        </Grid>

        {/* Analytics Dashboard */}
        <Grid item xs={12} sm={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Analytics Dashboard
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2">Total Assignments: {assignments.length}</Typography>
                <Typography variant="body2">
                  Average Completion Rate: {assignments.length > 0 ? Math.round(assignments.reduce((acc, a) => acc + a.progress, 0) / assignments.length) : 0}%
                </Typography>
                <Typography variant="body2">
                  Pending Reviews: {assignments.filter(a => a.status === 'Pending').length}
                </Typography>
                <LinearProgress variant="determinate" value={Math.round(assignments.length > 0 ? Math.round(assignments.reduce((acc, a) => acc + a.progress, 0) / assignments.length) : 0)} sx={{ mt: 2, width: '100%' }} />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Automated Feedback System */}
        <Grid item xs={12} sm={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Automated Feedback System
              </Typography>
              <Typography variant="body2">
                This system analyzes submissions and provides feedback based on preset criteria.
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>Example Feedback:</strong>
              </Typography>
              <Typography variant="body2">
                "Your assignment meets the requirements but could use more detailed examples."
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                View Feedback History
              </Button>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
