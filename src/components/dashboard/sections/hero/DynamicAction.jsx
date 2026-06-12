import React, { useState, useRef } from 'react';
import { Icon } from '../../icons/Icon';
import { toast } from 'sonner';

/* ====== Dynamic action ======
   Top-right of the hero. The slot now holds only the allocation card: when
   `enabled` it renders the annual-giving card, otherwise nothing (Welcome then
   spans the full width). Status/action callouts have moved to the UpdatesArea. */
function DynamicAction({ enabled = true, onAmountConfirm, confirmedAmount }) {
  if (!enabled) return null;
  return <AllocationSlider onAmountConfirm={onAmountConfirm} confirmedAmount={confirmedAmount} />;
}

/* ---- annual giving ----
   Annual-giving card. The amount steps through fixed stops via a carousel
   (◂ / ▸); a custom amount can also be typed and applied with Update. The
   decrease button is guarded: the first click only arms it and toasts a nudge
   ("Click twice to reduce annual giving"); a second click within the timeout
   actually steps down. At the min/max stop the matching nav button reads as
   disabled and instead toasts a hint to use the custom field. Reports the
   amount up via onAmountConfirm. */
const GIVING_STOPS = [100000, 250000, 500000, 1000000];
const DEFAULT_AMOUNT = 250000;
const NUDGE_REDUCE = "Click twice to reduce annual giving";
const NUDGE_CUSTOM = "Enter a custom amount for your good.";

function AllocationSlider({ onAmountConfirm }) {
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [custom, setCustom] = useState("");
  const [armed, setArmed] = useState(false); // decrease confirm-guard
  const disarmTimer = useRef(null);

  const canIncrease = GIVING_STOPS.some((s) => s > amount);
  const canDecrease = GIVING_STOPS.some((s) => s < amount);

  const commit = (next) => {
    setAmount(next);
    onAmountConfirm(next);
  };

  const disarm = () => {
    setArmed(false);
    if (disarmTimer.current) clearTimeout(disarmTimer.current);
  };

  const handleIncrease = () => {
    disarm();
    if (!canIncrease) { toast(NUDGE_CUSTOM); return; }
    commit(GIVING_STOPS.find((s) => s > amount));
  };

  const handleDecrease = () => {
    if (!canDecrease) { toast(NUDGE_CUSTOM); return; }
    // First click arms + toasts the nudge; second click steps down.
    if (!armed) {
      setArmed(true);
      toast(NUDGE_REDUCE);
      if (disarmTimer.current) clearTimeout(disarmTimer.current);
      disarmTimer.current = setTimeout(() => setArmed(false), 3000);
      return;
    }
    disarm();
    commit([...GIVING_STOPS].reverse().find((s) => s < amount));
  };

  const handleUpdate = () => {
    disarm();
    const n = Number(custom.replace(/[^0-9.]/g, ""));
    if (Number.isFinite(n) && n > 0) {
      commit(n);
      setCustom("");
    }
  };

  return (
    <div className="alloc-card" role="group" aria-label="Annual giving" style={{ borderColor: "var(--overlay-dark-10)" }}>
      <div className="alloc-label">
        <span>Annual giving</span>
        <span className="info"><Icon.Info /></span>
      </div>

      <div className="alloc-carousel">
        <button
          type="button"
          className={"alloc-nav" + (canDecrease ? "" : " is-disabled")}
          onClick={handleDecrease}
          aria-disabled={!canDecrease}
          aria-label="Decrease annual giving">
          <Icon.ChevronLeft />
        </button>

        <div className="alloc-value" aria-live="polite">${amount.toLocaleString()}</div>

        <button
          type="button"
          className={"alloc-nav" + (canIncrease ? "" : " is-disabled")}
          onClick={handleIncrease}
          aria-disabled={!canIncrease}
          aria-label="Increase annual giving">
          <Icon.ChevronRight />
        </button>
      </div>

      <div className="alloc-custom">
        <div className="alloc-label">
          <span>Custom amount</span>
        </div>
        <div className="alloc-custom__row">
          <div className="alloc-input">
            <span className="alloc-input__prefix">$</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Amount"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
              aria-label="Custom annual giving amount" />
          </div>
          <button type="button" className="alloc-btn" onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
}

export { DynamicAction };
