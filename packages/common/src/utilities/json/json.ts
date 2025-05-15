/**
 * Serializes a JavaScript value into a JSON string with special handling for `bigint` values.
 *
 * Converts all `bigint` values within the input data to strings to ensure compatibility with JSON serialization.
 * Uses a custom replacer function to handle this conversion process while preserving the structure of other data types.
 *
 * @param {unknown} data - The value to be serialized into a JSON string.
 * @returns {string} A JSON string representation of the input data, with `bigint` values converted to strings.
 */
export const stringify = (data: unknown): string => {
    // Convert bigint to strings
    const replacer = (_key: string, value: unknown) =>
        typeof value === 'bigint' ? value.toString() : value;

    // Use the custom replacer when serializing the data
    return JSON.stringify(data, replacer);
};
