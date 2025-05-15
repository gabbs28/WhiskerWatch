/**
 * Represents the HTTP request methods that can be used in an application.
 *
 * This type defines the possible values for HTTP methods:
 * - 'GET': Used to retrieve data from a server.
 * - 'POST': Used to send data to a server to create or update a resource.
 * - 'PUT': Used to update an existing resource or create it if it does not exist.
 * - 'DELETE': Used to delete a resource from the server.
 */
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';