import * as yup from 'yup';
import { passwordSchema } from './password.js';
import { usernameSchema } from './username.js';

/**
 * Schema definition for validating a user's data input using Yup.
 * This schema validates the user's basic information, including first name, last name, email, username,
 * password, and password confirmation. Each field has specific validation rules.
 *
 * Properties:
 * - first_name: Validates the user's first name. It must be a non-empty string with a maximum length of 100 characters.
 * - last_name: Validates the user's last name. It must be a non-empty string with a maximum length of 100 characters.
 * - email: Validates the user's email address. It must be formatted as a valid email and is required.
 * - username: Validates the username. It must be a non-empty string with a maximum length of 100 characters.
 * - password: Validates the user's password. The validation rules for passwords are defined in the passwordSchema.
 * - password_confirmation: Validates that the confirmation password matches the user's password. Ensures both fields are the same.
 */
export const userSchema = yup.object({
    first_name: yup
        .string()
        .required('A first name is required')
        .min(1, 'A first name must be at least one character')
        .max(100, 'A first name cannot be more than 100 characters'),
    last_name: yup
        .string()
        .required('A last name is required')
        .min(1, 'A last name must be at least one character')
        .max(100, 'A last name cannot be more than 100 characters'),
    email: yup.string().required('An email address is required').email(),
    username: usernameSchema,
    password: passwordSchema,
    password_confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
});
