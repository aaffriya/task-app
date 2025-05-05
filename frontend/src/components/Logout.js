import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/logout', {
          method: 'POST',
          credentials: 'include', // Include cookies
        });

        if (response.ok) {
          setIsAuthenticated(false); // Update authentication state
          navigate('/'); // Redirect to login page
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    logout();
  }, [navigate, setIsAuthenticated]);

  return null; // No UI needed for logout
};

export default Logout;
