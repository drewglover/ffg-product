
// Monogram placeholder logos. One of 6 visual treatments, picked deterministically
// from the org name so directory & detail views stay in sync.
const initialsFor = (name) => {
  const words = name.
  split(/\s+/).
  filter((w) => !/^(the|of|and|for|&)$/i.test(w));
  return (words[0]?.[0] || "") + (words[1]?.[0] || words[0]?.[1] || "");
};

const variantFor = (name) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = h * 31 + name.charCodeAt(i) >>> 0;
  return h % 6;
};

// Brand-style palette for nonprofit-feeling logo placeholders.
// All tiles share a white background so the directory grid reads as a uniform
// set; only the mark itself carries color. Curated, muted-but-saturated tones —
// each org gets one deterministically by name hash.
const LOGO_PALETTES = [
{ bg: "#FFFFFF", fg: "#1F6FB0" }, // civic blue
{ bg: "#FFFFFF", fg: "#0E8A77" }, // teal
{ bg: "#FFFFFF", fg: "#2E6B3E" }, // forest
{ bg: "#FFFFFF", fg: "#B6532C" }, // terracotta
{ bg: "#FFFFFF", fg: "#9A7A1F" }, // ochre (darkened for contrast on white)
{ bg: "#FFFFFF", fg: "#7A3A6E" }, // plum
{ bg: "#FFFFFF", fg: "#1B1B1A" }, // ink
{ bg: "#FFFFFF", fg: "#A12C2C" }, // brick
{ bg: "#FFFFFF", fg: "#3D4F8B" }, // dusk
{ bg: "#FFFFFF", fg: "#6B5A2E" } // bronze (replacing sand — needed contrast on white)
];


export { initialsFor, variantFor, LOGO_PALETTES };
