/**
 * Interface representing the structure of error data returned in an Api response.
 *
 * @interface APIResponseErrorData
 * @property {boolean} error Indicates if the response represents an error.
 * @property {string} title A brief title or summary describing the error.
 * @property {number} status The HTTP status code associated with the error.
 * @property {object} errors Additional details or specific errors related to the response.
 */
export interface APIResponseErrorData {
  error: boolean;
  title: string;
  status: number;
  errors: object;
}