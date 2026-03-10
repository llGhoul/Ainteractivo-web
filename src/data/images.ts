/**
 * Rutas de imágenes centralizadas.
 * Las que están en src/assets se importan aquí para que Astro las procese (rutas seguras, optimización).
 * Las externas se definen como constantes para mantener una sola fuente de verdad.
 */

import favicon from '../assets/images/Favicon.webp';
import logo from '../assets/images/LogoAI_Horizontal_Color.webp';

export { favicon, logo };

/** Imagen de la sección Nosotros (equipo). Sustituir por import local cuando tengas el archivo en assets. */
export const equipoUrl =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200';
