# Seguridad y buenas prácticas

## 1. No poner secretos en el frontend

- **Formulario de contacto (Formspree):** El ID del formulario se configura con la variable de entorno `PUBLIC_FORMSPREE_FORM_ID`. Copia `.env.example` a `.env` y rellena el valor. Así no queda hardcodeado en el código.
- **Nunca** pongas en el código (ni en el frontend ni en repos públicos):
  - Claves de API
  - Contraseñas
  - Tokens privados

Usa siempre variables de entorno (`.env`) y, para datos que solo debe ver el servidor, variables **sin** el prefijo `PUBLIC_`.

## 2. Código más difícil de leer

- El JavaScript del sitio se **empaqueta y minifica** en el build:
  - El script principal está en `src/scripts/main.js` y se incluye desde `index.astro`. Al hacer `npm run build`, Vite lo minifica con **Terser** (sin comentarios, código comprimido).
- El resultado se sirve como un único chunk en `_astro/`, lo que hace el código más difícil de seguir que un archivo plano en `/main.js`.

## 3. Rutas privadas de verdad

Con **output: 'static'** no se pueden proteger rutas en el servidor: cualquier URL generada es accesible para quien la conozca.

Para tener **rutas privadas con comprobación en el servidor** (por ejemplo `/admin`):

1. Configura el proyecto en modo **hybrid** o **server** y usa un adapter (Node, Vercel, Netlify, etc.) compatible con tu versión de Astro.
2. En la carpeta **`_rutas-privadas/`** tienes un ejemplo listo para copiar:
   - `middleware.ts`: redirige a `/login` si no hay sesión válida al entrar en `/admin`.
   - `login.astro` y `admin.astro`: páginas de login y área privada.
   - `api/auth/login.ts` y `api/auth/logout.ts`: login con contraseña y cierre de sesión.
3. En `.env` configura `AUTH_SECRET` y `AUTH_PASSWORD` según se indica en `.env.example`.

Detalles e instrucciones paso a paso están en **`_rutas-privadas/README.md`**.
