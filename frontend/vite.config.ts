import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import ViteCSSExportPlugin from 'vite-plugin-css-export';

import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5173,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'src', 'assets'),
      components: path.resolve(__dirname, 'src', 'components'),
      pages: path.resolve(__dirname, 'src', 'pages'),
      services: path.resolve(__dirname, 'src', 'services'),
      styles: path.resolve(__dirname, 'src', 'styles'),
      utils: path.resolve(__dirname, 'src', 'utils'),
    },
  },
  define: {
    __API_ENDPOINT__: JSON.stringify(process.env.API_ENDPOINT), // это нужно, чтобы потом добавить переменную из.env в глобальную видимость
    __API_ENDPOINT_BASE__: JSON.stringify(process.env.API_ENDPOINT_BASE),
  },
  plugins: [react(), svgr(), ViteCSSExportPlugin()],
});
