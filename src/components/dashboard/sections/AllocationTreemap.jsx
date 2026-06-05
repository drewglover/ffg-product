import { Cell } from 'recharts';
import { TOTAL_CONTRIBUTIONS, ALLOCATION_DATA } from '../data/allocationData';

function TreemapCell(props) {
  const { x, y, width, height, name, size, color, root, depth, onHover, onLeave, desc, activeName } = props;
  if (width <= 0 || height <= 0) return null;
  // Skip the root node — it renders an outer rect and a stray label.
  if (depth === 0) return null;
  // Inset each cell by 3px on all sides so gaps between blocks total 6px.
  // Skip insetting against the outer edges of the treemap.
  const GAP = 3;
  const rootW = root ? root.width : width;
  const rootH = root ? root.height : height;
  const rootX = root ? root.x : x;
  const rootY = root ? root.y : y;
  const leftInset = x > rootX + 0.5 ? GAP : 0;
  const topInset = y > rootY + 0.5 ? GAP : 0;
  const rightInset = x + width < rootX + rootW - 0.5 ? GAP : 0;
  const bottomInset = y + height < rootY + rootH - 0.5 ? GAP : 0;
  const rx = x + leftInset;
  const ry = y + topInset;
  const rw = Math.max(0, width - leftInset - rightInset);
  const rh = Math.max(0, height - topInset - bottomInset);
  const pad = 18;
  const showLabel = rw > 70 && rh > 60;
  const handleMove = (e) => {
    if (!onHover) return;
    onHover({ name, size, color, desc }, e.clientX, e.clientY);
  };
  const isActive = activeName === name;
  return (
    <g style={{ cursor: "pointer" }}>
      <rect
        x={rx}
        y={ry}
        width={rw}
        height={rh}
        fill={isActive ? color : "transparent"}
        fillOpacity={isActive ? 0.1 : 0}
        stroke={color}
        strokeWidth={1}
        onMouseEnter={handleMove}
        onMouseMove={handleMove}
        onMouseLeave={onLeave} />

      {showLabel &&
      <foreignObject x={rx + pad} y={ry + pad} width={Math.max(0, rw - pad)} height={Math.max(0, rh - pad)} style={{ pointerEvents: "none" }}>
          <div xmlns="http://www.w3.org/1999/xhtml" className="tm-cell">
            <div className="tm-pct">{size}%</div>
            <div className="tm-name">
              <span className="tm-dot" style={{ background: color }} />
              {name}
            </div>
          </div>
        </foreignObject>
      }
    </g>);

}

function AllocationTreemap({ totalContrib = TOTAL_CONTRIBUTIONS }) {
  // Partner-style static treemap — hairline cells, "%" + label only.
  // Slot layout mirrors the partner page's Cause Allocation grid:
  //   ┌────────┬──────────────┐
  //   │ second │              │
  //   ├────────┤    biggest   │
  //   │        │              │
  //   ├────────┴──────────────┤
  //   │ third  │    fourth    │
  //   └────────┴──────────────┘
  // Items map to slots in size-rank order; if more than 5 exist, only the
  // top 5 are shown (rest collapse into the smallest slot's value).
  const sorted = [...ALLOCATION_DATA].sort((a, b) => b.size - a.size);
  const [big, second, third, fourth, fifth] = sorted;
  const Cell = ({ item, lg, row }) =>
  item ?
  <div className={"pt-tm__cell" + (lg ? " pt-tm__cell--lg" : "") + (row ? " pt-tm__cell--row" : "")} style={{ borderColor: item.color }}>
      <div className="pt-tm__pct" style={{ fontFamily: "\"PP Fragment Sans\"" }}>{item.size}%</div>
      <div className="pt-tm__cat" style={{ fontSize: "14px" }}>{item.name}</div>
    </div> :
  null;

  return (
    <div className="pt-alloc alloc-treemap-static">
      <div className="pt-tm">
        <div className="pt-tm__col">
          <Cell item={second} />
          {fifth && <Cell item={fifth} />}
        </div>
        <div className="pt-tm__col pt-tm__col--wide">
          <Cell item={big} lg />
        </div>
      </div>
      <div className="pt-tm pt-tm--row">
        <Cell item={third} row />
        <Cell item={fourth} row />
      </div>
    </div>);

}


export { TreemapCell, AllocationTreemap };
