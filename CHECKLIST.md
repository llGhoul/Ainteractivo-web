# Checklist del proyecto – Aprendizaje Interactivo SAS

Última revisión: tras refactor por rendimiento y migración a datos/componentes Astro.

---

## ✅ Hecho (resumen)

- **Datos centralizados en TypeScript**: `src/data/` con `contact`, `services`, `whyUs`, `testimonials`, `images`; tipos exportados.
- **Render en Astro (SSR/static)**: Servicios, Why Us y Testimonios se renderizan en el build (no por JS en cliente); menos JS y mejor LCP.
- **Imagen de equipo local**: `Equipo.webp` en `src/assets/images`, importada en `images.ts`; AboutSection usa `equipo.src` con `width`/`height`/`sizes`/`loading="lazy"`.
- **SEO**: canonical, Open Graph, Twitter Card, `og:image` (logo), descripción única, favicon multi-formato.
- **Accesibilidad**: `aria-label`, `aria-expanded`, `aria-hidden` en iconos, `focus-visible` en enlaces/botones, menú móvil con teclado (Escape) y clic fuera.
- **Menú móvil**: Toggle abrir/cerrar, cierre al elegir enlace o al hacer clic fuera, transición en CSS (`.mobile-menu.is-open`).
- **Formulario de contacto**: Formspree, validación en cliente, mensaje de éxito/error en página, estado de carga en botón, datos desde `contact.ts`.
- **Rendimiento**: GSAP + ScrollTrigger cargados bajo demanda (tras primera interacción); `prefers-reduced-motion` respetado; Lucide solo para iconos.
- **Marca**: Variables CSS `--primary`, `--primary-dark`, footer con tonos naranja, hero con degradado y tipografía Plus Jakarta Sans, sección oscura con `.section-label-on-dark`.
- **Corrección aplicada**: En `global.css` se descomentaron las directivas `@tailwind base/components/utilities` (estaban con `/*` por error).

---

## 🔲 Pendiente / Mejoras

### Crítico

- [ ] **Probar build y vista previa**: Ejecutar `npm run build` y `npm run preview` y revisar que no falten rutas ni recursos (logo, favicon, Equipo.webp, main.js).
- [ ] **Comprobar Formspree**: Enviar un mensaje de prueba desde el formulario y confirmar que llega al correo configurado en Formspree y que la respuesta de éxito/error se muestra bien.

### Contenido y enlaces

- [ ] **Enlaces del footer**: Asignar URLs reales a "Proyectos", "Blog", "Privacidad", "Términos" y "Cookies" (o ocultarlos/deshabilitarlos hasta tener páginas).
- [ ] **Redes sociales**: Los enlaces a LinkedIn, TikTok e Instagram ya apuntan a URLs; verificar que sean las definitivas.

### Imágenes y medios

- [ ] **Tamaño de assets**: Revisar peso de `LogoAI_Horizontal_Color.webp`, `Favicon.webp` y `Equipo.webp`; comprimir si superan lo razonable (~200–400 KB para hero/logo).
- [ ] **Mapa de contacto**: El iframe de Google Maps ya tiene URL; confirmar que la ubicación sea la correcta (Aprendizaje Interactivo SAS).

### Responsive y UX

- [ ] **Logo en navbar**: Probar en viewports muy pequeños (<360px) y muy grandes para asegurar que no se corte ni pixelado (`w-36 sm:w-44 md:w-52 lg:w-60`).
- [ ] **Testimonios**: La fila con `.animate-scroll` y cards de ancho fijo (`w-[400px]`); en móvil comprobar que el scroll horizontal no rompa el layout y que el toque/scroll sea usable.
- [ ] **Sección “Why us”**: En pantallas pequeñas revisar que la cuadrícula de 4 cards (Simuladores, LMS Pro, etc.) no quede apretada; ajustar padding o tamaños de texto si hace falta.

### Accesibilidad y SEO

- [ ] **Jerarquía de encabezados**: Confirmar que hay un solo `<h1>` (hero) y que el resto sigue orden lógico (h2 en secciones, h3 en subsecciones); en ServicesSection el encabezado principal está como `<h2>` (correcto si el h1 es solo el del hero).
- [ ] **Contraste**: Revisar contraste de texto en footer (texto sobre `--footer-bg`) y en el panel oscuro de contacto; asegurar que cumple WCAG AA.
- [ ] **Focus en menú móvil**: Al abrir el menú, opcionalmente mover el foco al primer enlace para navegación por teclado más fluida.

### Código y mantenimiento

- [ ] **`safeCreateIcons()`**: Lucide se llama en `DOMContentLoaded`; si en el futuro se añaden iconos inyectados por JS, puede hacer falta llamar de nuevo a `safeCreateIcons()` tras renderizar ese contenido.
- [ ] **Constante Formspree en un solo lugar**: La URL de Formspree está en `main.js` y en el `action` del form en `ContactSection.astro`; valorar centralizarla (p. ej. en `contact.ts` o en env) para no duplicar.
- [ ] **Limpiar raíz del repo**: Si existen `main.js` o `index.html` en la raíz (fuera de `public/` o `src/`), confirmar que no se usan y eliminarlos para evitar confusiones.

### Opcional (más adelante)

- [ ] **Página de agradecimiento**: Tras enviar el formulario, opción de redirigir a `/gracias` en lugar de solo mostrar el mensaje en la misma página.
- [ ] **Analytics**: Si se desea, añadir Google Analytics o similar (por script o como integración Astro) respetando consentimiento.
- [ ] **Sitemap / robots**: Generar `sitemap.xml` y `robots.txt` (Astro tiene integraciones o se puede hacer manual para una sola página).

---

## Resumen de estado

| Área           | Estado   | Notas                                              |
|----------------|----------|----------------------------------------------------|
| Datos / tipos   | ✅ Hecho | Todo en `src/data`, tipado TS                      |
| Componentes    | ✅ Hecho | Servicios, Why Us, Testimonios, Contact con datos |
| Imágenes       | ✅ Hecho | Logo, favicon, equipo locales; responsivas        |
| SEO            | ✅ Hecho | Meta, OG, Twitter, canonical                       |
| A11y           | ✅ Hecho | ARIA, focus-visible, menú móvil                   |
| Formulario     | ✅ Hecho | Formspree, validación, feedback                   |
| Rendimiento    | ✅ Hecho | GSAP bajo demanda, menos JS en cliente            |
| Estilos        | ✅ Hecho | Tailwind activo de nuevo; marca aplicada          |

Si algo falla tras `npm run build` o en producción, revisar primero: rutas de imágenes (imports desde `src/data/images`), que `main.js` esté en `public/`, y que la URL de Formspree sea la correcta.
