/**
 * DreamHost deployment script for GhostRep
 * 
 * This script is designed to work with DreamHost shared hosting environments
 * It can be run as a non-root user through Passenger or directly
 */

// Load environment variables
require('dotenv').config();

// Import the main application
const { app } = require('./server'); 

// DreamHost will typically provide a PORT environment variable
const PORT = process.env.PORT || 8080;

// Log startup information
console.log('Starting GhostRep server on DreamHost...');
console.log(`Server environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`Using port: ${PORT}`);

// Start listening on the assigned port
const server = app.listen(PORT, () => {
  console.log(`GhostRep server running on port ${PORT}`);
  console.log(`Server started at: ${new Date().toISOString()}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
  });
