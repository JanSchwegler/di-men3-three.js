import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),     // Main page entry
        about: resolve(__dirname, 'dev/01_setup/setup.html'),    // About page entry
      }
    },
    outDir: 'dist', // Optional: specify the output directory for build files
  }
});
