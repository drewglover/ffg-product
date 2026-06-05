
function OrgPanelTreemapCell(props) {
  const { x, y, width, height, name, size, color } = props;
  if (width <= 0 || height <= 0) return null;
  const showLabel = width > 70 && height > 50;
  return (
    <g>
      <rect
        x={x + 0.5}
        y={y + 0.5}
        width={Math.max(0, width - 1)}
        height={Math.max(0, height - 1)}
        fill={color}
        stroke="#FFFFFF"
        strokeWidth={2} />

      {showLabel &&
      <foreignObject x={x + 14} y={y + 12} width={Math.max(0, width - 14)} height={Math.max(0, height - 12)}>
          <div xmlns="http://www.w3.org/1999/xhtml" className="op-tm__cell">
            <div className="op-tm__name">{name}</div>
            <div className="op-tm__pct">{size}%</div>
          </div>
        </foreignObject>
      }
    </g>);

}


export { OrgPanelTreemapCell };
