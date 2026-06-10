import React from 'react';

/* ====== Welcome ======
   Top-left of the hero: greeting + subtitle. The subtitle copy swaps by
   `state`:
     - "new good" → impact recap with a link to the new lives reached
     - "generic"  → "Review what your good is doing."
     - "initial"  → "Direct where your good goes." (pairs with the preview phase) */
const SUBTITLE_STYLE = { fontWeight: "300", fontSize: "16px", color: "var(--ffg-muted)" };

function Welcome({ name, livesCount, onTabChange, state = "new good" }) {
  const goToImpact = (e) => {
    e.preventDefault();
    onTabChange && onTabChange("overview");
    const el = document.getElementById("impact-tabs");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 48, behavior: "smooth" });
  };

  // "your good" links to the page tabs, matching the "new good" link below.
  const goodLink = (
    <a className="accent-link" href="#impact-tabs" onClick={goToImpact}
       style={{ fontSize: "16px", fontWeight: "300", color: "var(--ffg-surface-950)" }}>
      your good
    </a>
  );

  let subtitle;
  if (state === "generic") {
    subtitle = <p style={SUBTITLE_STYLE}>Review what {goodLink} is doing.</p>;
  } else if (state === "initial") {
    subtitle = <p style={SUBTITLE_STYLE}>Direct where {goodLink} goes.</p>;
  } else {
    subtitle = (
      <p style={SUBTITLE_STYLE}>
        Your good has reached{" "}
        <a className="accent-link" href="#impact-tabs" onClick={goToImpact}
           style={{ fontSize: "16px", fontWeight: "300", color: "var(--ffg-surface-950)" }}>
          {livesCount.toLocaleString()} new lives
        </a>{" "}
        since your last visit.
      </p>
    );
  }

  return (
    <div className="hero-text">
      <h1 style={{ fontSize: "48px" }}>Welcome, {name}</h1>
      {subtitle}
    </div>
  );
}

export { Welcome };
