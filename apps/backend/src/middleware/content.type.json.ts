import { NextFunction, Request, Response } from 'express';
import { generateErrorResponse } from '../utils/error.js';

/**
 * Middleware function to validate the content type of incoming requests.
 *
 * This middleware ensures that the `Content-Type` header of a request is set to
 * `application/json` for all request methods except `GET`. If the `Content-Type`
 * is not `application/json`, it responds with a JSON error message and status
 * code 415 (Unsupported Media Type). If the request method is `GET`, the middleware
 * skips validation and passes control to the next middleware.
 *
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export const contentTypeJson = (request: Request, response: Response, next: NextFunction): void => {
    // Ignore GET requests
    if (request.method === 'GET') {
        next();
        return;
    }

    // Get the content type of the request
    const type = request.headers['content-type']?.toLowerCase();

    // Make sure the content type is present and set to JSON
    if (!type?.startsWith('application/json')) {
        response.json(
            generateErrorResponse('Unsupported Media Type', 415, {
                message: 'Content-Type must be application/json',
            }),
        );
        return;
    }

    next();
};
