import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Box, Alert, MenuItem, Card, CardContent, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../../context/AuthContext';

const BackgroundContainer = styled('div')({
  backgroundImage: 'url(https://source.unsplash.com/random/1920x1080)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Both fields are required.');
      return;
    }

    setLoading(true); // Set loading state to true
    try {
      await axios.post('http://localhost:8080/api/users/register', {
        username,
        password,
        role,
      });
      enqueueSnackbar('Registration successful! Please login.', { variant: 'success' });
      navigate('/'); // Redirect after successful registration
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
      enqueueSnackbar('Registration failed. Please check your details.', { variant: 'error' });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <BackgroundContainer>
      <StyledCard>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <span style={{ marginRight: '8px' }}>👤</span>
                ),
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <span style={{ marginRight: '8px' }}>🔒</span>
                ),
              }}
            />
            <TextField
              select
              label="Role"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="ADMIN">Admin (Teacher)</MenuItem>
              <MenuItem value="STUDENT">Student</MenuItem>
            </TextField>
            <StyledButton type="submit" fullWidth variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
            </StyledButton>
          </form>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Already have an account? <Link to="/">Login Here</Link>
            </Typography>
          </Box>
        </CardContent>
      </StyledCard>
    </BackgroundContainer>
  );
};

export default Register;
