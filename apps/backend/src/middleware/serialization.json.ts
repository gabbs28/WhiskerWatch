import { NextFunction, Request, Response } from 'express';
import { stringify } from '@aa-mono-repo/common';

/**
 * Middleware function to override the `response.json` method.
 *
 * This function intercepts the `response.json` call and modifies its behavior to:
 * - Automatically set the 'Content-Type' header as 'application/json'.
 * - Serialize the response data into a JSON string using a custom stringification logic.
 *
 * After overriding the `response.json`, this middleware proceeds to the next middleware or route handler.
 *
 * @param {Request} _request - Express request object (not used in this middleware).
 * @param {Response} response - Express response object. The `json` method is overridden.
 * @param {NextFunction} next - Callback to invoke the next middleware or route handler in the request-response cycle.
 */
export const serializationJson = (_request: Request, response: Response, next: NextFunction) => {
    // Save the original res.json function
    const json = response.json;

    // Replace the response.json function with a custom one
    response.json = (data) => {
        // Call the original function after passing the data through a custom stringification logic
        return data === undefined
            ? json.call(response, data)
            : json.call(response, JSON.parse(stringify(data)));
    };

    // Continue with the request
    next();
};
