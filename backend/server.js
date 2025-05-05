'use strict';
require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
});
require('./config/database');
const express = require('express');
const cors = require('./middlewares/cors');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');

const app = express();
const port = process.env.PORT || 8000;
app.use(cors);
app.use(express.json());
app.use(cookieParser());
const taskRoutes = require('./routes/tasks');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout'); app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/logout', logoutRoutes); app.use('/api/tasks', auth, taskRoutes);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});