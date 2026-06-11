import { Treemap, ResponsiveContainer } from 'recharts';
import { CATEGORY_ICONS } from '../partner/data/categoryIcons';

/* ====== Canonical cause-allocation treemap ====== */
// Single source of truth shared by the partner page and the dashboard.
// Recharts lays the cells out proportionally (a 40% block is 8x a 5% block);
// the custom cell below keeps the FFG styling — hairline brand-colored border,
// 8px color dot, "%" + label. Colors come from CATEGORY_ICONS so the two pages
// can't drift; pass item.color to override.

// Pixels trimmed off each interior edge so adjacent cells read as separate
// blocks (4px between neighbours); outer edges sit flush to the card.
const GAP = 2;

function TreemapCell(props) {
  const { x, y, width, height, depth, name, size, value, color, root } = props;
  // depth 0 is the whole-area root node — it has no cell of its own.
  if (depth === 0 || width <= 0 || height <= 0) return null;

  const rootX = root ? root.x : x;
  const rootY = root ? root.y : y;
  const rootW = root ? root.width : width;
  const rootH = root ? root.height : height;
  const li = x > rootX + 0.5 ? GAP : 0;
  const ti = y > rootY + 0.5 ? GAP : 0;
  const ri = x + width < rootX + rootW - 0.5 ? GAP : 0;
  const bi = y + height < rootY + rootH - 0.5 ? GAP : 0;
  const rx = x + li;
  const ry = y + ti;
  const rw = Math.max(0, width - li - ri);
  const rh = Math.max(0, height - ti - bi);

  const pct = size ?? value;
  // Smallest cells that still fit text show the value + color dot; only roomier
  // cells add the category name beside the dot.
  const showLabel = rw > 28 && rh > 24;
  const showName = rw > 64 && rh > 52;

  return (
    <g>
      <rect
        className="pt-tm__rect"
        x={rx}
        y={ry}
        width={rw}
        height={rh}
        stroke={color}
        strokeWidth={1}
        style={{ "--cell-color": color }} />

      {showLabel &&
      <foreignObject x={rx} y={ry} width={rw} height={rh} style={{ pointerEvents: "none" }}>
          <div xmlns="http://www.w3.org/1999/xhtml" className="pt-tm__label">
            <div className="pt-tm__pct">{pct}%</div>
            <div className="pt-tm__cat">
              <span className="pt-tm__dot" style={{ background: color }} />
              {showName && name}
            </div>
          </div>
        </foreignObject>
      }
    </g>);

}

function CauseAllocationTreemap({ data, className = "" }) {
  // Resolve each cell's color up front so the cell renderer receives it, and
  // sort descending so the squarified layout packs the largest block first.
  const nodes = [...data].
  map((d) => ({ ...d, color: d.color ?? CATEGORY_ICONS[d.name]?.color })).
  sort((a, b) => b.size - a.size);

  return (
    <div className={"pt-tm-rc" + (className ? " " + className : "")}>
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={nodes}
          dataKey="size"
          isAnimationActive={false}
          content={<TreemapCell />} />

      </ResponsiveContainer>
    </div>);

}


export { CauseAllocationTreemap };
