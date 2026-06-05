import { LOGO_PALETTES } from '../data/logoPalettes';

function LogoPlaceholder({ size = 50, name = "" }) {
  // 10 palettes × 6 marks = 60 stable combinations, picked by name hash.
  let h = 0;
  for (let i = 0; i < name.length; i++) h = h * 31 + name.charCodeAt(i) >>> 0;
  const palette = LOGO_PALETTES[h % LOGO_PALETTES.length];
  const mark = Math.floor(h / LOGO_PALETTES.length) % 6;
  const { bg, fg } = palette;

  // Abstract icon marks — only primitive shapes (circle, square, semicircle,
  // triangle, ring, diamond). Reads as a real org icon mark, no copyrighted
  // imagery, no hand-drawn figuration.
  const marks = [
  // 0 — two stacked semicircles (waves / hands / pages)
  () =>
  <g>
        <path d="M11 21 a14 14 0 0 1 28 0 z" fill={fg} />
        <path d="M11 39 a14 14 0 0 1 28 0 z" fill={fg} opacity="0.45" transform="translate(0 -10)" />
      </g>,

  // 1 — thick ring (community, cycle)
  () =>
  <g>
        <circle cx="25" cy="25" r="13" fill="none" stroke={fg} strokeWidth="5" />
      </g>,

  // 2 — circle inside square (centered figure)
  () =>
  <g>
        <rect x="12" y="12" width="26" height="26" fill="none" stroke={fg} strokeWidth="2" />
        <circle cx="25" cy="25" r="6.5" fill={fg} />
      </g>,

  // 3 — diamond / rotated square (north star, foundation)
  () =>
  <g transform="translate(25 25) rotate(45)">
        <rect x="-10" y="-10" width="20" height="20" fill={fg} />
        <rect x="-3.5" y="-3.5" width="7" height="7" fill={bg} />
      </g>,

  // 4 — plus / cross (care, health, gather)
  () =>
  <g>
        <rect x="22" y="11" width="6" height="28" fill={fg} />
        <rect x="11" y="22" width="28" height="6" fill={fg} />
      </g>,

  // 5 — three stacked bars (build, system, levels)
  () =>
  <g>
        <rect x="12" y="14" width="26" height="4" fill={fg} />
        <rect x="12" y="23" width="26" height="4" fill={fg} opacity="0.7" />
        <rect x="12" y="32" width="26" height="4" fill={fg} opacity="0.45" />
      </g>];



  return (
    <svg
      className="pt-logo"
      width={size}
      height={size}
      viewBox="0 0 50 50"
      role="img"
      aria-label={`${name || "Organization"} logo placeholder`}
      style={{ fontFamily: "inherit" }}>

      <rect width="50" height="50" rx="8" fill={bg} style={{ fill: "rgba(250, 248, 245, 0)" }} />
      {marks[mark]()}
      {/* Subtle hairline so the white tile reads against the cream card bg. */}
      <rect x="0.5" y="0.5" width="49" height="49" rx="7.5" fill="none" stroke="#E9E7E4" strokeWidth="1" />
    </svg>);

}


export { LogoPlaceholder };
