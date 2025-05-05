'use strict';

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasksController');
router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTaskById);
router.delete('/:id', taskController.deleteTaskById);

module.exports = router;