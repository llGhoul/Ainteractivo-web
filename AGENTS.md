# AGENTS.md

## Cursor Cloud specific instructions

This is a single-page Astro v4 static landing site for **Aprendizaje Interactivo SAS** (Colombian EdTech company). No backend, no database, no Docker.

### Services

| Service | Command | Port |
|---|---|---|
| Astro Dev Server | `npm run dev` | 4321 |

### Key commands

See `package.json` `scripts` for all available commands. Highlights:

- **Dev server**: `npm run dev` (port 4321)
- **Type check**: `npm run check` (runs `astro check`, requires `@astrojs/check`)
- **Build**: `npm run build` (static output to `dist/`)
- **Preview prod build**: `npm run preview`
- **Lint**: `npm run lint` — currently broken because no `eslint.config.js` exists (required for ESLint v9+)

### Gotchas

- The `node_modules/.bin/*` binaries may lose execute permission after install. If commands fail with "Permission denied", run: `chmod +x node_modules/.bin/*`
- `@astrojs/check` is needed for `npm run check` but is not listed in `package.json`. Install it with `npm install @astrojs/check` if missing.
- The contact form submits to Formspree (external SaaS). Form submission works in dev mode with internet access.
- All external assets (Lucide icons, GSAP animations, Google Fonts) load from CDNs — internet required for full rendering.
