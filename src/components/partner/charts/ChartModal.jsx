import React, { useEffect } from 'react';
import { PIcon } from '../icons/PIcon';
import { ChartSVG } from './ChartSVG';

// Modal: enlarged view of the same chart. Escape closes, backdrop-click closes,
// body scroll is locked while open so the focus stays on the chart.
function ChartModal({ title, onClose }) {
  useEffect(() => {
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="pt-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — enlarged chart`}
      onClick={(e) => {if (e.target === e.currentTarget) onClose();}}>

      <div className="pt-modal__panel" role="document">
        <div className="pt-modal__head">
          <span className="pt-modal__title">
            {title}
            <PIcon.Info className="pt-info" style={{ marginLeft: 10 }} />
          </span>
          <button className="pt-modal__close" aria-label="Close" onClick={onClose}>
            <PIcon.X />
          </button>
        </div>
        <div className="pt-modal__chart">
          <ChartSVG height={460} />
        </div>
        <div className="pt-modal__legend pt-chart__legend">
          <span><span className="pt-chart__sw pt-chart__sw--line" style={{ width: '18px', height: '4px', borderRadius: '2px', background: 'linear-gradient(90deg, #6F9DCB, #15315A)' }} /> This Organization</span>
          <span><span className="pt-chart__sw pt-chart__sw--bar" style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#EAE8E3', border: '1px solid #92908B' }} /> Average of others</span>
        </div>
      </div>
    </div>);

}


export { ChartModal };
