import { NextFunction, Request, Response } from 'express';
import { generateErrorResponse } from '../utils/error.js';
import {
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from '@aa-mono-repo/prisma-client';

/**
 * Handles errors arising from Prisma client operations and provides appropriate responses.
 *
 * The `prismaErrorHandler` function is a middleware designed to intercept and process various
 * error types thrown by the Prisma client library during database interactions. It checks for
 * specific known error instances and adapts the response accordingly, ensuring user-friendly
 * and consistent error reporting. See https://www.prisma.io/docs/orm/reference/error-reference
 * for more details.
 *
 * Supported error types include:
 * - PrismaClientKnownRequestError: Handles unique constraint violations (e.g., duplicate entries)
 *   and other predefined Prisma error codes with detailed messages.
 * - PrismaClientValidationError: Handles validation errors occurring during client-side query validation.
 * - PrismaClientUnknownRequestError, PrismaClientRustPanicError, and PrismaClientInitializationError:
 *   Handles unknown or unexpected client-side errors during database interactions.
 *
 * Other unknown errors are passed further in the middleware chain for default handling.
 *
 * @param {Error} error - The error object thrown during the operation.
 * @param {Request} _request - The incoming HTTP request object. Unused in the logic.
 * @param {Response} response - The response object used to send error details back to the client.
 * @param {NextFunction} next - The next middleware function in the execution chain for error propagation.
 */
export const prismaErrorHandler = (
    error: Error,
    _request: Request,
    response: Response,
    next: NextFunction,
) => {
    // Check if the error is a known Prisma error
    if (error instanceof PrismaClientKnownRequestError) {
        // Handle specific known error codes
        switch (error.code) {
            // Unique
            case 'P2002': {
                // Get target
                const target = Array.isArray(error.meta?.target)
                    ? error.meta?.target.join(', ')
                    : 'field';

                // Respond with an error message
                response.json(
                    generateErrorResponse('Unique Constraint Error', 400, {
                        message: `A record with the specified ${target} already exists. Please use a different value.`,
                        [target]: `This ${target} is already in use.`,
                    }),
                );

                // Return early to prevent further execution
                return;
            }

            // Catch all for unhandled codes
            default: {
                // Respond with an error message
                response.json(
                    generateErrorResponse('General Database Error', 400, {
                        message: `General Database Error: (${error.code}) ${error.message}`,
                    }),
                );

                // Return early to prevent further execution
                return;
            }
        }
    } else if (error instanceof PrismaClientValidationError) {
        // Respond with an error message
        response.json(
            generateErrorResponse('Validation Error', 400, {
                message: `Validation Error: ${error.message}`,
            }),
        );

        // Return early to prevent further execution
        return;
    } else if (
        error instanceof PrismaClientUnknownRequestError ||
        error instanceof PrismaClientRustPanicError ||
        error instanceof PrismaClientInitializationError
    ) {
        // Respond with an error message
        response.json(
            generateErrorResponse('Database Error', 400, {
                message: `Client Error: ${error.message}`,
            }),
        );

        // Return early to prevent further execution
        return;
    }

    // Pass along any other errors
    next(error);
};
