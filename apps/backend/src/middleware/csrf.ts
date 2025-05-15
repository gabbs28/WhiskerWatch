import { doubleCsrf } from 'csrf-csrf';
import {
    CSRF_CLIENT_COOKIE_NAME,
    CSRF_COOKIE_NAME,
    CSRF_HEADER_NAME,
    CSRF_SECRET,
    IS_PRODUCTION,
    IS_SECURE_COOKIE,
} from '../config/environment.config.js';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { generateErrorResponse } from '../utils/error.js';

interface CsrfError extends Error {
    code?: string;
}

const options = {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    sameSite: IS_PRODUCTION ? 'strict' : 'lax',
    path: '/',
    secure: IS_PRODUCTION && IS_SECURE_COOKIE,
} as CookieOptions;

const { generateToken, doubleCsrfProtection } = doubleCsrf({
    getSecret: () => CSRF_SECRET,
    cookieName: CSRF_COOKIE_NAME,
    cookieOptions: {
        ...options,
        httpOnly: true,
    },
    size: 64,
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
    getTokenFromRequest: (request: Request) => request.get(CSRF_HEADER_NAME),
});

/**
 * Generates a new CSRF (Cross-Site Request Forgery) token and sets it as a client-side cookie.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @param {Response} response - The outgoing HTTP response object.
 * @param {boolean} [overwrite=true] - Determines whether to overwrite the existing CSRF token.
 * @param {boolean} [validateOnReuse=true] - Specifies if the CSRF token should be validated on reuse.
 *
 * This function creates a CSRF token for the client and injects it as a cookie that is accessible
 * to web applications. The generated token can be used to help prevent CSRF attacks by verifying
 * that the client is legitimately authorized to perform sensitive operations.
 */
const doubleCsrfGenerateToken = (
    request: Request,
    response: Response,
    overwrite: boolean = true,
    validateOnReuse: boolean = true,
): void => {
    // Generate new CSRF token
    const token = generateToken(request, response, overwrite, validateOnReuse);

    // Create the client cookie
    response.cookie(CSRF_CLIENT_COOKIE_NAME, token, { ...options, httpOnly: false });
};

/**
 * Handles errors related to double CSRF token validation and processing.
 *
 * This function checks if the error is related to an invalid or missing CSRF token.
 * If the specific CSRF error is detected, it generates a new CSRF token, responds
 * with an appropriate error message, and terminates further execution. For other
 * types of errors, it delegates to the next error-handling middleware.
 *
 * @param {CsrfError} error - The error object containing details about the CSRF error.
 *                            Specifically checks for error code `EBADCSRFTOKEN` or
 *                            messages indicating an invalid CSRF token.
 * @param {Request} request - The HTTP request object, used to handle CSRF token generation.
 * @param {Response} response - The HTTP response object, used to send the error response with
 *                               a descriptive message and status code.
 * @param {NextFunction} next - Callback to delegate the error to subsequent middleware if
 *                               it is not related to CSRF.
 */
const doubleCsrfErrorHandler = (
    error: CsrfError,
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    // Check for the specific CSRF error code/message
    if (error.code === 'EBADCSRFTOKEN' || error?.message.includes('invalid CSRF token')) {
        // Generate new CSRF token
        doubleCsrfGenerateToken(request, response);

        // Respond with an error message
        response.json(
            generateErrorResponse('Token Not Found', 401, {
                message: 'Invalid or missing CSRF token not found. Please refresh and try again.',
            }),
        );

        // Return early to prevent further execution
        return;
    }

    // Pass along any other errors
    next(error);
};

// Exports
export { doubleCsrfProtection, doubleCsrfGenerateToken, doubleCsrfErrorHandler };
