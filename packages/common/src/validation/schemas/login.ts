import * as yup from 'yup';
import { passwordSchema } from './password.js';
import { usernameSchema } from './username.js';

/**
 * loginSchema is a validation schema for user login data.
 * It defines the structure and constraints for the user credentials.
 *
 * Structure:
 * - username: A required string with a minimum length of 1 and a maximum length of 100 characters.
 * - password: A required field validated by an externally defined passwordSchema.
 *
 * Used for validating login form inputs.
 */
export const loginSchema = yup.object({
    username: usernameSchema,
    password: passwordSchema,
});
