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
        orbit: resolve(__dirname, 'src/04_orbit/index.html'),
        nesting: resolve(__dirname, 'src/05_nesting/index.html'),
        lilgui: resolve(__dirname, 'src/06_lil-gui/index.html'),
        loadGLTF: resolve(__dirname, 'src/07_load_gltf/index.html'),
        loadBunny: resolve(__dirname, 'src/08_load_bunny/index.html'),
        materials: resolve(__dirname, 'src/09_materials/index.html'),
        textures: resolve(__dirname, 'src/10_textures/index.html'),
        textures: resolve(__dirname, 'src/11_textures_gltf/index.html'),
        lighting: resolve(__dirname, 'src/11_lighting/index.html'),
      }
    }
  }
});
