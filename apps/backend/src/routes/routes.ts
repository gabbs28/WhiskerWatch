import express from 'express';
import health from './health';
import signup from './signup';
import session from './session';
import api from './api';
import react from './react';
import { user } from '../middleware/user';
import { contentTypeJson } from '../middleware/content.type.json';
import { authenticated } from '../middleware/authenticated';
import { prismaTransactionHandler } from '../middleware/prisma.transaction';

// Create router
const router = express.Router();

// Add middleware for content type and user
router.use(contentTypeJson, user);

// Add a router for health check
router.use('/health', health);

// Add a router for signup
router.use('/signup', prismaTransactionHandler, signup);

// Add a router for sessions
router.use('/session', prismaTransactionHandler, session);

// Add a router for the API
router.use('/api', authenticated, prismaTransactionHandler, api);

// Add a static router
router.use(react);

// Export router
export default router;
