import { CAUSE_BY_ID } from '../data/causeAreas';
import { GOALS_BY_CAUSE } from '../data/goalsByCause';

/* ── Steps 2-4: goals for a single cause area ────────── */
function GoalsStep({ causeId, selected, setSelected }) {
  const cause = CAUSE_BY_ID[causeId];
  const goals = GOALS_BY_CAUSE[causeId];
  const max = 3;
  const toggle = (g) => {
    const next = new Set(selected);
    if (next.has(g)) next.delete(g);else
    if (next.size < max) next.add(g);
    setSelected([...next]);
  };
  return (
    <div className="ob-step">
      <h2 className="ob-title">I want to…</h2>
      <p className="ob-subtitle">Select up to {max} goals for <strong>{cause.name}</strong></p>
      <div className="ob-goals">
        {goals.map((g) => {
          const isSelected = selected.includes(g);
          const isDisabled = !isSelected && selected.length >= max;
          return (
            <button
              key={g}
              type="button"
              className={"ob-goal" + (isSelected ? " is-selected" : "")}
              onClick={() => toggle(g)}
              disabled={isDisabled}
              aria-pressed={isSelected}>

              {g}
            </button>);

        })}
      </div>
    </div>);

}


export { GoalsStep };
