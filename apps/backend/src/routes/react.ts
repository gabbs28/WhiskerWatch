import express, { Request, Response } from 'express';
import path from 'path';
import { doubleCsrfGenerateToken } from '../middleware/csrf';

// Create router
const router = express.Router();

// Location of dist folder
const dist = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'frontend', 'dist');

// Serve index.html for the root path
router.get('/', (request: Request, response: Response) => {
    // This should create / overwrite the cookie
    doubleCsrfGenerateToken(request, response);

    // Serve the React app
    response.sendFile(path.join(dist, 'index.html'));
});

// Serve static files from the React dist directory
router.use(express.static(dist));

// Export router
export default router;
