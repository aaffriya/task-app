import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleRegister = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setMessage('Invalid email format');
        return;
      }

      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      if (response.ok) {
        setMessage('Registration successful! You can now log in.');
        setShowLogin(true);
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Registration failed. Try again.');
      }
    } catch (err) {
      setMessage('Something went wrong');
    }
  };

  return (
    <Box
      component="form" // Use form to enable autofill
      sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}
      autoComplete="on" // Enable autofill for the form
    >
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <TextField
        label="Username"
        type="text" // Ensure this is recognized as a text field
        autoComplete="username" // Prevent autofill from overwriting this field
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        type="email" // Ensure the browser recognizes this as an email field
        autoComplete="email" // Autofill email in the correct field
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
 
      <TextField
        label="Password"
        type="password"
        autoComplete="new-password" // Allow autofill for password
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
        Register
      </Button>
      {message && (
        <Typography color="primary" variant="body2" sx={{ marginTop: 2 }}>
          {message}
        </Typography>
      )}
      {showLogin && (
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={() => (window.location.href = '/')}
        >
          Go to Login
        </Button>
      )}
    </Box>
  );
};

export default Register;
