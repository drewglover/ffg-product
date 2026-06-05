import React, { useState } from 'react';
import { Ic } from '../icons/Ic';
import { CAUSE_BY_ID } from '../data/causeAreas';

/* ── Step 1: cause priorities, drag to reorder ──────── */
function CausePriorities({ order, setOrder }) {
  const [dragId, setDragId] = useState(null);
  const [overId, setOverId] = useState(null);

  const onDragStart = (e, id) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
    // Firefox requires data to be set
    try {e.dataTransfer.setData("text/plain", id);} catch {}
  };
  const onDragOver = (e, id) => {
    e.preventDefault();
    if (id !== overId) setOverId(id);
  };
  const onDragEnd = () => {setDragId(null);setOverId(null);};
  const onDrop = (e, targetId) => {
    e.preventDefault();
    if (!dragId || dragId === targetId) {onDragEnd();return;}
    const next = [...order];
    const from = next.indexOf(dragId);
    const to = next.indexOf(targetId);
    if (from < 0 || to < 0) {onDragEnd();return;}
    next.splice(from, 1);
    next.splice(to, 0, dragId);
    setOrder(next);
    onDragEnd();
  };

  return (
    <div className="ob-step">
      <h2 className="ob-title">What three cause areas matter most to you?</h2>
      <p className="ob-subtitle">Drag to reorder</p>
      <div className="ob-causes" role="list">
        {order.map((id, idx) => {
          const cause = CAUSE_BY_ID[id];
          const Icon = cause.icon;
          const isTop = idx < 3;
          return (
            <div className="ob-cause" key={id} role="listitem">
              <div className="ob-cause__rank">{isTop ? idx + 1 : ""}</div>
              <div
                className={
                "ob-cause__row" + (
                isTop ? " is-top" : "") + (
                dragId === id ? " is-dragging" : "") + (
                overId === id && dragId && dragId !== id ? " is-over" : "")
                }
                draggable
                onDragStart={(e) => onDragStart(e, id)}
                onDragOver={(e) => onDragOver(e, id)}
                onDragEnd={onDragEnd}
                onDrop={(e) => onDrop(e, id)}
                aria-label={`${cause.name}, rank ${idx + 1}`}>

                <span className="ob-cause__handle"><Ic.Grip /></span>
                <span className="ob-cause__name" style={{ fontSize: "16px", fontWeight: "300" }}>{cause.name}</span>
                <span className="ob-cause__icon"><Icon /></span>
              </div>
            </div>);

        })}
      </div>
    </div>);

}


export { CausePriorities };
