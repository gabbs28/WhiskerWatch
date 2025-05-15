import * as yup from 'yup';

/**
 * Defines a validation schema for a password field using Yup.
 * - Must be a string value.
 * - Is a required field with a custom error message.
 * - Enforces a minimum length of 8 characters with a specific error message.
 */
export const passwordSchema = yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long');
// .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
// .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
// .matches(/\d/, 'Password must contain at least one number')
// .matches(/[@$!%*?&]/, 'Password must contain at least one special character');
