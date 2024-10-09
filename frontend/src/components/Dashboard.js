import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({});

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const prepareData = () => {
    const priorityCount = { High: 0, Medium: 0, Low: 0 };
    const completedTasks = tasks.filter(task => task.completed);
    const completionRate = (completedTasks.length / tasks.length) * 100 || 0;

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
        labels: ['Completed', 'Remaining'],
        datasets: [
          {
            data: [completedTasks.length, tasks.length - completedTasks.length],
            backgroundColor: ['#36A2EB', '#FF6384'],
          },
        ],
      },
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks.length) {
      prepareData();
    }
  }, [tasks]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Task Management Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Task Distribution</Typography>
            <Pie data={taskData.priorityDistribution} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Completion Rate</Typography>
            <Bar data={taskData.completionRate} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Upcoming Deadlines</Typography>
            <List>
              {tasks
                .filter(task => new Date(task.dueDate) > new Date())
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                .map(task => (
                  <ListItem key={task._id}>
                    <ListItemText
                      primary={`${task.title} - Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                    />
                  </ListItem>
                ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;