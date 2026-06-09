import { CAUSE_BY_ID, CAUSE_AREAS } from '../data/causeAreas';
import { CATEGORY_ICONS } from '../../partner/data/categoryIcons';

/* ── Step 6: review profile ──────────────────────────── */
function FocusBubbles({ top3 }) {
  // Tangent composition — every adjacent pair touches at a single point with
  // no overlap. Coordinates chosen so |cA − cB| = rA + rB for each
  // tangent pair. Geometry follows the reference mockup (big circle
  // center, ranked bubble upper-left, ranked bubble lower-right, three
  // decorative small bubbles in the gaps).
  const positions = [
  { cx: 170, cy: 145, r: 70 }, // rank 0 — biggest
  { cx: 78, cy: 72, r: 48 }, // rank 1 — upper-left, tangent to rank 0
  { cx: 242, cy: 254, r: 60 } // rank 2 — lower-right, tangent to rank 0
  ];
  // Deco bubbles each tangent to the big rank-0 circle; deco 3 is also
  // tangent to rank 2 so it nestles into the gap between big and rank 2.
  const deco = [
  { cx: 228, cy: 76, r: 20 }, // upper-right of big
  { cx: 106, cy: 209, r: 20 }, // lower-left of big
  { cx: 164, cy: 235, r: 20 } // between big and rank 2
  ];
  // Pick colors for deco bubbles from the cause areas not already in top 3
  const remaining = CAUSE_AREAS.filter((c) => !top3.includes(c.id));
  const decoColors = deco.map((_, i) => {
    const cause = remaining[i % remaining.length];
    const cat = cause ? CATEGORY_ICONS[cause.name] : null;
    return cat ? cat.color : "var(--ffg-surface-950)";
  });

  // Build gradient defs for every cause visible (top 3 + deco remaining)
  const visibleCauses = [
    ...top3.map((id) => CAUSE_BY_ID[id]),
    ...remaining.slice(0, deco.length),
  ];
  const gradientDefs = visibleCauses.map((cause) => {
    const cat = CATEGORY_ICONS[cause.name];
    if (!cat) return null;
    const id = `grad-${cause.name.toLowerCase().replace(/\s+/g, "-")}`;
    return (
      <linearGradient key={id} id={id} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={cat.color} />
        <stop offset="100%" stopColor={cat.colorEnd || cat.color} />
      </linearGradient>
    );
  }).filter(Boolean);

  const gradientId = (name) => `grad-${name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="ob-bubbles" aria-hidden="true">
      <svg viewBox="0 0 320 320">
        <defs>{gradientDefs}</defs>
        {deco.map((d, i) => {
          const cause = remaining[i % remaining.length];
          const stroke = cause ? `url(#${gradientId(cause.name)})` : "var(--ffg-surface-950)";
          // deco bubbles animate after the 3 labeled ones (indices 3,4,5)
          const delay = `${(i + top3.length) * 180}ms`;
          return <circle key={`d${i}`} cx={d.cx} cy={d.cy} r={d.r} fill="none" stroke={stroke} strokeWidth="1"
            style={{ animation: `ob-bubble-in 600ms ease both`, animationDelay: delay }} />;
        })}
        {top3.map((id, i) => {
          const c = CAUSE_BY_ID[id];
          const p = positions[i];
          const cat = CATEGORY_ICONS[c.name];
          const stroke = cat ? `url(#${gradientId(c.name)})` : "var(--ffg-surface-950)";
          const delay = `${i * 180}ms`;
          return (
            <g key={id} style={{ animation: `ob-bubble-in 600ms ease both`, animationDelay: delay }}>
              <circle cx={p.cx} cy={p.cy} r={p.r} fill="none" stroke={stroke} strokeWidth="1" />
              <text x={p.cx} y={p.cy + 4} textAnchor="middle">
                {c.name.split(" ").map((w, idx) =>
                <tspan key={idx} x={p.cx} dy={idx === 0 ? 0 : 14}>{w}</tspan>
                )}
              </text>
            </g>);
        })}
      </svg>
    </div>);

}


export { FocusBubbles };
