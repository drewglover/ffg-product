import { ComposedChart, Bar, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

/* ====== Impact chart ====== */
/* ====== Custom chart tooltip ====== */
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const dollarsItem = payload.find((p) => p.dataKey === "dollars");
  const outcomesItem = payload.find((p) => p.dataKey === "outcomes");
  const dollars = dollarsItem ? dollarsItem.value : 0;
  const outcomes = outcomesItem ? outcomesItem.value : 0;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip__month">{label}</div>
      <div className="chart-tooltip__row">
        <span className="chart-tooltip__swatch chart-tooltip__swatch--bar" />
        <span className="chart-tooltip__label">Dollars given</span>
        <span className="chart-tooltip__value">${dollars.toLocaleString()}</span>
      </div>
      <div className="chart-tooltip__row">
        <span className="chart-tooltip__swatch chart-tooltip__swatch--area" />
        <span className="chart-tooltip__label">Outcomes</span>
        <span className="chart-tooltip__value">{outcomes.toLocaleString()}</span>
      </div>
    </div>);

}

function ImpactChart({ accent = ["#15315A", "#6F9DCB", "#B6D2E8"], data, scale = 1, mode = "actual" }) {
  const [dark, mid, light] = accent;
  const scaled = data.map((d) => ({
    m: d.m,
    dollars: d.dollars * scale,
    outcomes: d.outcomes * scale
  }));
  // For "projected" the outcomes line trends slightly higher than actual.
  const projMul = mode === "projected" ? 1.25 : 1;
  // Custom dollar bar shape: cream rounded-top columns
  const Tick = ({ x, y, payload, anchor }) =>
  <text x={x} y={y} dy={12} textAnchor={anchor || "middle"} className="recharts-cartesian-axis-tick-value">
      {payload.value}
    </text>;


  return (
    <div className="chart-wrap" style={{ height: "390px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={scaled} margin={{ top: 16, right: 36, bottom: 8, left: 4 }}>
          <defs>
            <linearGradient id="ffg-area" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={light} stopOpacity={0.05} />
              <stop offset="55%" stopColor={mid} stopOpacity={0.45} />
              <stop offset="100%" stopColor={dark} stopOpacity={0.85} />
            </linearGradient>
            <linearGradient id="ffg-area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={mid} stopOpacity={0.55} />
              <stop offset="100%" stopColor={light} stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="ffg-area-stroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={dark} stopOpacity={0.0} />
              <stop offset="40%" stopColor={mid} stopOpacity={0.7} />
              <stop offset="100%" stopColor={dark} stopOpacity={1} />
            </linearGradient>
          </defs>

          <CartesianGrid
            yAxisId="left"
            horizontal={true}
            vertical={false}
            stroke="#C5C2BD"
            strokeDasharray="0" />


          <XAxis
            dataKey="m"
            axisLine={{ stroke: "#141413", strokeWidth: 1 }}
            tickLine={false}
            tick={{ fill: "#9A938A", fontSize: 11, letterSpacing: "0.02em" }}
            padding={{ left: 8, right: 8 }} />


          <YAxis
            yAxisId="left"
            dataKey="dollars"
            axisLine={false}
            tickLine={false}
            width={56}
            tickFormatter={(v) => {
              if (v === 0) return "$0";
              if (v >= 1000000) return "$" + (v / 1000000).toFixed(1) + "m";
              return "$" + Math.round(v / 1000) + "k";
            }}
            tick={{ fill: "#9A938A", fontSize: 11 }} />


          <YAxis
            yAxisId="right"
            dataKey={(d) => Math.max(d.outcomes, d.outcomes * projMul)}
            orientation="right"
            axisLine={false}
            tickLine={false}
            width={42}
            tickFormatter={(v) => v >= 1000 ? (v / 1000).toFixed(0) + "k" : v}
            tick={{ fill: "#9A938A", fontSize: 11 }} />


          <Tooltip
            cursor={{ fill: "rgba(27,27,26,0.04)" }}
            content={<ChartTooltip />}
            wrapperStyle={{ outline: "none" }} />


          <Bar
            yAxisId="left"
            dataKey="dollars"
            barSize={26}
            radius={[4, 4, 0, 0]} /* keep in sync with --radius in styles.css */
            fill="#EAE8E3"
            stroke="#92908B"
            strokeWidth={1}
            isAnimationActive={true}
            animationDuration={900} />


          <Area
            yAxisId="right"
            type="monotone"
            dataKey="outcomes"
            stroke="url(#ffg-area-stroke)"
            strokeWidth={1.75}
            fill="url(#ffg-area-fill)"
            isAnimationActive={true}
            animationDuration={1200}
            animationBegin={300}
            strokeDasharray={mode === "projected" ? "4 4" : "0"} />

        </ComposedChart>
      </ResponsiveContainer>
    </div>);

}


export { ChartTooltip, ImpactChart };
