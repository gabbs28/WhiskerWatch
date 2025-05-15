/**
 * Represents options for configuring an HTTP request.
 * Extends the RequestInit interface, omitting the 'method' and 'body' properties.
 *
 * This interface allows additional customization of a request. It provides an optional
 * headers object where user-defined headers can be specified.
 *
 * Properties:
 * - headers: Optional. A record containing custom headers to include in the request.
 */
export interface RequestOptions extends Omit<RequestInit, 'method' | 'body'> {
  headers?: Record<string, string>;
}