import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Login
      </Button>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Don't have an account? <Link href="/register">Register</Link>
      </Typography>
    </Box>
  );
};

export default Login;
