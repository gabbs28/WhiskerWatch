import express, { Request, Response } from 'express';
import getRouter from './pets/get'


// Create router
const router = express.Router();

router.use(getRouter)

// Export router
export default router;