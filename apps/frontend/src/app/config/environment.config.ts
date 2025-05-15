export const MODE: string = import.meta.env.MODE ?? 'development';
export const IS_DEVELOPMENT: boolean = MODE === 'development';
export const IS_PRODUCTION: boolean = MODE === 'production';

export const CSRF_CLIENT_COOKIE_NAME: string =
    import.meta.env.VITE_CSRF_CLIENT_COOKIE_NAME ?? 'csrf-client-token';
export const CSRF_HEADER_NAME: string = import.meta.env.VITE_CSRF_HEADER_NAME ?? 'x-csrf-token';
