import { NextFunction, Request, Response } from 'express';
import { generateErrorResponse } from '../utils/error.js';
import { ExtendedValidationError } from '@aa-mono-repo/common';

/**
 * Handles validation errors by checking if the incoming error is an instance of `ExtendedValidationError`.
 * If it is, it generates a standardized error response with a 400 status code and terminates further middleware execution.
 * For any other types of errors, it passes the error to the next middleware in the chain.
 *
 * @param {Error} error - The error object caught during request handling.
 * @param {Request} _request - The incoming HTTP request object (not used in this particular handler).
 * @param {Response} response - The HTTP response object for sending the error response.
 * @param {NextFunction} next - The callback to pass control to the next middleware in the chain.
 */
export const validationErrorHandler = (
    error: Error,
    _request: Request,
    response: Response,
    next: NextFunction,
) => {
    if (error instanceof ExtendedValidationError) {
        // Respond with an error message
        response.json(generateErrorResponse('Validation Error', 400, error.errors));

        // Return early to prevent further execution
        return;
    }

    // Pass along any other errors
    next(error);
};
