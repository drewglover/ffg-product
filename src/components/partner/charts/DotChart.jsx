import React from 'react';

// Scatter dot chart — People Reached (log scale) × Depth of Impact (linear 0–10)
// Plot area spans 100% width to match the Point of Intervention slider above it.
// Y-axis labels are HTML outside the SVG; only tick numbers sit just inside the plot edge.
function DotChart({ peopleReached = 120, depth = 1.8 }) {
  const W = 700;
  const H = 300;
  const padLeft = 72;
  const padRight = 0;
  const padTop = 8;
  const padBottom = 36;
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
    <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        aria-label="Depth of Intervention scatter chart">

        {/* Y axis labels — rotated, centered within left padding band */}
        <g transform={`translate(${padLeft / 2}, ${padTop + plotH / 2}) rotate(-90)`}>
          <text x={0} y={0} textAnchor="middle" fill="#9A938A"
            style={{ ...tf, fontSize: '10px' }}>
            Intensity of impact per person
          </text>
          <text x={0} y={-22} textAnchor="middle" fill="#1A1A18"
            style={{ ...tf, fontSize: '13px', fontWeight: 500 }}>
            Depth
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

        {/* Y tick labels — just inside plot left edge */}
        {yTicks.map((v) => (
          <text key={`yl-${v}`}
            x={padLeft + 6} y={yFor(v) - 4}
            textAnchor="start"
            fill="#9A938A"
            style={{ ...tf, fontSize: '11px' }}>
            {v}
          </text>
        ))}

        {/* X tick labels */}
        {xTicks.map((v, i) => (
          <text key={`xl-${i}`}
            x={xFor(v)} y={padTop + plotH + 16}
            textAnchor="middle"
            fill="#9A938A"
            style={{ ...tf, fontSize: '11px' }}>
            {xLabels[i]}
          </text>
        ))}

        {/* X axis title */}
        <text
          x={padLeft + plotW / 2} y={H - 2}
          textAnchor="middle"
          fill="#1A1A18"
          style={{ ...tf, fontSize: '13px', fontWeight: 500 }}>
          People Reached
        </text>

        {/* Data point */}
        <circle
          cx={dotX} cy={dotY} r={7}
          fill="var(--ffg-surface-50)"
          stroke="#4A4744" strokeWidth="1.5" />
    </svg>
  );
}

export { DotChart };
