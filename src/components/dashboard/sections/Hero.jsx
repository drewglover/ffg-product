import React, { useState } from 'react';
import { Icon } from '../icons/Icon';

/* ====== Hero ====== */
function Hero({ phase, name, livesCount, onAmountConfirm, confirmedAmount, onTabChange }) {
  const DEFAULT_AMOUNT = 200000;
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [mode, setMode] = useState("idle"); // "idle" | "confirming" | "confirmed"
  const [prevAmount, setPrevAmount] = useState(DEFAULT_AMOUNT);
  const [confirmedAt, setConfirmedAt] = useState(null);
  const min = 0,max = 500000;
  const pct = Math.round((amount - min) / (max - min) * 100);
  const isAllocated = phase === "allocated";

  const handleUpdate = () => setMode("confirming");

  const handleConfirm = () => {
    setPrevAmount(confirmedAmount);
    onAmountConfirm(amount);
    const now = new Date();
    const fmt = now.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }).replace(" at ", " at ");
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
    <div className="hero">
      <div className="hero-text">
        <h1 style={{ fontSize: "48px" }}>Welcome, {name}</h1>
        <p style={{ fontWeight: "300", fontSize: "16px", color: "var(--ffg-muted)" }}>Your good has reached <a className="accent-link" href="#impact-tabs" onClick={(e) => {
          e.preventDefault();
          onTabChange && onTabChange("overview");
          const el = document.getElementById("impact-tabs");
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 48, behavior: "smooth" });
        }} style={{ fontSize: "16px", fontWeight: "300", color: "var(--ffg-surface-950)" }}>{livesCount.toLocaleString()} new lives</a> since your last visit.</p>
      </div>

      {isAllocated ?
      <div className="hero-actions" aria-label="Quick actions">
          <button type="button" className="hero-btn hero-btn--ghost">
            <Icon.Share />
            <span>Share</span>
          </button>
          <button type="button" className="hero-btn hero-btn--solid">
            <span>Give</span>
          </button>
        </div> :
      phase === "preview" ?
      <div className="alloc-card" role="group" aria-label="Impact allocation" style={{ borderColor: "var(--overlay-dark-10)" }}>
          <div className="alloc-info">
            <div className="alloc-label">
              <span>Impact allocation</span>
              <span className="info"><Icon.Info /></span>
            </div>
            <div className="alloc-value" style={{ fontSize: "24px" }}>${amount.toLocaleString()}</div>
          </div>

          {mode === "confirming" ?
        <div className="alloc-controls alloc-controls--confirm">
              <span className="alloc-confirm-label">Confirm allocation amount</span>
              <button type="button" className="alloc-btn alloc-btn--solid" onClick={handleConfirm}>
                Show my good
              </button>
            </div> :

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
        }

          {mode === "confirmed" && confirmedAt &&
        <div className="alloc-timestamp">
              Updated {confirmedAt} &mdash; <button type="button" className="alloc-undo" onClick={handleUndo}>Undo</button>
            </div>
        }
        </div> :
      null}
    </div>);

}


export { Hero };
