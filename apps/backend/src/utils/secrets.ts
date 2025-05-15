import crypto from 'crypto';

/**
 * Generates a cryptographically secure random string in hexadecimal format.
 *
 * @param {number} [length=32] - The length, in bytes, of the random data to generate. Defaults to 32 bytes.
 * @returns {string} A hexadecimal string representation of the generated random data.
 */
export const generateSecret = (length: number = 32): string => {
    return crypto.randomBytes(length).toString('hex');
};
