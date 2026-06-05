
/* ====== Organizations list (Your impact areas tab) ====== */
const STRATEGIES = ["Angel", "SPV", "Fund", "Granted", "Pooled"];
const IMPACT_AREAS = [
"Community", "Culture", "Economic Growth", "Education",
"Environment", "Health", "Humanitarian", "Social Justice"];


// Lucide icon SVGs keyed by impact area — mirrors CATEGORY_ICONS in partner.jsx.
// CSS classes (.impact-badge--*) in styles.css carry the accent color.
const IMPACT_AREA_ICONS = {
  "Social Justice":
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 2-4 4-4-4" /><path d="M12 2v14" /><path d="M5 21h14" />
      <path d="M4 6a4 4 0 0 0 8 0" /><path d="M12 6a4 4 0 0 0 8 0" />
    </svg>,

  "Economic Growth":
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" /><path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>,

  "Humanitarian":
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
      <path d="m18 15-2-2" /><path d="m15 18-2-2" />
    </svg>,

  "Environment":
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" /><path d="M12 20v-6" />
      <path d="M12 14c0-4 4-6 8-6 0 4-2 8-8 8Z" />
      <path d="M12 14c0-3-3-5-7-5 0 3 2 6 7 6Z" />
    </svg>,

  "Community":
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <circle cx="17.5" cy="17.5" r="3.5" />
    </svg>,

  "Health":
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    </svg>,

  "Education":
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>,

  "Culture":
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
      <path d="m15 5 4 4" /><path d="M12 21h9" />
    </svg>

};

// ── Logo placeholder for org rows (mirrors partner.jsx LogoPlaceholder) ───
const ORG_LOGO_PALETTES = [
{ bg: "#FFFFFF", fg: "#1F6FB0" }, // civic blue
{ bg: "#FFFFFF", fg: "#0E8A77" }, // teal
{ bg: "#FFFFFF", fg: "#2E6B3E" }, // forest
{ bg: "#FFFFFF", fg: "#B6532C" }, // terracotta
{ bg: "#FFFFFF", fg: "#9A7A1F" }, // ochre
{ bg: "#FFFFFF", fg: "#7A3A6E" }, // plum
{ bg: "#FFFFFF", fg: "#1B1B1A" }, // ink
{ bg: "#FFFFFF", fg: "#A12C2C" }, // brick
{ bg: "#FFFFFF", fg: "#3D4F8B" }, // dusk
{ bg: "#FFFFFF", fg: "#6B5A2E" } // bronze
];


export { STRATEGIES, IMPACT_AREAS, IMPACT_AREA_ICONS, ORG_LOGO_PALETTES };
