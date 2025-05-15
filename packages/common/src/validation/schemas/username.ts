import * as yup from 'yup';

/**
 * A Yup string schema for validating usernames.
 *
 * This schema ensures that:
 * - The username is a required field and throws an error message if absent.
 * - The username has a minimum length of 1 character. An error message is provided if the minimum length is not met.
 * - The username has a maximum length of 100 characters. An error message is provided if the maximum length is exceeded.
 */
export const usernameSchema = yup
    .string()
    .required('A username is required')
    .min(1, 'A username must be at least one character')
    .max(100, 'A username cannot be more than 100 characters');
