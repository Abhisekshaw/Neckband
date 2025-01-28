const express = require('express');
const mongoose = require('mongoose');
const { connectToDatabase } = require('./config/database.config');
const deviceRoutes = require('./routes/device.routes');

// Connect to the database
connectToDatabase();

// Set the default time zone for the application (Asia/Kolkata in this example)
// moment.tz.setDefault('Asia/Kolkata');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/devices', deviceRoutes);

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || `http://localhost:${PORT}`;

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${HOST}`);
});

// Set server timeout to 5 minutes
server.timeout = 300000;