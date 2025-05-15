import express, { Request, Response } from 'express';
import { NODE_ENV } from '../config/environment.config';

// Create router
const router = express.Router();

// Health check endpoint
router.get('/', (_request: Request, response: Response) => {
    response.status(200).json({
        status: 'ok',
        message: 'Server is running',
        environment: NODE_ENV,
        timestamp: new Date().toISOString(),
    });
});

// Export router
export default router;
