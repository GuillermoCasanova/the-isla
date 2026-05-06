# The Isla — Fashion show site

```text
       \ \ | / /
        \ \|/ /
         `--+--´
            |
           /|\
          / | \
         /  |  \
           / \
```

Marketing / event site for **The Isla**, built with **[SvelteKit](https://kit.svelte.dev/)** (Vite 4, Svelte 3). Page content and listings are loaded from **[Notion](https://www.notion.so/)** via the official Notion API.

## Stack

| Piece | Role |
|--------|------|
| **SvelteKit** (`@sveltejs/kit` 1.x) | App framework, routing, server load functions |
| **Notion** (`@notionhq/client`) | CMS — databases queried for music links, features, shows, people, etc. |
| **`adapter-vercel`** | Production build for **[Vercel](https://vercel.com/)** (serverless SSR & static assets) |
| **Express** | Legacy optional server (`src/server.js`) for **Node + nginx** only — **not** used on Vercel |
| **GSAP**, **Swiper**, **normalize.css** | Animation, carousels, base styles |

## Prerequisites

- **Node.js** (LTS recommended)
- A **Notion integration** with access to the databases this app reads from

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   Create a `.env` in the project root (this file is gitignored):

   ```env
   NOTION_KEY=secret_...
   NOTION_DB=...
   ```

   - **`NOTION_KEY`** — Notion integration secret (`ntn_` / integration token from Notion).
   - **`NOTION_DB`** — Used by API routes that query your main configurable database (e.g. music links). Some routes use database IDs defined in code; you still need a valid **`NOTION_KEY`** for every Notion request.

   Restart the dev server after changing `.env`.

## Scripts

| Command | What it does |
|---------|----------------|
| `npm run dev` | Dev server (Vite) |
| `npm run build` | Production build (outputs Vercel-ready artifacts via `adapter-vercel`) |
| `npm run preview` | Serve the production build locally |
| `npm start` | Same as preview (`vite preview`) — handy after `build`; Vercel runs its own runtime |
| `npm run check` | `svelte-check` |
| `npm test` | Playwright (`playwright.config.js` builds then previews on port **4173**; add tests under the usual Playwright layout when needed) |
| `npm run lint` | Prettier + ESLint |
| `npm run format` | Prettier write |

## How the app is structured

- **`src/routes/+page.svelte`** — Main page UI.
- **`src/routes/+page.server.js`** — Server `load` function: calls internal **`/api/*`** routes to assemble music links, features, and **streamed** payloads (shows, other people, other content) for progressive loading.
- **`src/routes/api/**`** — SvelteKit endpoints; each uses the shared Notion client from **`src/lib/notion.js`** (`dotenv` + `NOTION_KEY` / `NOTION_DB` where applicable).
- **`src/server.js`** — Express wrapper for a **self-hosted Node** deploy (e.g. nginx Unix socket). **Skip this on Vercel** — the platform runs the SvelteKit output from `adapter-vercel` directly.

## Deploying on Vercel

1. Push the repo to GitHub (or GitLab / Bitbucket) and **Import** the project in the Vercel dashboard.
2. Use the defaults: **Framework Preset** should detect SvelteKit; **Build Command** `npm run build`; **Output** is handled by the adapter (no manual config).
3. In **Settings → Environment Variables**, add the same keys as local development:
   - **`NOTION_KEY`**
   - **`NOTION_DB`**
4. Redeploy after changing env vars.

No `vercel.json` is required. An old static-style `vercel.json` with catch-all 404 routes would break SSR and was removed.

Local check after a build: `npm run preview` or `npm start`.

## Production notes (self-hosted Node)

If you switch back to **`@sveltejs/adapter-node`**, build produces `build/` and you can run **`node build/index.js`** or adapt **`src/server.js`** for your reverse proxy (socket/port).

HTTPS dev via `@vitejs/plugin-basic-ssl` is commented out in `vite.config.js`; enable there if you need local HTTPS.

## License / content

Site content lives in Notion and in the repo’s static assets; treat Notion credentials and `.env` as secrets and never commit them.
