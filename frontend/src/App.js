import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tasks', {
        method: 'GET',
        credentials: 'include', // Include cookies
      });
      if (response.status === 401) {
        setIsAuthenticated(false); // Ensure authentication state is updated
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false); // Ensure authentication state is updated on error
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center" sx={{ marginTop: 4 }}>
        Task Management App
      </Typography>
      {isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Dashboard setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </Container>
  );
};

export default App;