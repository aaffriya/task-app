import React from 'react';
import { Typography, Box, LinearProgress } from '@mui/material';

const CompletionRate = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;  // Using isCompleted property
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Task Completion Rate
      </Typography>
      <Typography variant="body1" gutterBottom>
        {`${Math.round(completionRate)}% Completed (${completedTasks}/${totalTasks})`}
      </Typography>
      <LinearProgress variant="determinate" value={completionRate} />
    </Box>
  );
};

export default CompletionRate;