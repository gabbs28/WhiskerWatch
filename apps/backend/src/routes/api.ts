import express from 'express';
import usersRouter from './api/users';

// Create router
const router = express.Router();

// Users
router.use('/users', usersRouter);

// Export router
export default router;
