# Rutas privadas (admin / login)

Este proyecto está configurado con **output: 'static'**. En modo estático **no** se pueden proteger rutas en el servidor: cualquier página generada (incluida `/admin`) sería visible para quien tenga la URL.

Para tener **rutas privadas de verdad** (comprobación en el servidor):

1. **Desplegar en un host con servidor** (Node, Vercel, Netlify con Functions, etc.).
2. En `astro.config.mjs`:
   - Cambiar `output: 'static'` a `output: 'hybrid'`.
   - Añadir el adapter (ej. `@astrojs/node` cuando sea compatible con tu versión de Astro, o `@astrojs/vercel` / `@astrojs/netlify`).
3. Copiar a tu proyecto:
   - `middleware.ts` → `src/middleware.ts`
   - `login.astro` → `src/pages/login.astro`
   - `admin.astro` → `src/pages/admin.astro` (y en la página añadir `export const prerender = false`)
   - `api/auth/login.ts` y `api/auth/logout.ts` → `src/pages/api/auth/`
4. Configurar en `.env`:
   - `AUTH_SECRET`: secreto aleatorio (ej. `openssl rand -hex 32`)
   - `AUTH_PASSWORD`: contraseña para acceder a `/admin`

Con eso, al visitar `/admin` sin estar autenticado el middleware redirigirá a `/login`. Tras iniciar sesión se guarda una cookie firmada y se puede acceder a `/admin`.

Los archivos de ejemplo están en esta carpeta `_rutas-privadas/`.
