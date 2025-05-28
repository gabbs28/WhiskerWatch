import { CookieOptions, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
    IS_PRODUCTION,
    IS_SECURE_COOKIE,
    JWT_COOKIE_NAME,
    JWT_SECRET,
} from '../config/environment.config.js';
import { SafeUser, SelectSafeUser } from '@aa-mono-repo/common';
import { prisma } from './prisma.transaction';

/**
 * Generates a set of options for configuring a JWT cookie.
 *
 * This function merges default cookie options with any custom options passed as parameters.
 * By default, the cookie is configured to be HTTP-only, have strict or lax same-site behavior based on the environment,
 * be secure in production environments, and apply to the root path.
 *
 * @param {CookieOptions} [options={}] Additional custom cookie options to override the defaults.
 * @returns {CookieOptions} The merged cookie options to be used for setting a JWT cookie.
 */
export const JWT_COOKIE_OPTIONS = (options: CookieOptions = {}): CookieOptions => {
    return {
        httpOnly: true,
        sameSite: IS_PRODUCTION ? 'strict' : 'lax',
        secure: IS_PRODUCTION && IS_SECURE_COOKIE,
        path: '/',
        ...options,
    } as CookieOptions;
};

/**
 * Middleware function to retrieve and verify a JWT from the request cookies
 * and attach the user information to the request object if the token is valid.
 *
 * This function:
 * 1. Extracts the JWT from the request's cookies.
 * 2. If no token is present, proceeds to the next middleware without attaching any user data.
 * 3. If a token exists, verifies it with a secret key.
 * 4. If the token is valid, attaches the decoded user information to the `request.user` property.
 * 5. If the token is invalid or an error occurs during verification, continues without attaching the user.
 *
 * @param {Request} request - The incoming request object
 * @param {Response} response - The response object, unused in this middleware.
 * @param {NextFunction} next - The callback to proceed to the next middleware in the chain.
 * @returns {void}
 */
export const user = (request: Request, response: Response, next: NextFunction): void => {
    // Retrieve the token from the cookies
    const token = request.cookies[JWT_COOKIE_NAME] as string | undefined;

    // Set the default user to undefined
    request.user = undefined;

    // Early out if the token is not present
    if (!token) {
        // Continue with the request
        next();

        // Return early to prevent further execution
        return;
    }

    // Verify the token using your secret key
    jwt.verify(token, JWT_SECRET, async (error, data) => {
        // If the existing token isn't valid, continue on without adding the user to the request (unauthenticated)
        if (error || data === undefined || typeof data === 'string') {
            // Clear the cookie
            response.clearCookie(JWT_COOKIE_NAME, JWT_COOKIE_OPTIONS());

            // Continue with the request
            next();

            // Return early to prevent further execution
            return;
        }

        // Look up the user in the database and attach it to the request
        try {
            // Get user from the database
            request.user = (await prisma.users.findUnique({
                where: {
                    id: data.user.id,
                },
                select: SelectSafeUser,
            })) as SafeUser;
        } catch (error) {
            // Log
            console.error('Error retrieving user from database: ', error);

            // Clear the cookie
            response.clearCookie(JWT_COOKIE_NAME, JWT_COOKIE_OPTIONS());
        }

        // Continue with the request
        next();
    });
};
