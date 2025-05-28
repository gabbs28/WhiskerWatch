import express, { Request, Response } from 'express';

// Create router
const router = express.Router();

// Pets PUT
router.put('/', async (request: Request, response: Response) => {
    response.status(200).json({});
});

// Export router
export default router;
