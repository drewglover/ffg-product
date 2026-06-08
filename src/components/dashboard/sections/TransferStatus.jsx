import React from 'react';

/* ====== Transfer Stepper ====== */
function TransferStatus({ phase, firstGiveDate = "April 15, 2026" }) {
  const [dismissed, setDismissed] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  if (phase === "preview") return null;

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => setDismissed(true), 320);
  };

  const steps = phase === "allocated" ?
    [
      { label: "Transfer initiated: $200,000", date: firstGiveDate, progress: 100, state: "done" },
      { label: "Funds received",               date: firstGiveDate, progress: 100, state: "done" },
      { label: "Allocation in progress",        date: firstGiveDate, progress: 100, state: "done" },
      { label: "Funds distributed",             date: firstGiveDate, progress: 100, state: "done" }
    ] :
    [
      { label: "Transfer initiated: $200,000", date: firstGiveDate, progress: 100, state: "done" },
      { label: "Funds received",               date: firstGiveDate, progress: 100, state: "done" },
      { label: "Allocation in progress",        date: firstGiveDate, progress: 62,  state: "active" },
      { label: "Funds distributed",             date: firstGiveDate, progress: 0,   state: "pending" }
    ];

  return (
    <React.Fragment>
      {!dismissed && (
      <section
        className="section-block"
        aria-label="Transfer status"
        style={{
          position: "relative",
          padding: "0px 0px 96px",
          transition: "opacity 300ms ease, transform 300ms ease",
          opacity: isClosing ? 0 : 1,
          transform: isClosing ? "translateY(-14px)" : "translateY(0)",
        }}
      >
        {phase === "allocated" && (
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

        <div
          className="subhead"
          style={{ fontWeight: "300", margin: "0px 0px 32px", fontSize: "16px" }}
        >
          {phase === "allocated" ? "Transfer complete" : "Transfer in progress"}
        </div>

        <div className="stepper">
          {steps.map((s, i) => (
            <div
              key={i}
              className={
                "step" +
                (s.state === "pending" ? " muted" : "") +
                (s.state === "active"  ? " active" : "")
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
            </div>
          ))}
        </div>
      </section>
      )}

      {phase === "allocated" && (
        <section className="section-block" aria-label="Donation status">
          <div className="allocated-callout">
            <div className="allocated-callout__text">
              <div className="allocated-callout__title">Your donation is being put to work</div>
              <p className="allocated-callout__copy">You can expect your contribution to see visible results in 6-8 weeks.</p>
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
}


export { TransferStatus };
