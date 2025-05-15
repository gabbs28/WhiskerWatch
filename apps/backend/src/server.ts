import http from 'http';

// This should be the first import to ensure the environment variables are loaded
import { NODE_ENV, PORT } from './config/environment.config';

// Import the rest of your application
import app from './app';

// Create server
const server = new http.Server(app);

// Handle uncaught exceptions and unhandled rejections
process.on('uncaughtException', (error: Error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Graceful shutdown
const shutdown = () => {
    console.warn('Shutting down server...');
    server.close(() => {
        console.warn('Server closed');
        process.exit(0);
    });
};

// Handle SIGTERM and SIGINT
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Start server
server.listen(PORT, () => {
    console.warn(`
    Server running in ${NODE_ENV} mode
    Listening on port ${PORT}
    Ready to handle requests
  `);
});
