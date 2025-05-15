/// <reference types='vitest' />
import { defineConfig, ProxyOptions } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => ({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/frontend',
    server: {
        host: 'localhost',
        proxy: ['/signup', '/session', '/api'].reduce<Record<string, ProxyOptions>>(
            (accumulator, path) => {
                //Add the path
                accumulator[path] = {
                    target: 'http://localhost:3000',
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                    configure: (proxy, _options) => {
                        proxy.on('error', (error) => {
                            console.log('proxy error', error);
                        });
                        proxy.on('proxyReq', (_proxy, request, _response) => {
                            console.log(
                                'Sending Request to the Target:',
                                request.method,
                                request.url,
                            );
                        });
                        proxy.on('proxyRes', (proxy, request, _response) => {
                            console.log(
                                'Received Response from the Target:',
                                proxy.statusCode,
                                request.url,
                            );
                        });
                    },
                };

                return accumulator;
            },
            {},
        ),
    },
    preview: {
        port: 4300,
        host: 'localhost',
    },
    plugins: [react()],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
        outDir: './dist',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
}));
