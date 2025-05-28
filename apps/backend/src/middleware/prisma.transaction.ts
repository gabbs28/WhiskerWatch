import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '../database';

// Create a global Prisma Client
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

// Wrap prisma creation behind a singleton function
function getPrismaClient() {
    if (process.env.NODE_ENV === 'production') {
        return new PrismaClient();
    }

    globalForPrisma.prisma ??= new PrismaClient();

    return globalForPrisma.prisma;
}

// Export the wrapped function as "prisma"
export const prisma = getPrismaClient();

export const prismaTransactionHandler = (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    prisma
        .$transaction(
            async (transaction: unknown) => {
                // Attach transaction client to the request object
                request.db = transaction as typeof prisma;

                // Wait until the response is finished (or closed) before completing the transaction
                await new Promise<void>((resolve, reject) => {
                    // Remove handlers when the promise is resolved
                    const cleanup = () => {
                        response.removeListener('finish', success);
                        response.removeListener('close', success);
                        response.removeListener('error', failure);
                    };

                    // On success, resolve the promise
                    const success = () => {
                        cleanup();
                        resolve();
                    };

                    // On error, reject the promise
                    const failure = (error: Error) => {
                        cleanup();
                        reject(error);
                    };

                    // Attach event listeners
                    response.on('finish', success);
                    response.on('close', success);
                    response.on('error', failure);

                    // Call next synchronously to allow the request handler to run
                    next();
                });
            },
            {
                maxWait: 10000, // default 2 second
                timeout: 30000, // default 5 seconds
            },
        )
        // Pass errors along to the next middleware
        .catch(next);
};
