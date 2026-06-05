import { ORG_LOGO_PALETTES } from '../data/orgTaxonomy';

function OrgLogoPlaceholder({ size = 44, name = "" }) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = h * 31 + name.charCodeAt(i) >>> 0;
  const palette = ORG_LOGO_PALETTES[h % ORG_LOGO_PALETTES.length];
  const mark = Math.floor(h / ORG_LOGO_PALETTES.length) % 6;
  const { bg, fg } = palette;
  const marks = [
  () => <g><path d="M11 21 a14 14 0 0 1 28 0 z" fill={fg} /><path d="M11 39 a14 14 0 0 1 28 0 z" fill={fg} opacity="0.45" transform="translate(0 -10)" /></g>,
  () => <g><circle cx="25" cy="25" r="13" fill="none" stroke={fg} strokeWidth="5" /></g>,
  () => <g><rect x="12" y="12" width="26" height="26" fill="none" stroke={fg} strokeWidth="2" /><circle cx="25" cy="25" r="6.5" fill={fg} /></g>,
  () => <g transform="translate(25 25) rotate(45)"><rect x="-10" y="-10" width="20" height="20" fill={fg} /><rect x="-3.5" y="-3.5" width="7" height="7" fill={bg} /></g>,
  () => <g><rect x="22" y="11" width="6" height="28" fill={fg} /><rect x="11" y="22" width="28" height="6" fill={fg} /></g>,
  () => <g><rect x="12" y="14" width="26" height="4" fill={fg} /><rect x="12" y="23" width="26" height="4" fill={fg} opacity="0.7" /><rect x="12" y="32" width="26" height="4" fill={fg} opacity="0.45" /></g>];

  return (
    <svg width={size} height={size} viewBox="0 0 50 50" aria-hidden="true" style={{ display: "block", flexShrink: 0, borderRadius: "var(--radius)" }}>
      <rect width="50" height="50" rx="8" fill={bg} style={{ fill: "rgba(250, 248, 245, 0)" }} />
      {marks[mark]()}
      <rect x="0.5" y="0.5" width="49" height="49" rx="7.5" fill="none" stroke="#E9E7E4" strokeWidth="1" />
    </svg>);

}


export { OrgLogoPlaceholder };
