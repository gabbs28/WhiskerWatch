import { APIResponseErrorData } from '../types/api.types.ts';

/**
 * Represents an error that occurs during Api interactions.
 * Extends the built-in JavaScript `Error` object to include
 * additional information about the underlying error.
 */
export class APIError extends Error {
    public error: unknown;

    constructor(message: string, error: unknown) {
        super(message);
        this.name = this.constructor.name;
        this.error = error;

        Object.setPrototypeOf(this, APIError.prototype);
    }
}

/**
 * Represents an error related to an Api response.
 * This error is thrown when an Api request fails due to a specific response issue.
 * Inherits from the `APIError` class.
 */
export class APIResponseError extends APIError {
    public status: number;
    public data: APIResponseErrorData;

    constructor(status: number, data: APIResponseErrorData) {
        super('Api Request Failure', data);
        this.status = status;
        this.data = data;

        Object.setPrototypeOf(this, APIResponseError.prototype);
    }

    toString(): string {
        return `${this.message} due to a(n) ${this.data.title}`;
    }
}

/**
 * Represents an error occurring during JSON parsing within an Api context.
 * Extends the {@link APIError} class to provide more specific error handling
 * related to JSON parse failures.
 *
 * @class
 * @extends APIError
 *
 * @param {string} originalError - The original error message or stack trace
 *                                 encountered during JSON parsing.
 */
export class APIJSONError extends APIError {
    constructor(originalError: string) {
        super('JSON Parse Failure', originalError);

        Object.setPrototypeOf(this, APIJSONError.prototype);
    }
}
