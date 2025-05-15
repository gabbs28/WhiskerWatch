import { NextFunction, Request, Response } from 'express';
import prisma from '@aa-mono-repo/prisma-client';

export const prismaTransactionHandler = (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    prisma
        .$transaction(
            async (transaction) => {
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
