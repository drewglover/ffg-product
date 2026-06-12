// Per-surface mesh gradient configs. Each file is a vertex array exported from
// the ffg-mesh tool (https://github.com/drewglover/ffg-mesh) — same schema the
// renderer consumes: { color, position, handles{e,w,n,s}, introFrom, outroTo }.
//
// Re-importing a surface's gradient = replace its JSON file with a fresh export.
// All configs MUST share the same topology (4×4 grid / 16 vertices, row-major)
// so the renderer can morph between them vertex-for-vertex on navigation.
import dashboard from './dashboard.json';
import partner from './partner.json';
import onboarding from './onboarding.json';
import onboardingActive from './onboarding-active.json';

// `onboardingActive` is not a route surface — it's the morph target the
// onboarding flow swaps to when the user clicks "Let's get started".
export const GRADIENTS = { dashboard, partner, onboarding, onboardingActive };

export const DEFAULT_GRADIENT = 'dashboard';

// Map a route pathname to its gradient config. Unmapped routes fall back to the
// dashboard gradient.
export function gradientForPath(pathname = '') {
  if (pathname.startsWith('/partner')) return GRADIENTS.partner;
  if (pathname.startsWith('/onboarding')) return GRADIENTS.onboarding;
  return GRADIENTS[DEFAULT_GRADIENT];
}
