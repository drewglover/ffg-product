import React from 'react';

/* ====== Stepper ======
   Data-driven progress stepper. Render whatever `steps` is handed. Supports
   3/4/5 columns via --step-count, and an optional per-step `action` button for
   steps that need further input from the user. The card chrome, title, and
   dismiss control live in UpdatesArea (this is now the bare stepper).

   Props:
     - steps: [{ label, date, progress (0-100), state: "done"|"active"|"pending", action? }]
              action?: { label, onClick, disabled? } */
function Stepper({ steps = [] }) {
  if (!steps.length) return null;

  return (
    <div className="stepper" key={steps.length} style={{ "--step-count": steps.length }}>
      {steps.map((s, i) => (
        <div
          key={i}
          className={
            "step" +
            (s.state === "pending" ? " muted" : "") +
            (s.state === "active" ? " active" : "")
          }
        >
          <div className="bar" style={{ "--p": s.progress + "%" }} />
          <div
            className="step-label"
            style={{ fontWeight: "300", fontSize: "14px", color: "var(--ffg-surface-950)", opacity: "0.6" }}
          >
            {s.label}
          </div>
          {((s.state === "done" && s.date) || (s.state === "active" && s.note)) && (
            <div
              className="step-date"
              style={{ fontWeight: "300", fontSize: "12px", color: "var(--ffg-surface-950)", opacity: "0.4" }}
            >
              {s.state === "active" ? s.note : s.date}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export { Stepper };
