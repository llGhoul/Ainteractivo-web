# AGENTS.md

## Cursor Cloud specific instructions

This is a static Astro v4 landing page for **Aprendizaje Interactivo SAS** (Colombian EdTech company). There is no backend, database, or authentication.

### Running the app

- **Dev server**: `npm run dev` → `http://localhost:4321`
- **Build**: `npm run build` → outputs to `dist/`
- **Preview built site**: `npm run preview`
- **Type check**: `npm run check`
- Standard commands are in `package.json` `scripts`.

### Known issues

- `npm run lint` fails because the repo has no `eslint.config.js` (ESLint v9 requires flat config). This is a pre-existing repo issue — do not treat it as a regression.
- `astro check` requires `@astrojs/check` which is not in `package.json` dependencies. The update script installs it automatically. If it prompts interactively, install it manually with `npm install @astrojs/check`.

### External services

- The contact form submits to **Formspree** (`https://formspree.io/f/mkoqjqno`). This is external SaaS — no local setup needed. Requires internet.
- Icons (Lucide), fonts (Google Fonts), and animations (GSAP) load from CDNs. The site renders without them but looks incomplete.
