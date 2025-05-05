import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Modal,
} from '@mui/material';
import { Chart as ChartJS, ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { useNavigate } from 'react-router-dom';
ChartJS.register(ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const Dashboard = ({ setIsAuthenticated }) => {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    priorityDistribution: {
      labels: [],
      datasets: [],
    },
    completionRate: {
      labels: [],
      datasets: [],
    },
  });
  const [open, setOpen] = useState(false); // Modal control for TaskForm
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tasks', {
        credentials: 'include', // Include cookies for authentication
      });
      if (response.status === 401) {
        window.location.href = '/'; // Redirect to login if unauthorized
      } else {
        const data = await response.json();
        setTasks(data); // Update tasks state with fetched tasks
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const prepareData = () => {
    const priorityCount = { High: 0, Medium: 0, Low: 0 };
    const completedTasks = tasks.filter(task => task.isCompleted);
    const remainingTasks = tasks.length - completedTasks.length;

    tasks.forEach(task => {
      if (priorityCount[task.priority] !== undefined) {
        priorityCount[task.priority]++;
      }
    });

    setTaskData({
      priorityDistribution: {
        labels: Object.keys(priorityCount),
        datasets: [
          {
            label: 'Task Distribution by Priority',
            data: Object.values(priorityCount),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      },
      completionRate: {
        labels: ['Completed', 'Remaining'], // Fix labels for completion rate
        datasets: [
          {
            label: 'Task Completion Rate',
            data: [completedTasks.length, remainingTasks], // Fix data for completion rate
            backgroundColor: ['#36A2EB', '#FF6384'],
          },
        ],
      },
    });
  };

  const handleLogout = async () => {
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

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks.length) {
      prepareData();
    }
  }, [tasks]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ padding: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>
          Task Management Dashboard
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginBottom: 2 }}
      >
        Create New Task
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <TaskForm fetchTasks={fetchTasks} handleClose={handleClose} />
        </Box>
      </Modal>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Task Distribution</Typography>
            {taskData.priorityDistribution.labels.length > 0 ? (
              <Pie data={taskData.priorityDistribution} />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No data available
              </Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Completion Rate</Typography>
            {taskData.completionRate.labels.length > 0 ? (
              <Bar data={taskData.completionRate} />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No data available
              </Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <TaskList tasks={tasks} fetchTasks={fetchTasks} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;