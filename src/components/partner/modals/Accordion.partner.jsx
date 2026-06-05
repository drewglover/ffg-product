import React, { useState } from 'react';
import { PIcon } from '../icons/PIcon';

function Accordion({ icon, title, children, defaultOpen, variant }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className={"pt-acc" + (variant ? " pt-acc--" + variant : "") + (open ? " is-open" : "")}>
      <button className="pt-acc__head" onClick={() => setOpen(!open)}>
        <span className="pt-acc__title" style={{ fontSize: "16px", fontWeight: "400" }}>
          {icon && <span className="pt-acc__icon">{icon}</span>}
          {title}
        </span>
        <span className="pt-acc__caret pt-acc__caret--anim">
          <PIcon.Chevron />
        </span>
      </button>
      <div className="pt-acc__body" aria-hidden={!open}>
        <div className="pt-acc__body-inner" style={{ color: "rgb(121, 119, 114)" }}>
          {children ||
            <p className="pt-acc__copy" style={{ color: "rgb(121, 119, 114)", fontSize: "16px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua.
            </p>
          }
        </div>
      </div>
    </div>);
}


export { Accordion };
