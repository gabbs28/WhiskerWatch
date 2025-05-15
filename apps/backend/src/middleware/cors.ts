import cors from 'cors';
import { CSRF_HEADER_NAME, IS_PRODUCTION, VITE_ORIGIN } from '../config/environment.config.js';

export default cors({
    origin: IS_PRODUCTION ? false : VITE_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', CSRF_HEADER_NAME],
});
