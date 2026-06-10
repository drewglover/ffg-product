import React from 'react';

/* ====== Welcome ======
   Top-left of the hero: greeting + lives-impacted subtitle. Visually
   unchanged from the original Hero markup — extracted so the hero is
   composed of named, single-responsibility pieces. */
function Welcome({ name, livesCount, onTabChange }) {
  const goToImpact = (e) => {
    e.preventDefault();
    onTabChange && onTabChange("overview");
    const el = document.getElementById("impact-tabs");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 48, behavior: "smooth" });
  };

  return (
    <div className="hero-text">
      <h1 style={{ fontSize: "48px" }}>Welcome, {name}</h1>
      <p style={{ fontWeight: "300", fontSize: "16px", color: "var(--ffg-muted)" }}>
        Your good has reached{" "}
        <a className="accent-link" href="#impact-tabs" onClick={goToImpact}
           style={{ fontSize: "16px", fontWeight: "300", color: "var(--ffg-surface-950)" }}>
          {livesCount.toLocaleString()} new lives
        </a>{" "}
        since your last visit.
      </p>
    </div>
  );
}

export { Welcome };
