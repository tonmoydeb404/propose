/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [
            react(),
            createHtmlPlugin({
                minify: true,
                inject: { data: { id: env.VITE_APP_GOOGLE_VERIFICATION } },
            }),
        ],
    };
});
