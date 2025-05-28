import express, { Request, Response } from 'express';

// Create router
const router = express.Router();

// Notes DELETE
router.delete('/', async (request: Request, response: Response) => {
    response.status(200).json({});
});

// Export router
export default router;
