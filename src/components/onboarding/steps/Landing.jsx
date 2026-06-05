import { Ic } from '../icons/Ic';

/* ── Landing ─────────────────────────────────────────── */
function Landing({ onStart }) {
  return (
    <div className="ob-landing">
      <h1 className="ob-landing__h1"><em>Lexi</em>, you’re here for a reason.</h1>
      <p className="ob-landing__copy" style={{ fontSize: "16px" }}>The reason you're here is the reason we exist. We believe the opportunity to do good should never be wasted. And so do you. Here, the good you set in motion will be seen, measured, and built to last. Complete this questionnaire to help create your impact strategy.

      </p>
      <div className="ob-landing__meta">
        <Ic.Alarm />
        <span>5–10 minutes</span>
      </div>
      <button type="button" className="ob-btn ob-btn--solid" onClick={onStart}>
        Let's get started
      </button>
    </div>);

}


export { Landing };
