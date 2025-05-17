import express from 'express';
import usersRouter from './api/users';
import petsRouter from './api/pets';

// Create router
const router = express.Router();

// Users
router.use('/users', usersRouter);

// Pets
router.use('/pets', petsRouter);

// Export router
export default router;
