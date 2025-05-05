import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const UpcomingDeadlines = ({ tasks }) => {
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Upcoming Deadlines
      </Typography>
      <List>
        {sortedTasks.map((task) => (
          <ListItem key={task._id}>
            <ListItemText primary={task.title} secondary={`Due: ${new Date(task.dueDate).toLocaleDateString()}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UpcomingDeadlines;