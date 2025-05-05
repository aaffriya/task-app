import React, { useState } from 'react';
import { Box, Button, Modal, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';

const TaskItem = ({ task, fetchTasks }) => {
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate.split('T')[0],
    isCompleted: task.isCompleted,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTask({ ...editTask, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setEditTask({ ...editTask, isCompleted: e.target.checked });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editTask),
      });

      if (response.status === 401) {
        window.location.href = '/';
      } else {
        fetchTasks();
        handleClose();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${task._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.status === 401) {
        window.location.href = '/';
      } else {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Box mb={2}>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {task.description}
        </Typography>
        <Typography variant="body2">Priority: {task.priority}</Typography>
        <Typography variant="body2">
          Due Date: {new Date(task.dueDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          Created By: {task.username} {/* Display username */}
        </Typography>
        <Typography variant="body2">
          Created At: {new Date(task.createdAt).toLocaleString()} {/* Display createdAt */}
        </Typography>
        <Typography variant="body2">
          Updated At: {new Date(task.updatedAt).toLocaleString()} {/* Display updatedAt */}
        </Typography>
        <Typography variant="body2">
          Completed: {task.isCompleted ? 'Yes' : 'No'}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="contained" color="primary" onClick={handleOpen} sx={{ ml: 2 }}>
          Edit
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Edit Task
          </Typography>
          <TextField
            label="Title"
            name="title"
            fullWidth
            value={editTask.title}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            value={editTask.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select name="priority" value={editTask.priority} onChange={handleChange}>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Due Date"
            type="date"
            name="dueDate"
            fullWidth
            value={editTask.dueDate}
            onChange={handleChange}
            margin="normal"
          />
          <FormControlLabel
            control={<Checkbox checked={editTask.isCompleted} onChange={handleCheckboxChange} />}
            label="Completed"
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
};

export default TaskItem;