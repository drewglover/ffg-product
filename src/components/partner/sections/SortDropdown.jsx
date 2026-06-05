import { PIcon } from '../icons/PIcon';
import { SORT_OPTIONS } from '../data/sortOptions';

function SortDropdown({ value, onChange }) {
  return (
    <label className="pt-sort-native">
      <PIcon.Sort />
      <span className="pt-sort-native__label">Sort by:</span>
      <select
        className="pt-sort-native__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {SORT_OPTIONS.map((o) =>
          <option key={o.id} value={o.id}>{o.label}</option>
        )}
      </select>
      <PIcon.Chevron />
    </label>
  );
}


export { SortDropdown };
