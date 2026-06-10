import React, { useState } from 'react';
import { Icon } from '../../icons/Icon';

/* ====== Dynamic action ======
   Top-right of the hero. A single slot whose contents swap based on the
   resolved `variant`. Today's variants:
     - "none"               → renders nothing
     - "allocation-slider"  → the impact-allocation card (slider + confirm flow)
     - "allocated-callout"  → the "donation at work" callout
     - "hero-actions"       → Share / Give buttons
   Unknown variants render nothing, so new states can be added additively. */
function DynamicAction({ variant, onAmountConfirm, confirmedAmount }) {
  switch (variant) {
    case "allocation-slider":
      return <AllocationSlider onAmountConfirm={onAmountConfirm} confirmedAmount={confirmedAmount} />;
    case "allocated-callout":
      return <AllocatedCallout />;
    case "hero-actions":
      return <HeroActions />;
    case "none":
    default:
      return null;
  }
}

/* ---- hero-actions: Share / Give ---- */
function HeroActions() {
  return (
    <div className="hero-actions" aria-label="Quick actions">
      <button type="button" className="hero-btn hero-btn--ghost">
        <Icon.Share />
        <span>Share</span>
      </button>
      <button type="button" className="hero-btn hero-btn--solid">
        <span>Give</span>
      </button>
    </div>
  );
}

/* ---- allocated-callout ----
   Lives in the hero slot now (option B). The `--in-hero` modifier lets it
   stretch to fill the right column rather than the full-width section it
   used to occupy below the stepper. */
function AllocatedCallout() {
  return (
    <div className="allocated-callout allocated-callout--in-hero" aria-label="Donation status">
      <div className="allocated-callout__text">
        <div className="allocated-callout__title">Your donation is being put to work</div>
        <p className="allocated-callout__copy">You can expect your contribution to see visible results in 6-8 weeks.</p>
      </div>
    </div>
  );
}

/* ---- allocation-slider ----
   The impact-allocation card. Owns its own slider/confirm state; reports the
   confirmed amount up via onAmountConfirm. Unchanged behavior from the
   original Hero. */
function AllocationSlider({ onAmountConfirm, confirmedAmount }) {
  const DEFAULT_AMOUNT = 200000;
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [mode, setMode] = useState("idle"); // "idle" | "confirming" | "confirmed"
  const [prevAmount, setPrevAmount] = useState(DEFAULT_AMOUNT);
  const [confirmedAt, setConfirmedAt] = useState(null);
  const min = 0, max = 500000;
  const pct = Math.round((amount - min) / (max - min) * 100);

  const handleUpdate = () => setMode("confirming");

  const handleConfirm = () => {
    setPrevAmount(confirmedAmount);
    onAmountConfirm(amount);
    const now = new Date();
    const fmt = now.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
    setConfirmedAt(fmt);
    setMode("confirmed");
  };

  const handleUndo = () => {
    setAmount(prevAmount);
    onAmountConfirm(prevAmount);
    setConfirmedAt(null);
    setMode("idle");
  };

  return (
    <div className="alloc-card" role="group" aria-label="Impact allocation" style={{ borderColor: "var(--overlay-dark-10)" }}>
      <div className="alloc-info">
        <div className="alloc-label">
          <span>Impact allocation</span>
          <span className="info"><Icon.Info /></span>
        </div>
        <div className="alloc-value" style={{ fontSize: "24px" }}>${amount.toLocaleString()}</div>
      </div>

      {mode === "confirming" ? (
        <div className="alloc-controls alloc-controls--confirm">
          <span className="alloc-confirm-label">Confirm allocation amount</span>
          <button type="button" className="alloc-btn alloc-btn--solid" onClick={handleConfirm}>
            Show my good
          </button>
        </div>
      ) : (
        <div className="alloc-controls">
          <div className="alloc-slider" style={{ "--pct": pct + "%" }}>
            <input
              type="range"
              min={min}
              max={max}
              step={5000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              aria-label="Allocation amount" />
          </div>
          <button type="button" className="alloc-btn" onClick={handleUpdate}>Update</button>
        </div>
      )}

      {mode === "confirmed" && confirmedAt && (
        <div className="alloc-timestamp">
          Updated {confirmedAt} &mdash; <button type="button" className="alloc-undo" onClick={handleUndo}>Undo</button>
        </div>
      )}
    </div>
  );
}

export { DynamicAction };
