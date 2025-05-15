import { NextFunction, Request, Response } from 'express';
import { generateErrorResponse } from '../utils/error.js';

/**
 * Middleware function to check if a user is authenticated before proceeding with the request.
 * This function verifies the presence of the `user` object in the request. If the user is
 * authenticated, the middleware calls the `next` function to continue the execution.
 * If the user is not authenticated, it generates an error response with a status code of 401.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @param {Response} response - The HTTP response object used to send back the error in case of unauthorized access.
 * @param {NextFunction} next - The callback function to pass control to the next middleware or route handler.
 */
export const authenticated = (request: Request, response: Response, next: NextFunction): void => {
    // Check to see if the user is present
    if (request.user) {
        // Continue with the request
        next();

        // Return early to prevent further execution
        return;
    }

    // Generate error
    response.json(generateErrorResponse('Unauthorized', 401));
};
