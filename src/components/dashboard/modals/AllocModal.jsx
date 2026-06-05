import React, { useEffect } from 'react';
import { Icon } from '../icons/Icon';

/* ====== Allocation area modal ====== */
function AllocModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="alloc-modal-overlay" role="dialog" aria-modal="true" aria-label="Impact areas">
      <div className="alloc-modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="alloc-modal-panel">
        <div className="alloc-modal-head">
          <span className="alloc-modal-title">Impact areas</span>
          <button className="alloc-modal-close" aria-label="Close" onClick={onClose}>
            <Icon.X />
          </button>
        </div>
        <div className="alloc-modal-body">
          <div className="alloc-modal-placeholder">
            <div className="alloc-modal-placeholder__label">Detailed breakdown</div>
            <div className="alloc-modal-placeholder__stripe" />
          </div>
        </div>
      </div>
    </div>);
}


export { AllocModal };
