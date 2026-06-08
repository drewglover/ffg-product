import React, { useState, useEffect } from 'react';
import { Icon } from '../icons/Icon';

/* ====== Stat card ====== */
function useCountUp(target, duration) {
  if (duration === undefined) duration = 900;
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target == null) return;
    var start = null;
    var raf;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return function () {cancelAnimationFrame(raf);};
  }, [target, duration]);
  return count;
}

function Stat({ label, value, trend, rawNum, prefix, onClick, scope }) {
  if (prefix === undefined) prefix = "";
  var animated = useCountUp(rawNum != null ? rawNum : null);
  var displayValue = rawNum != null ? prefix + animated.toLocaleString() : value;
  return (
    <div className="stat-card" style={{ gap: "12px", padding: "18px" }}>
      <button type="button" className="stat-card__open" aria-label={"Open " + label} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </button>
      <div className="stat-label">
        <span>{label}</span>
        <span className="info"><Icon.Info /></span>
      </div>
      {/* Keyed on scope so only the value + trend replay their fade/count-up
          when the scope toggle changes — the card frame stays put. */}
      <div className="stat-value stat-value--refresh" key={"v-" + scope} style={{ fontSize: "24px" }}>{displayValue}</div>
      <div className="stat-trend stat-trend--refresh" key={"t-" + scope}>
        <Icon.Trend />
        <span>{trend}</span>
      </div>
    </div>);

}


export { useCountUp, Stat };
