import { Box, Button, Container, Grid, Modal, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CompletionRate from './components/CompletionRate';
import TaskDistributionChart from './components/TaskDistributionChart';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import UpcomingDeadlines from './components/UpcomingDeadlines';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false); // For modal control

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter only pending tasks
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const pendingTasks = tasks.filter(task => !task.isCompleted);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center" sx={{ marginTop: 4 }}>
        Task Management Dashboard
      </Typography>

      {/* Analytics Section */}
      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Task Analytics
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <TaskDistributionChart tasks={tasks} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CompletionRate tasks={tasks} />
          </Grid>
          <Grid item xs={12} md={4}>
            <UpcomingDeadlines tasks={pendingTasks} /> {/* Pass only pending tasks */}
          </Grid>
        </Grid>
      </Paper>

      {/* New Task Button */}
      <Box textAlign="center" marginBottom={4}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          New Task
        </Button>
      </Box>

      {/* Modal for TaskForm */}
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

      {/* Task List Section */}
      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      </Paper>
    </Container>
  );
};

export default App;