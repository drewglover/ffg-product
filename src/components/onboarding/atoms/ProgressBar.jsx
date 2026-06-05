
/* ── Top progress bar ─────────────────────────────────── */
function ProgressBar({ step }) {
  // step: 1..6 (questionnaire steps); 0/7 hide
  return (
    <div className="ob-progress" aria-label="Onboarding progress" role="progressbar" aria-valuemin="1" aria-valuemax="6" aria-valuenow={step}>
      {[1, 2, 3, 4, 5, 6].map((n) =>
      <div
        key={n}
        className={"ob-progress__seg" + (n < step ? " is-done" : n === step ? " is-active" : "")} />

      )}
    </div>);

}


export { ProgressBar };
