# AGENTS.md

Guidance for AI agents (and humans) working in this repo.

## What this is

**House of Amrut** — a frontend-only marketing/prototype SPA for a spirits
library, tasting room, and cocktail destination.

- **React 18** + **Vite 8** (ESM, `"type": "module"`)
- **JavaScript** (`.jsx`), typechecked with `tsc --checkJs` via `jsconfig.json`
- **react-router-dom 6** — routes defined in `src/App.jsx` under a shared `Layout`
- **@tanstack/react-query 5** — client in `src/lib/query-client.js`
- Auth is **mocked** — `src/lib/AuthContext.jsx` returns a dummy user; there is no backend
- **Tailwind CSS 3** + **shadcn/ui** (new-york style) — 54 primitives in `src/components/ui/`
- **framer-motion** for animation, **lucide-react** for icons
- Deployed on **Vercel** (`vercel.json` SPA rewrites)
- Many `package.json` deps (three, stripe, leaflet, quill, jspdf, …) are unused
  scaffold leftovers from the base44 generator — do not assume they are wired up

## Commands

| Task | Command |
| --- | --- |
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Lint | `npm run lint` / `npm run lint:fix` |
| Typecheck | `npm run typecheck` |
| Preview build | `npm run preview` |

## Use graft first — it saves tokens

This repo is indexed by **graft** (`graft/` — a local, git-ignored graph cache;
run `graft build` to (re)generate it). Before grepping or reading source files
to understand how something works, where code lives, what calls a symbol, or
what a change would break, query graft:

- `graft ask "<question>" --source` — locate + understand a flow (the default)
- `graft grep "<symbol>"` — every occurrence, ranked by coupling
- `graft skeleton <file>` — a file's API surface in ~200 tokens
- `graft callers <symbol> [--depth 2|all] [--direction out]` — exact edges / blast radius
- `graft map` — orientation for the whole repo
- `graft check` — fails if `graft/` is stale (rebuild with `graft build`)

The **graft MCP server** is also configured in `.mcp.json`
(`graft_find_code`, `graft_find_all`, `graft_file_api`, `graft_trace_calls`,
`graft_repo_map`, `graft_check_freshness`) — use whichever surface is available.

Rebuild the graph after pulling significant changes: `graft build` (free, no API key,
sub-second). The optional `--deep` LLM layer needs `GRAFT_API_KEY` + `GRAFT_MODEL`
and is not set up here.

## Media assets

- Static images: `public/images/`, referenced by semantic key in `src/lib/images.js` (`IMAGES`)
- Hero background videos: `public/videos/` (`VIDEOS` in the same file) — muted autoplay loops,
  `hero.mp4` is a 16s seamless forward+reverse dolly; `Hero.jsx` shows the `heroPoster` still
  instead when `prefers-reduced-motion` is set
- Source photography/footage lives in the Google Drive folder **"HOA Enhanced image"**.
  A read-only `gdrive` MCP server is configured at local scope (OAuth token in the
  git-ignored `.gdrive/`); it exposes `gdrive_search` / `gdrive_read_file` after a session restart.

## Conventions

- Path alias `@/` → `src/` (configured in `vite.config.js` and `jsconfig.json`)
- Static image paths are centralized in `src/lib/images.js`
- `src/components/ui/` is generated shadcn code — lint/typecheck exclude it; avoid hand-editing
- Match the surrounding luxury-theme styling (gold/onyx/velvet palette, Cinzel/Cormorant fonts)
