import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import router from './routes/routes';
import helmet from './config/security.config';
import cors from './middleware/cors';
import { doubleCsrfErrorHandler, doubleCsrfProtection } from './middleware/csrf';
import { serializationJson } from './middleware/serialization.json';
import rateLimit from './middleware/rate.limiting';
import { generateErrorResponse } from './utils/error';
import * as console from 'node:console';
import { validationErrorHandler } from './middleware/validation.error';
import { prismaErrorHandler } from './middleware/prisma.error';
import { SafeUser } from '@aa-mono-repo/common';
import prisma from '@aa-mono-repo/prisma-client';
import morgan from 'morgan';

declare module 'express-serve-static-core' {
    // noinspection JSUnusedGlobalSymbols
    interface Request {
        user?: SafeUser;
        db: typeof prisma;
    }
}

// Create Express app
const app = express();

// Trust proxies
app.set('trust proxy', 1);

// Morgan logging
app.use(morgan('dev'));

// Security headers
app.use(helmet);

// Rate limiting
app.use(rateLimit);

// CORS configuration
app.use(cors);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CSRF protection
app.use(doubleCsrfProtection);

// JSON serialization
app.use(serializationJson);

// Add routes
app.use(router);

// Error handlers
app.use(doubleCsrfErrorHandler);
app.use(validationErrorHandler);
app.use(prismaErrorHandler);

app.use((error: Error, request: Request, response: Response, _next: NextFunction) => {
    // Log error details using the logger
    console.error('Error occurred', {
        timestamp: new Date().toISOString(),
        method: request.method,
        url: request.url,
        message: error.message,
        stack: error.stack,
    });

    // Generate error
    response.json(generateErrorResponse('Internal Server Error', 500));
});

// Export app
export default app;
