import { APIError, APIJSONError, APIResponseError } from './errors';
import { CSRF_CLIENT_COOKIE_NAME, CSRF_HEADER_NAME } from '../../config/environment.config';
import Cookies from 'js-cookie';
import { RequestOptions } from '../interfaces/request.options';
import { RequestMethod } from '../enumerations/request.method';

/**
 * Sends an HTTP request to a specified endpoint and processes the response.
 *
 * @param {string} endpoint - The URL to which the request is sent.
 * @param {RequestMethod} method - The HTTP method to use for the request (e.g., GET, POST, PUT, DELETE).
 * @param {B} [body] - Optional. The request body, typically used with methods like POST or PUT.
 * @param {RequestOptions} [options={}] - Optional. Additional options for the request such as headers or other settings.
 * @return {Promise<T>} A promise that resolves to the response data of type T or rejects with an error.
 */
async function request<T = unknown, B = unknown>(
    endpoint: string,
    method: RequestMethod,
    body?: B,
    options: RequestOptions = {},
): Promise<T> {
    // Create fetch options
    const fetchOptions: RequestInit = {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(method != 'GET' && { [CSRF_HEADER_NAME]: Cookies.get(CSRF_CLIENT_COOKIE_NAME) }),
            ...options.headers,
        },
        ...options,
    };

    // Add the request body if it exists
    if (body) {
        fetchOptions.body = JSON.stringify(body);
    }

    // Process the response
    try {
        // Make the request
        const response = await fetch(endpoint, fetchOptions);

        // Check if the response is a response error
        if (!response.ok) {
            // noinspection ExceptionCaughtLocallyJS
            throw new APIResponseError(response.status, {
                error: true,
                title: response.statusText,
                status: response.status,
                errors: {
                    message: response.statusText,
                },
            });
        }

        // Attempt to parse the response as JSON
        const data = await response.json();

        // Check if the response is an error
        if (data.error) {
            // noinspection ExceptionCaughtLocallyJS
            throw new APIResponseError(response.status, data);
        }

        // Return the typed data
        return data as T;
    } catch (error) {
        // Check if the error is an Api error
        if (error instanceof APIError) {
            throw error;
        }

        // Check if the error is a network error
        if (error instanceof TypeError) {
            throw new APIError('Network Error', error);
        }

        // Check if the error is a JSON parsing error
        if (error instanceof Error) {
            throw new APIJSONError(error.message);
        }

        // Any other unexpected error
        throw new APIError('Api Error', error);
    }
}

/**
 * Api module providing methods for performing HTTP requests.
 */
export const API = {
    /**
     * Sends a GET request to the specified endpoint with the provided options.
     *
     * @template T - The expected response type.
     * @param {string} endpoint - The Api endpoint to send the GET request to.
     * @param {RequestOptions} [options] - Optional configurations for the request, such as headers or query parameters.
     * @returns {Promise<T>} - A promise that resolves to the response data of type T.
     */
    getRequest: <T = unknown>(endpoint: string, options?: RequestOptions): Promise<T> =>
        request<T>(endpoint, 'GET', undefined, options),

    /**
     * Sends a POST request to the specified endpoint.
     *
     * @template T The expected response type.
     * @template B The type of the request body.
     * @param {string} endpoint The URL or endpoint to which the POST request is sent.
     * @param {B} [body] The optional request body to be included in the POST request.
     * @param {RequestOptions} [options] Optional configuration options for the request, such as headers or query parameters.
     * @returns {Promise<T>} A Promise that resolves to the response of type T from the server.
     */
    postRequest: <T = unknown, B = unknown>(
        endpoint: string,
        body?: B,
        options?: RequestOptions,
    ): Promise<T> => request<T>(endpoint, 'POST', body, options),

    /**
     * Sends a PUT request to the specified endpoint with the provided request body and options.
     *
     * @template T - The expected response type.
     * @template B - The type of the request body.
     * @param {string} endpoint - The Api endpoint to send the PUT request to.
     * @param {B} [body] - The request payload to be included in the PUT request. Optional.
     * @param {RequestOptions} [options] - Additional options for the request, such as headers or query parameters. Optional.
     * @returns {Promise<T>} A promise that resolves with the server response of type T.
     */
    putRequest: <T = unknown, B = unknown>(
        endpoint: string,
        body?: B,
        options?: RequestOptions,
    ): Promise<T> => request<T>(endpoint, 'PUT', body, options),

    /**
     * Sends an HTTP DELETE request to the specified endpoint.
     *
     * @template T The expected response type of the request.
     * @param {string} endpoint The URL or endpoint where the DELETE request is sent.
     * @param {RequestOptions} [options] An optional object containing additional request options, such as headers or query parameters.
     * @returns {Promise<T>} A promise that resolves with the response data parsed as the specified type T.
     */
    deleteRequest: <T = unknown>(endpoint: string, options?: RequestOptions): Promise<T> =>
        request<T>(endpoint, 'DELETE', undefined, options),

    /**
     * Handles an error and invokes the provided reject callback with the appropriate data structure.
     *
     * @template T - The type of the error data structure passed to the reject callback.
     * @template R - The return type of the `reject` callback.
     * @param {unknown} error - The error that occurred. Can be any type.
     * @param {(data: T) => R} reject - The callback function used to handle the error.
     * @returns {R} The result of invoking the `reject` callback with the processed error data.
     *
     * - If the error is an instance of `APIResponseError`, the `error.data.errors` will be passed to `reject`.
     * - If the error is an instance of `Error`, an object containing the error message will be passed to `reject`.
     * - If the error is of any other type, a default message indicating "An unknown error occurred" will be passed to `reject`.
     */
    error: <T, R>(error: unknown, reject: (data: T) => R): R => {
        if (error instanceof APIResponseError) {
            return reject(error.data.errors as T);
        }

        if (error instanceof Error) {
            return reject({
                message: error.message,
            } as T);
        }

        return reject({
            message: 'An unknown error occurred.',
        } as T);
    },
};
