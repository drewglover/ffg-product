import React from 'react';
import { PIcon } from '../icons/PIcon';

// Scatter dot chart — People Reached (log scale) × Depth of Impact (linear 0–10)
// Plot area spans 100% width to match the Point of Intervention slider above it.
// Y-axis labels are HTML outside the SVG; only tick numbers sit just inside the plot edge.
function DotChart({ peopleReached = 120, depth = 1.8 }) {
  const W = 700;
  const H = 300;
  const padLeft = 64;
  const padRight = 20;  // prevent right-edge clipping
  const padTop = 16;    // prevent top-edge clipping
  const padBottom = 56; // tick labels + 24px gap + "People Reached"
  const plotW = W - padLeft - padRight;
  const plotH = H - padTop - padBottom;

  // X axis — log scale: 10 → 1B (9 decades)
  const xTicks  = [10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9];
  const xLabels = ['10', '100', '1K', '10K', '100K', '1M', '10M', '100M', '1B'];
  const logMin  = Math.log10(10);
  const logMax  = Math.log10(1e9);
  const xFor    = (v) => padLeft + (Math.log10(v) - logMin) / (logMax - logMin) * plotW;

  // Y axis — linear 0–10
  const yTicks = [0, 2, 4, 6, 8, 10];
  const yFor   = (v) => padTop + plotH * (1 - v / 10);

  const dotX = xFor(peopleReached);
  const dotY = yFor(depth);

  const tf = { fontFamily: 'PP Fragment Sans, sans-serif' };

  return (
    <div>
      <div className="pt-label-row">
        <span className="pt-label">Intervention Impact</span>
        <PIcon.Info className="pt-info" />
      </div>
      <p className="pt-sub" style={{ fontSize: '14px' }}>
        This shows the overall intensity of the intervention measuring the reach and impact per person
      </p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto', display: 'block', marginTop: '18px' }}
        aria-label="Depth of Intervention scatter chart">

        {/* Y axis labels — rotated, right edge sits 16px left of plot */}
        <g transform={`translate(8, ${padTop + plotH / 2}) rotate(-90)`}>
          <text x={0} y={7} textAnchor="middle" fill="#1A1A18"
            style={{ ...tf, fontSize: '13px', fontWeight: 500 }}>
            Depth
          </text>
          <text x={0} y={26} textAnchor="middle" fill="#9A938A"
            style={{ ...tf, fontSize: '10px' }}>
            Intensity of impact per person
          </text>
        </g>

        {/* Vertical grid lines */}
        {xTicks.map((v, i) => (
          <line key={`vg-${i}`}
            x1={xFor(v)} x2={xFor(v)}
            y1={padTop} y2={padTop + plotH}
            stroke="#C8C5BF" strokeWidth="1" />
        ))}

        {/* Horizontal grid lines */}
        {yTicks.map((v) => (
          <line key={`hg-${v}`}
            x1={padLeft} x2={padLeft + plotW}
            y1={yFor(v)} y2={yFor(v)}
            stroke="#C8C5BF" strokeWidth="1" />
        ))}

        {/* Y tick labels — just outside plot left edge */}
        {yTicks.map((v) => (
          <text key={`yl-${v}`}
            x={padLeft - 6} y={yFor(v) + 4}
            textAnchor="end"
            fill="#9A938A"
            style={{ ...tf, fontSize: '11px' }}>
            {v}
          </text>
        ))}

        {/* X tick labels — below plot bottom */}
        {xTicks.map((v, i) => (
          <text key={`xl-${i}`}
            x={xFor(v)} y={padTop + plotH + 16}
            textAnchor="middle"
            fill="#9A938A"
            style={{ ...tf, fontSize: '11px' }}>
            {xLabels[i]}
          </text>
        ))}

        {/* X axis title — 16px below tick labels */}
        <text
          x={padLeft + plotW / 2} y={padTop + plotH + 16 + 24}
          textAnchor="middle"
          fill="#1A1A18"
          style={{ ...tf, fontSize: '13px', fontWeight: 500 }}>
          People Reached
        </text>

        {/* Data point */}
        <circle
          cx={dotX} cy={dotY}
          fill="#1A1A18" r={6} />
    </svg>
    </div>
  );
}

export { DotChart };
