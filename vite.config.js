import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),     // Main page entry
        about: resolve(__dirname, 'src/01_setup/setup.html'),    // About page entry
        page02: resolve(__dirname, 'src/02_line/index.html'),    // About page entry
      }
    }
  }
});
