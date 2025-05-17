import express, { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { JWT_COOKIE_OPTIONS } from '../middleware/user';
import { stringify, SafeUser, validate, loginSchema } from '@aa-mono-repo/common';
import { generateErrorResponse } from '../utils/error';
import { JWT_COOKIE_NAME, JWT_EXPIRATION, JWT_SECRET } from '../config/environment.config';
import { doubleCsrfGenerateToken } from '../middleware/csrf';

// Create router
const router = express.Router();

// Get current session
router.get('/', async (request: Request, response: Response) => {
    // Get user from request
    const user = request.user;

    // Return user
    response.json(user);
});

// Login
router.post('/', async (request: Request, response: Response, _next: NextFunction) => {
    // Validate the request body
    const result = await validate(loginSchema, request.body);

    // Check if the username and password are valid.
    const user = await request.db.users.findUnique({
        where: { username: result.username },
    });
    // Make sure the user exists and the password is correct.
    if (user == null || !bcrypt.compareSync(result.password, user.password_hash)) {
        response.json(
            generateErrorResponse('Invalid Credentials', 401, {
                username: 'The provided credentials were invalid.',
                password: 'The provided credentials were invalid.',
            }),
        );

        return;
    }

    // Create a sanitized user object
    const safeUser = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
    } as SafeUser;

    // Generate a JWT token with an expiry time
    const token = jwt.sign(JSON.parse(stringify({ user: safeUser })), JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
    } as SignOptions);

    // Set the csrf token as an HTTP-only cookie.
    doubleCsrfGenerateToken(request, response);

    // Set the jwt token as an HTTP-only cookie.
    response.cookie(JWT_COOKIE_NAME, token, JWT_COOKIE_OPTIONS({ maxAge: 60 * 60 * 1000 }));

    // Return the user object
    response.json(safeUser);
});

// Logout
router.delete('/', (_request: Request, response: Response) => {
    // Clear the JWT cookie. Make sure to use the same options as when it was set.
    response.clearCookie(JWT_COOKIE_NAME, JWT_COOKIE_OPTIONS());

    // Return a success message.
    response.json({ message: 'Logged Out' });
});

// Export router
export default router;
