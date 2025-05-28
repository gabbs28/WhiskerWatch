import express from 'express';
import usersRouter from './api/users';
import notesRouter from './api/notes';
import petsRouter from './api/pets';

// Create router
const router = express.Router();

// Users
router.use('/users', usersRouter);

// Notes
router.use('/notes', notesRouter);

// Pets
router.use('/pets', petsRouter);

// Export router
export default router;
