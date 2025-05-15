import express, { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { userSchema, validate } from '@aa-mono-repo/common';

// Create router
const router = express.Router();

// Create a new user
router.post('/', async (request: Request, response: Response) => {
    // Validate the request body
    const result = await validate(userSchema, request.body);

    // Create user
    const user = await request.db.users.create({
        data: {
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
            username: result.username,
            password_hash: bcrypt.hashSync(result.password, 10),
        },
    });

    // Create a safe user
    const { password_hash: _, ...safeUser } = user;

    // Return user
    response.json(safeUser);
});

// Export router
export default router;
