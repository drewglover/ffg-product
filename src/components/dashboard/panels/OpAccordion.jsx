import React, { useState } from 'react';

function OpAccordion({ icon, title, children, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className={"pt-acc" + (open ? " is-open" : "")}>
      <button className="pt-acc__head" onClick={() => setOpen(!open)}>
        <span className="pt-acc__title" style={{ fontSize: "16px", fontWeight: "400" }}>
          {icon && <span className="pt-acc__icon">{icon}</span>}
          {title}
        </span>
        <span className="pt-acc__caret" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.22s ease" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </span>
      </button>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.24s cubic-bezier(0.4,0,0.2,1)" }}>
        <div style={{ overflow: "hidden" }}>
          <div className="pt-acc__body" style={{ color: "rgb(121, 119, 114)", paddingBottom: "28px" }}>
            {children || <p className="pt-acc__copy" style={{ color: "rgb(121, 119, 114)", fontSize: "16px" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>}
          </div>
        </div>
      </div>
    </div>);

}


export { OpAccordion };
