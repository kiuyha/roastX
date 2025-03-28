import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.tsx',
                'resources/js/bootstrap.js',
                'resources/js/main.tsx',
            ],
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],
    build: {
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Split node_modules into a vendor chunk
                    if (id.includes('node_modules')) {
                        const vendor = id.split('node_modules/')[1].split('/')[0];
                        return `js/vendor/${vendor}`;
                    }

                    // Split your components into separate chunks
                    if (id.includes('resources/js/')) {
                        const name = id.split('/').pop();
                        const dir = id.split('/').slice(0, -1).pop();
                        return `js/${dir}/${name}`;
                    }
                },
            },
        },

    },
});
