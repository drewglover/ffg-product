import { Icon } from '../icons/Icon';

/* ====== Chips (filter pills) ====== */
function Chip({ label, active }) {
  return (
    <button type="button" className="chip" aria-pressed={active ? "true" : "false"}>
      <span>{label}</span>
      <Icon.Caret />
    </button>);

}


export { Chip };
