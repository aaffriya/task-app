'use strict';

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,     required: true
  },
  description: {
    type: String,
    trim: true
  },
  dueDate: {
    type: Date,
    default: Date.now()
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true });

module.exports = mongoose.model('Task', taskSchema);