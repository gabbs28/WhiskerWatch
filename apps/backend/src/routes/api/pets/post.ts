import express, { Request, Response } from 'express';

// Create router
const router = express.Router();

// Pets POST
router.post('/', async (request: Request, response: Response) => {
    response.status(200).json({});
});

// Export router
export default router;