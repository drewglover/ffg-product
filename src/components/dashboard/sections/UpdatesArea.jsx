import React from 'react';
import { Icon } from '../icons/Icon';
import { Stepper } from './hero/Stepper.jsx';

/* ====== Updates area ======
   Single-update notification region below the hero (replaces the standalone
   transfer-status section). Shows one update at a time, dismissible via the ✕
   in the top-right. Update shape:
     { type, title?, copy?, steps?, action? }
   Types:
     - "update-status"   → bare stepper (no callout card); title + Stepper
     - "update-action"   → callout card: title + copy + CTA button
     - "update-advisory" → callout card: title + copy
     - "update-general"  → callout card: title + copy
   Returns null when there's no update or it's been dismissed. */
function UpdatesArea({ update }) {
  const [dismissed, setDismissed] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  if (!update || !update.type || dismissed) return null;

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => setDismissed(true), 320);
  };

  const isStatus = update.type === "update-status";
  const modifier = update.type.replace("update-", ""); // status|action|advisory|general

  return (
    <section
      className="section-block updates-area"
      aria-label="Update"
      style={{
        opacity: isClosing ? 0 : 1,
        transform: isClosing ? "translateY(-14px)" : "translateY(0)",
      }}
    >
      <button
        type="button"
        className="updates-area__dismiss"
        onClick={handleDismiss}
        aria-label="Dismiss update"
      >
        <Icon.X />
      </button>

      {isStatus ? (
        <>
          {update.title && (
            <div className="subhead" style={{ fontWeight: "300", fontSize: "16px" }}>
              {update.title}
            </div>
          )}
          <Stepper steps={update.steps} />
        </>
      ) : (
        <div className={`allocated-callout allocated-callout--${modifier}`}>
          <div className="allocated-callout__text">
            {update.title && <div className="allocated-callout__title">{update.title}</div>}
            {update.copy && <p className="allocated-callout__copy">{update.copy}</p>}
          </div>
          {update.action && (
            <button type="button" className="hero-btn hero-btn--solid" onClick={update.action.onClick}>
              {update.action.label}
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export { UpdatesArea };
