import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Box, Alert, Card, CardContent, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
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

const MockLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // Mock credentials
  const mockCredentials = {
    user: { username: 'user', password: 'userpass', role: 'STUDENT' },
    admin: { username: 'admin', password: 'adminpass', role: 'ADMIN' },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Both fields are required.');
      return;
    }

    setLoading(true);

    // Check for mock credentials
    let foundUser = null;
    if (username === mockCredentials.user.username && password === mockCredentials.user.password) {
      foundUser = mockCredentials.user;
    } else if (username === mockCredentials.admin.username && password === mockCredentials.admin.password) {
      foundUser = mockCredentials.admin;
    }

    if (foundUser) {
      login(foundUser); // Simulate the login context by storing the user data
      if (rememberMe) {
        localStorage.setItem('username', username);
      }
      enqueueSnackbar('Login successful!', { variant: 'success' });
      
      // Redirect based on role
      if (foundUser.role === 'ADMIN') {
        navigate('/admin-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } else {
      setError('Invalid username or password.');
      enqueueSnackbar('Login failed. Please check your credentials.', { variant: 'error' });
    }

    setLoading(false);
  };

  return (
    <BackgroundContainer>
      <StyledCard>
        <CardContent>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Welcome Back!
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <span style={{ marginRight: '8px' }}>👤</span>
                ),
              }}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <span style={{ marginRight: '8px' }}>🔒</span>
                ),
              }}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember Me"
            />
            <StyledButton type="submit" fullWidth variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </StyledButton>
            <Typography align="center" sx={{ mt: 2 }}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </Typography>
          </form>
        </CardContent>
      </StyledCard>
    </BackgroundContainer>
  );
};

export default MockLogin;
