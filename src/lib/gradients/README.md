# Mesh gradients

Per-surface mesh gradients that morph in place on navigation and can pulse in
response to user actions. The rendering engine lives in
[`../mesh-gradient.js`](../mesh-gradient.js) (sourced from
[`drewglover/ffg-mesh`](https://github.com/drewglover/ffg-mesh)); this folder
holds the per-surface vertex configs, and [`../gradient/controller.js`](../gradient/controller.js)
owns the single live instance.

## 1. Create a JSON from the ffg-mesh tool

1. Open the [ffg-mesh](https://github.com/drewglover/ffg-mesh) tool and design
   your gradient.
2. Export. The tool emits **true JSON** — copy it as-is.
3. Save it here as `your-surface.json`.

The export is a vertex array the renderer consumes directly:

```json
[
  { "color": "#f7f5f1", "position": { "x": 0, "y": 0 }, "handles": { "e": {…}, "w": {…}, "n": {…}, "s": {…} }, "introFrom": {…}, "outroTo": {…} },
  …
]
```

> **Topology must match.** Every config in this folder must be a **4×4 grid (16
> vertices, row-major)**. The renderer morphs vertex-for-vertex by index, so all
> configs must share the same vertex count and order — otherwise morphing breaks.
> The simplest way to guarantee this is to start from an existing config (e.g.
> `dashboard.json`) in the tool and change only the colors/positions.

To re-import a surface, just replace its `.json` file with a fresh export.

## 2. Import the config

Register the new file in [`index.js`](index.js):

```js
import yourSurface from './your-surface.json';

export const GRADIENTS = { dashboard, partner, onboarding, onboardingActive, yourSurface };
```

If the gradient belongs to a **route**, map the path in `gradientForPath()`:

```js
export function gradientForPath(pathname = '') {
  if (pathname.startsWith('/partner')) return GRADIENTS.partner;
  if (pathname.startsWith('/onboarding')) return GRADIENTS.onboarding;
  if (pathname.startsWith('/your-surface')) return GRADIENTS.yourSurface;
  return GRADIENTS[DEFAULT_GRADIENT];
}
```

Unmapped routes fall back to the `dashboard` gradient.

## 3. Make it morph

There are two ways to morph, both via the controller.

**On navigation (automatic).** Any route mapped in `gradientForPath()` morphs
automatically. `GradientRouteSync.jsx` (wrapping the root route) calls
`setSurface(pathname)` on every navigation, which morphs to the matching config
if it differs from the current one. No extra wiring needed once the route is
mapped.

**On an in-surface action (manual).** To morph without navigating — e.g. a
button that changes the mood of the current screen — call `morphToGradient`
with a `GRADIENTS` key:

```js
import { morphToGradient } from '@/lib/gradient/controller';

// morphToGradient(name, duration = 2400)
morphToGradient('yourSurface');        // default 2400ms
morphToGradient('yourSurface', 1800);  // custom duration
```

This is how onboarding's "Let's get started" handler swaps `onboarding` →
`onboardingActive` (a non-route config) in place.

## 4. Link a pulse to an action

A pulse is a one-shot flourish over the current gradient. Any module can fire it
by calling `pulse()` from the controller — wire it into the handler for the
action you want to celebrate:

```js
import { pulse } from '@/lib/gradient/controller';

function handleCommit() {
  // …your action logic…
  pulse(); // e.g. fired when a donor commits a higher annual amount
}
```

`pulse()` and `morphToGradient()` are both no-ops until the gradient has been
initialised (`MeshBackground.jsx` calls `initGradient` on mount), so they're
safe to call from anywhere.
