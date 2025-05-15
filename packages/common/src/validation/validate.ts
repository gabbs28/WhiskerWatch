import { Schema, ValidationError } from 'yup';

/**
 * Validates the provided data against the given schema.
 *
 * The function uses the schema to validate the input data. If the validation
 * is successful, it resolves with the validated data. If validation fails,
 * it throws a custom error containing all the validation errors.
 *
 * @template T - The type for the schema and the validated data.
 * @param {Schema<T>} schema - The schema used to validate the input data.
 * @param {unknown} data - The data to be validated.
 * @returns {Promise<T>} A promise that resolves with the validated data if successful.
 * @throws {ExtendedValidationError} Throws an error containing detailed validation errors
 *                                   if validation fails.
 */
export const validate = async <T>(schema: Schema<T>, data: unknown): Promise<T> => {
    try {
        return await schema.validate(data, { abortEarly: false });
    } catch (error) {
        // Create error object for tracking validation errors
        const errors: Record<string, string> = {};

        // If a YUP validation error occurred, add the error
        if (error instanceof ValidationError) {
            error.inner.forEach((validation) => {
                if (validation.path) {
                    errors[validation.path] = validation.message;
                }
            });
        } else {
            errors.message = 'An unknown validation error occurred.';
        }

        // Throw an exception
        throw new ExtendedValidationError(errors);
    }
};

/**
 * Asynchronously validates data against a given schema and invokes a callback function with validation errors if any occur.
 *
 * @template T - The type of the data to be validated.
 * @param {Schema<T>} schema - The validation schema to use for validation.
 * @param {unknown} data - The data to be validated against the schema.
 * @param {(errors: Record<string, string>) => void} callback - A callback function that is called with a record of validation
 * errors
 * when validation fails. Each key-value pair in the record corresponds to a field and its associated error message.
 *
 * @returns {Promise<boolean>} - A Promise that resolves to `true` if the data is successfully validated,
 * otherwise `false` if validation fails or an error occurs.
 */
export const valid = async <T>(
    schema: Schema<T>,
    data: unknown,
    callback: (errors: Record<string, string>) => void,
): Promise<boolean> => {
    try {
        await validate(schema, data);
        return true;
    } catch (error) {
        if (error instanceof ExtendedValidationError) {
            callback(error.errors);
        } else if (error instanceof Error) {
            callback({ message: error.message });
        } else {
            callback({ message: 'An unknown error occurred.' });
        }
    }

    return false;
};

/**
 * Represents a custom error type for handling extended validation errors.
 * This error is designed to encapsulate multiple validation errors in a single error object.
 *
 * @class ExtendedValidationError
 * @extends Error
 * @param {Record<string, string>} errors - A record of validation errors where the keys
 *                                          correspond to specific fields or parameters
 *                                          and the values contain the associated error messages.
 */
export class ExtendedValidationError extends Error {
    constructor(public errors: Record<string, string>) {
        super('Extended Validation Error');
        this.name = 'ExtendedValidationError';
        this.errors = errors;

        Object.setPrototypeOf(this, ExtendedValidationError.prototype);
    }
}
