# Factory for Good

A faithful implementation of the Factory for Good design prototypes
(exported from Claude Design) as a real Vite + React app. Three surfaces,
wired together with routing:

| Route          | Surface     | What it is |
|----------------|-------------|------------|
| `/dashboard`   | Dashboard   | The "control room": hero, transfer status, impact chart, allocation treemap, updates. A floating Tweaks panel switches the donation-status phase (preview / in-progress / allocated). |
| `/onboarding`  | Onboarding  | Landing → 6-step questionnaire → submitted. A single-file state machine. |
| `/partner`     | Partner     | Org directory (sort / filter / paginate) and individual partner detail (KPIs, accordions, intervention charts). |

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
- `src/lib/mesh-gradient.js` — the WebGL Coons-patch mesh background renderer; `MeshBackground.jsx` mounts it once at the app root.
- `public/styles.css` — the design system's single stylesheet (CSS-variable tokens, PP Fragment fonts).
- `public/assets/` — fonts, logo, avatar.

The prototype's design medium was HTML/CSS/JS. The component JSX was ported into
ES modules and recomposed; `public/styles.css` and the mesh gradient are carried
over verbatim so the visual output matches the source pixel-for-pixel.
