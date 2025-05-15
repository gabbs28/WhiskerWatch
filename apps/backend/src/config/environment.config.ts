import { generateSecret } from '../utils/secrets';
import * as process from 'node:process';

export const PORT: number = parseInt(process.env.PORT ?? '3000', 10);
export const NODE_ENV: string = process.env.NODE_ENV ?? 'development';
export const IS_DEVELOPMENT: boolean = NODE_ENV === 'development';
export const IS_PRODUCTION: boolean = NODE_ENV === 'production';

// When running "production" locally for testing, https isn't used, so cookies can't be secure
export const IS_SECURE_COOKIE: boolean = process.env.IS_SECURE_COOKIE
    ? process.env.IS_SECURE_COOKIE === 'true'
    : true;

export const CSRF_COOKIE_NAME: string = process.env.CSRF_COOKIE_NAME ?? 'csrf-token';
export const CSRF_CLIENT_COOKIE_NAME: string =
    process.env.CSRF_CLIENT_COOKIE_NAME ?? 'csrf-client-token';
export const CSRF_HEADER_NAME: string = process.env.CSRF_HEADER_NAME ?? 'x-csrf-token';
export const CSRF_SECRET: string = process.env.CSRF_SECRET ?? generateSecret();

export const JWT_COOKIE_NAME: string = process.env.JWT_COOKIE_NAME ?? 'jwt-token';
export const JWT_SECRET: string = process.env.JWT_SECRET ?? generateSecret();
export const JWT_EXPIRATION: string = process.env.JWT_EXPIRATION ?? '1w';

export const VITE_PORT: number = parseInt(process.env.VITE_PORT ?? '5173');
export const VITE_ORIGIN: string = process.env.CLIENT_ORIGIN ?? `http://localhost:${VITE_PORT}`;
