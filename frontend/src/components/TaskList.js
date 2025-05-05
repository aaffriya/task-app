import React from 'react';
import { Grid, Typography } from '@mui/material';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, fetchTasks }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Task List
      </Typography>
      {tasks.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No tasks available.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task._id}>
              <TaskItem task={task} fetchTasks={fetchTasks} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default TaskList;