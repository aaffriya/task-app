import { Button, Grid, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react';

const TaskForm = ({ fetchTasks, handleClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [isCompleted, setIsCompleted] = useState(false);

  const [errors, setErrors] = useState({
    title: '',
    dueDate: ''
  });

  const validate = () => {
    let valid = true;
    let newErrors = { title: '', dueDate: '' };

    if (!title.trim()) {
      newErrors.title = 'Title is required';
      valid = false;
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newTask = {
      title,
      description,
      dueDate,
      priority,
      isCompleted
    };

    try {
      const response = await fetch('http://localhost:8000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify(newTask)
      });

      if (response.status === 401) {
        window.location.href = '/'; // Redirect to login if unauthorized
      } else if (response.ok) {
        fetchTasks();
        handleClose(); // Close modal on success
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* Title */}
        <Grid item xs={12}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            required
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        {/* Due Date */}
        <Grid item xs={12}>
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            error={!!errors.dueDate}
            helperText={errors.dueDate}
            required
          />
        </Grid>

        {/* Priority */}
        <Grid item xs={12}>
          <TextField
            label="Priority"
            select
            fullWidth
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12} textAlign="center">
          <Button variant="contained" color="primary" type="submit">
            Save Task
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskForm;