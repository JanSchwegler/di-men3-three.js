import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        setup: resolve(__dirname, 'src/01_setup/setup.html'),
        line: resolve(__dirname, 'src/02_line/index.html'),
        responsive: resolve(__dirname, 'src/03_responsive/index.html'),
      }
    }
  }
});
