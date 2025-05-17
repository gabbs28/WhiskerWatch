import express, { Request, Response } from 'express';

// Create router
const router = express.Router();

// Health check endpoint
router.get('/', async (request: Request, response: Response) => {
    const count = await request.db.users.findMany({
        where: {
            first_name: "Jane"
        }
    });

    response.status(200).json({
        count: count,
    });
});

// Export router
export default router;
