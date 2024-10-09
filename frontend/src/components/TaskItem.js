import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const TaskItem = ({ task, fetchTasks }) => {
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate.split('T')[0],  // Format date for input field
    isCompleted: task.isCompleted,         // Include isCompleted property
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
      await fetch(`http://localhost:8000/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editTask),
      });
      fetchTasks(); // Refresh the task list after updating
      handleClose(); // Close the modal after updating
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Add the handleDelete function
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8000/api/tasks/${task._id}`, {
        method: 'DELETE',
      });
      fetchTasks(); // Refresh the task list after deleting
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
          Completed: {task.isCompleted ? 'Yes' : 'No'}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: '100px' }}
          onClick={handleDelete}  // Use the handleDelete function
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: '100px', marginLeft: 2 }}
          onClick={handleOpen}
        >
          Edit
        </Button>
      </Box>

      {/* Modal for Editing Task */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, backgroundColor: 'white', padding: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Edit Task
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            name="title"
            fullWidth
            value={editTask.title}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Description"
            variant="outlined"
            name="description"
            fullWidth
            value={editTask.description}
            onChange={handleChange}
            multiline
            rows={3}
            margin="normal"
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
            InputLabelProps={{
              shrink: true,
            }}
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
              Update Task
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose} sx={{ marginLeft: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
};

export default TaskItem;