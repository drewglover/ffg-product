import React from 'react';
import { Bar, Area } from 'recharts';
import { INTERVENTION_DATA } from '../data/interventionData';

// Cohesive with dashboard ImpactChart:
//   - Light cream bars (#EAE8E3) with grey outline (#92908B), rounded top corners
//   - Multi-stop blue gradient line + vertical gradient area fill
//   - Horizontal grid only, monotone smooth curve
function ChartSVG({ height = 120 }) {
  const w = 313,h = height;
  // Layout: leave room for axis tick labels at the bottom.
  const padTop = 8;
  const padBottom = 18;
  const padX = 10;
  const plotH = h - padTop - padBottom;
  const plotW = w - padX * 2;

  // Scale: max across both series, with a small headroom.
  const maxVal = Math.max(...INTERVENTION_DATA.flatMap((d) => [d.org, d.avg])) * 1.15;
  const yFor = (v) => padTop + plotH * (1 - v / maxVal);
  const xFor = (i) => padX + i / (INTERVENTION_DATA.length - 1) * plotW;

  // Bar width — proportional to spacing, like Recharts barSize on a wide chart.
  const barW = Math.min(18, plotW / INTERVENTION_DATA.length * 0.55);

  // Smooth monotone path for the line (cardinal-style).
  const linePoints = INTERVENTION_DATA.map((d, i) => ({ x: xFor(i), y: yFor(d.org) }));
  const smoothPath = (() => {
    if (linePoints.length < 2) return "";
    let d = `M ${linePoints[0].x} ${linePoints[0].y}`;
    for (let i = 0; i < linePoints.length - 1; i++) {
      const p0 = linePoints[i - 1] || linePoints[i];
      const p1 = linePoints[i];
      const p2 = linePoints[i + 1];
      const p3 = linePoints[i + 2] || p2;
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  })();
  const baselineY = padTop + plotH;
  const areaPath = smoothPath +
  ` L ${linePoints[linePoints.length - 1].x} ${baselineY}` +
  ` L ${linePoints[0].x} ${baselineY} Z`;

  // Unique gradient ids per render to avoid collisions when multiple charts share a page.
  const uid = React.useMemo(() => "pt-chart-" + Math.random().toString(36).slice(2, 9), []);

  return (
    <svg
      className="pt-chart__svg"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      style={{ height, width: "100%" }}>

      <defs>
        {/* Vertical area fill — mid blue at top, fade to nothing at bottom */}
        <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6F9DCB" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#B6D2E8" stopOpacity="0.05" />
        </linearGradient>
        {/* Horizontal line stroke gradient — fades in from left, deepens to navy on right */}
        <linearGradient id={`${uid}-stroke`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#15315A" stopOpacity="0" />
          <stop offset="40%" stopColor="#6F9DCB" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#15315A" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Horizontal grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) =>
      <line
        key={t}
        x1={padX} x2={w - padX}
        y1={padTop + plotH * t + 0.5}
        y2={padTop + plotH * t + 0.5}
        stroke="#C5C2BD"
        strokeWidth="1"
        opacity={t === 1 ? 0 : 1} />

      )}

      {/* Bars: light cream fill, grey outline, rounded top corners */}
      {INTERVENTION_DATA.map((d, i) => {
        const x = xFor(i) - barW / 2;
        const y = yFor(d.avg);
        const barH = baselineY - y;
        const r = 3;
        return (
          <path
            key={`bar-${i}`}
            d={`M ${x} ${y + r}
                Q ${x} ${y} ${x + r} ${y}
                L ${x + barW - r} ${y}
                Q ${x + barW} ${y} ${x + barW} ${y + r}
                L ${x + barW} ${y + barH}
                L ${x} ${y + barH} Z`}
            fill="#EAE8E3"
            stroke="#92908B"
            strokeWidth="1" />);


      })}

      {/* Area fill under line */}
      <path d={areaPath} fill={`url(#${uid}-fill)`} />

      {/* Gradient stroke on top */}
      <path
        d={smoothPath}
        fill="none"
        stroke={`url(#${uid}-stroke)`}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round" />


      {/* X-axis baseline */}
      <line
        x1={padX} x2={w - padX}
        y1={baselineY + 0.5}
        y2={baselineY + 0.5}
        stroke="#141413"
        strokeWidth="1" />


      {/* X-axis month labels */}
      {INTERVENTION_DATA.map((d, i) =>
      <text
        key={`lbl-${i}`}
        x={xFor(i)}
        y={baselineY + 12}
        textAnchor="middle"
        fill="#9A938A"
        style={{ fontSize: "9px", fontFamily: "PP Fragment Sans", letterSpacing: "0.02em" }}>

          {d.month}
        </text>
      )}
    </svg>);

}


export { ChartSVG };
