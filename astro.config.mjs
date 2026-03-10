import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Configuración de Astro para la landing de Aprendizaje Interactivo
export default defineConfig({
  site: 'https://www.aprendizajeinteractivo.com',
  srcDir: 'src',
  output: 'static',
  devToolbar: { enabled: false },
  integrations: [
    tailwind({
      applyBaseStyles: true
    })
  ],
  server: {
    port: 4321
  }
});


