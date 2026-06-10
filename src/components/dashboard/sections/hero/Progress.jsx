import React from 'react';

/* ====== Progress ======
   Full-width stepper below the hero (replaces TransferStatus). Fully
   data-driven: render whatever `steps` is handed. Supports 3/4/5 columns
   via --step-count, and an optional per-step `action` button for steps that
   need further input from the user.

   Props:
     - title:    heading shown above the steps
     - steps:    [{ label, date, progress (0-100), state: "done"|"active"|"pending", action? }]
                 action?: { label, onClick, disabled? }
     - dismissible: show the ✕ dismiss control (default false) */
function Progress({ title = "Transfer in progress", steps = [], dismissible = false }) {
  const [dismissed, setDismissed] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  if (!steps.length || dismissed) return null;

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => setDismissed(true), 320);
  };

  return (
    <section
      className="section-block"
      aria-label="Transfer status"
      style={{
        opacity: isClosing ? 0 : 1,
        transform: isClosing ? "translateY(-14px)" : "translateY(0)",
      }}
    >
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss transfer status"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px 0px",
            lineHeight: 1,
            color: "rgba(20,20,19,0.35)",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color .15s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "rgba(20,20,19,0.7)"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(20,20,19,0.35)"}
        >
          ✕
        </button>
      )}

      <div className="subhead" style={{ fontWeight: "300", fontSize: "16px" }}>
        {title}
      </div>

      <div className="stepper" style={{ "--step-count": steps.length }}>
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
            <div
              className="step-date"
              style={{ fontWeight: "300", fontSize: "12px", color: "var(--ffg-surface-950)", opacity: "0.4" }}
            >
              {s.date}
            </div>
            {s.action && (
              <button
                type="button"
                className="step-action"
                onClick={s.action.onClick}
                disabled={s.action.disabled}
              >
                {s.action.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export { Progress };
