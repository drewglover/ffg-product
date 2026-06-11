import { CATEGORY_ICONS } from '../partner/data/categoryIcons';

/* ====== Canonical cause-allocation treemap ====== */
// Single source of truth shared by the partner page and the dashboard.
// Renders the .pt-tm-grid layout from styles.css — a fixed proportional grid
// whose cells land in their slot by cause name. Colors come from
// CATEGORY_ICONS so the two pages can't drift; pass item.color to override.
const GRID_AREA = {
  "Social Justice": "social",
  Culture: "culture",
  Education: "education",
  Community: "community",
  Environment: "environment"
};

function CauseAllocationTreemap({ data, className = "" }) {
  return (
    <div className={"pt-tm-grid" + (className ? " " + className : "")}>
      {data.map((item) => {
        const color = item.color ?? CATEGORY_ICONS[item.name]?.color;
        return (
          <div
            key={item.name}
            className="pt-tm__cell"
            style={{ borderColor: color, gridArea: GRID_AREA[item.name] }}>
            <div className="pt-tm__pct">{item.size}%</div>
            <div className="pt-tm__cat">
              <span className="pt-tm__dot" style={{ background: color }} />
              {item.name}
            </div>
          </div>);

      })}
    </div>);

}


export { CauseAllocationTreemap };
