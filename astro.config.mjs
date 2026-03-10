import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Configuración de Astro para la landing de Aprendizaje Interactivo
export default defineConfig({
  srcDir: 'src',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: true
    })
  ],
  server: {
    port: 4321
  }
});


