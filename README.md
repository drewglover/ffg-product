# Factory for Good

A faithful implementation of the Factory for Good design prototypes
(exported from Claude Design) as a real Vite + React app. Three surfaces,
wired together with routing:

| Route          | Surface     | What it is |
|----------------|-------------|------------|
| `/dashboard`   | Dashboard   | The "control room": hero, transfer status, impact chart, allocation treemap, updates. A floating Tweaks panel switches the donation-status phase (preview / in-progress / allocated). |
| `/onboarding`  | Onboarding  | Landing → 6-step questionnaire → submitted. A single-file state machine. |
| `/partner`     | Partner     | Org directory (sort / filter / paginate) and individual partner detail (KPIs, accordions, intervention charts). |
| `/shadcn-demo` | shadcn      | Living gallery + verification surface for the themed shadcn instance (`@/components/ui/*`). |

`/` redirects to `/dashboard`.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

## Structure

- `src/surfaces/` — the three top-level surface shells (`Dashboard`, `Onboarding`, `Partner`).
- `src/components/{dashboard,onboarding,partner,shared}/` — ported components, grouped by surface (icons, data, atoms, panels, sections, …).
- `src/topnav-auth.jsx`, `src/tweaks-panel.jsx` — shared chrome.
- `src/lib/mesh-gradient.js` — the WebGL Coons-patch mesh background renderer; `MeshBackground.jsx` mounts it once at the app root. See [src/lib/gradients/README.md](src/lib/gradients/README.md) for how to import a gradient, set it to morph, and link a pulse to an action.
- `public/styles.css` — the design system's single stylesheet (CSS-variable tokens, PP Fragment fonts).
- `public/assets/` — fonts, logo, avatar.

The prototype's design medium was HTML/CSS/JS. The component JSX was ported into
ES modules and recomposed; `public/styles.css` and the mesh gradient are carried
over verbatim so the visual output matches the source pixel-for-pixel.

## shadcn components

This repo carries a themed [shadcn](https://ui.shadcn.com) instance that mirrors the
separately-maintained component library
[Niftic-Agency/ffg-components](https://github.com/Niftic-Agency/ffg-components)
(its `base-nova` / Base UI style, FFG theme tokens, and PP Fragment fonts).

- `components.json` — shadcn config. The `@ffg` registry namespace points at
  `https://factory-for-goodcomponents.vercel.app/r/{name}.json`. Once the library
  exposes that endpoint, `npx shadcn@latest add @ffg/<name>` works directly.
- `src/index.css` — Tailwind v4 + the FFG theme tokens. **Generated** from the
  library's `app/globals.css` by `npm run ui:import -- --theme`; don't hand-edit.
  Imported once in `src/main.jsx`. Tailwind's global *preflight* reset is
  intentionally omitted so it coexists with `public/styles.css` without
  regressing the existing surfaces.
- `src/components/ui/*` — vendored themed components (`.tsx`, compiled by Vite/esbuild).
- `src/lib/utils.js` — `cn()` helper.

### Importing components (stopgap)

Until the library ships its `/r` registry, the library's public `manifest.json` is a
Brand-OS catalogue only — its `code` field is a usage demo, not component source — so
the shadcn CLI can't consume it. The bridge script pulls real source from the library's
GitHub repo (requires the `gh` CLI authenticated with read access):

```bash
npm run ui:import -- --list          # browse the catalogue (59 components)
npm run ui:import -- button badge    # import specific components + internal deps
npm run ui:import -- --all           # import everything
npm run ui:import -- --theme         # re-sync src/index.css from the library theme
```

Component imports write to `src/components/ui/` and print any external npm packages
to install. `--theme` regenerates `src/index.css` from the library's `app/globals.css`
(applying the no-preflight / no-global-base departures and wiring the local fonts).
