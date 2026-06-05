import { CAUSE_BY_ID } from '../data/causeAreas';
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

  return (
    <div className="ob-bubbles" aria-hidden="true">
      <svg viewBox="0 0 320 320">
        {deco.map((d, i) =>
        <circle key={`d${i}`} cx={d.cx} cy={d.cy} r={d.r} fill="none" stroke="var(--ffg-surface-950)" strokeWidth="1" />
        )}
        {top3.map((id, i) => {
          const c = CAUSE_BY_ID[id];
          const p = positions[i];
          // Stroke color comes from the shared CATEGORY_ICONS map — same
          // accent used by the dashboard's Cause Allocation treemap. Falls
          // back to the neutral hairline if the cause isn't in the map.
          const cat = CATEGORY_ICONS[c.name];
          const stroke = cat ? cat.color : "var(--ffg-surface-950)";
          return (
            <g key={id}>
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
