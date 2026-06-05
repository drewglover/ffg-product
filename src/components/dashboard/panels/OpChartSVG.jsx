import React from 'react';

const OP_CHART_DATA = [
{ month: "Oct", org: 42, avg: 38 },
{ month: "Nov", org: 58, avg: 45 },
{ month: "Dec", org: 51, avg: 48 },
{ month: "Jan", org: 65, avg: 52 },
{ month: "Feb", org: 72, avg: 55 },
{ month: "Mar", org: 68, avg: 58 }];


function OpChartSVG({ height = 140 }) {
  const data = OP_CHART_DATA;
  const w = 400,h = height;
  const padTop = 8,padBottom = 18,padX = 10;
  const plotH = h - padTop - padBottom;
  const plotW = w - padX * 2;
  const maxVal = Math.max(...data.flatMap((d) => [d.org, d.avg])) * 1.15;
  const yFor = (v) => padTop + plotH * (1 - v / maxVal);
  const xFor = (i) => padX + i / (data.length - 1) * plotW;
  const barW = Math.min(18, plotW / data.length * 0.55);
  const linePoints = data.map((d, i) => ({ x: xFor(i), y: yFor(d.org) }));
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
  const uid = React.useMemo(() => "op-chart-" + Math.random().toString(36).slice(2, 9), []);
  return (
    <svg className="pt-chart__svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height, width: "100%" }}>
      <defs>
        <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6F9DCB" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#B6D2E8" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id={`${uid}-stroke`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#15315A" stopOpacity="0" />
          <stop offset="40%" stopColor="#6F9DCB" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#15315A" stopOpacity="1" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((t) =>
      <line key={t} x1={padX} x2={w - padX} y1={padTop + plotH * t + 0.5} y2={padTop + plotH * t + 0.5} stroke="#C5C2BD" strokeWidth="1" opacity={t === 1 ? 0 : 1} />
      )}
      {data.map((d, i) => {
        const x = xFor(i) - barW / 2;
        const y = yFor(d.avg);
        const bH = baselineY - y;
        const r = 3;
        return (
          <path key={`bar-${i}`}
          d={`M ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} L ${x + barW - r} ${y} Q ${x + barW} ${y} ${x + barW} ${y + r} L ${x + barW} ${y + bH} L ${x} ${y + bH} Z`}
          fill="#EAE8E3" stroke="#92908B" strokeWidth="1" />);

      })}
      <path d={areaPath} fill={`url(#${uid}-fill)`} />
      <path d={smoothPath} fill="none" stroke={`url(#${uid}-stroke)`} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <line x1={padX} x2={w - padX} y1={baselineY + 0.5} y2={baselineY + 0.5} stroke="#141413" strokeWidth="1" />
      {data.map((d, i) =>
      <text key={`lbl-${i}`} x={xFor(i)} y={baselineY + 12} textAnchor="middle" fill="#9A938A" style={{ fontSize: "9px", letterSpacing: "0.02em" }}>{d.month}</text>
      )}
    </svg>);

}


export { OP_CHART_DATA, OpChartSVG };
