import { Icon } from '../icons/Icon';

function FilterChip({ value, onChange, options, ariaLabel }) {
  return (
    <span className="chip chip--select" style={{ fontSize: "14px", fontWeight: "300" }}>
      <select aria-label={ariaLabel} value={value} onChange={(e) => onChange(e.target.value)} style={{ fontSize: "14px", fontWeight: "300" }}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <Icon.Caret />
    </span>);

}


export { FilterChip };
