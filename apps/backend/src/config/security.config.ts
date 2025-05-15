import helmet, { HelmetOptions } from 'helmet';
import { IS_DEVELOPMENT, VITE_PORT } from './environment.config';

const configuration: HelmetOptions = {
    contentSecurityPolicy: {
        useDefaults: false,
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"].concat(
                IS_DEVELOPMENT ? ["'unsafe-eval'"] : [],
            ),
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'blob:'],
            fontSrc: ["'self'", 'data:'],
            connectSrc: IS_DEVELOPMENT
                ? [
                      "'self'",
                      'ws:',
                      `ws://localhost:${VITE_PORT}`,
                      `ws://127.0.0.1:${VITE_PORT}`,
                      `http://localhost:${VITE_PORT}`,
                      `http://127.0.0.1:${VITE_PORT}`,
                  ]
                : ["'self'"],
            workerSrc: ["'self'", 'blob:'],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'"],
            manifestSrc: ["'self'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
    crossOriginEmbedderPolicy: !IS_DEVELOPMENT,
    crossOriginResourcePolicy: {
        policy: IS_DEVELOPMENT ? 'cross-origin' : 'same-origin',
    },
    noSniff: true,
    frameguard: true,
    hidePoweredBy: true,
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
    },
    referrerPolicy: {
        policy: 'strict-origin-when-cross-origin',
    },
    xssFilter: true,
};

export default helmet(configuration);
