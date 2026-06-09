import React, { useState } from 'react';
import { Ic } from '../icons/Ic';
import { CAUSE_BY_ID } from '../data/causeAreas';
import { INITIATIVE_TAGS, LOCATION_ORG_COUNTS } from '../data/initiativeTags';
import { FocusBubbles } from '../atoms/FocusBubbles';

function ReviewStep({ order, locations, onBack, onSubmit }) {
  const top3 = order.slice(0, 3);
  const [openCause, setOpenCause] = useState(top3[0] || null);
  return (
    <div className="ob-step ob-review" style={{ gap: "40px" }}>
      <div className="ob-review__head" style={{ width: "900px" }}>
        <h2 className="ob-review__title" style={{ fontSize: "32px" }}>Your giving strategy</h2>
        <p className="ob-review__copy" style={{ width: "810px", fontSize: "16px", lineHeight: "1.25" }}>
          You're drawn to systemic barriers: climate and habitat collapse, education access, and the infrastructure that connects them. Your problem picks show people caught between immediate survival and long-term opportunity.
        </p>
      </div>

      <div className="ob-review__cols">
        <div>
          <section className="ob-review__section">
            <h3 className="ob-review__h3" style={{ fontSize: "24px" }}>Your top focus areas</h3>
            <div className="ob-review__badge">
              <Ic.Diamond />
              <span style={{ fontWeight: "300", fontSize: "14px", color: "var(--ffg-muted)" }}>You are part of the 5% of backers with these three top cause areas.</span>
            </div>
            <div className="ob-cause-cards">
              {top3.map((id, idx) => {
                const c = CAUSE_BY_ID[id];
                const Icon = c.icon;
                const isOpen = openCause === id;
                return (
                  <div key={id} className={"ob-cause-card" + (isOpen ? " is-open" : "")}>
                    <button
                      type="button"
                      className="ob-cause-card__head"
                      onClick={() => setOpenCause(isOpen ? null : id)}
                      aria-expanded={isOpen}>

                      <span className="ob-cause__icon"><Icon /></span>
                      <span className="ob-cause-card__name" style={{ fontSize: "16px" }}>{c.name}</span>
                      <span className="ob-cause-card__caret"><Ic.Caret /></span>
                    </button>
                    <div className="ob-cause-card__body">
                      <p className="ob-cause-card__copy" style={{ color: "var(--ffg-muted)", lineHeight: "1.25", fontWeight: "300", fontSize: "16px" }}>{c.description}</p>
                      {idx === 0 &&
                      <div className="ob-cause-card__meta">
                          <Ic.TrendingSm />
                          <span style={{ fontSize: "14px", fontWeight: "300", textAlign: "left" }}>{c.name} is the highest backed cause area</span>
                        </div>
                      }
                    </div>
                  </div>);

              })}
            </div>
          </section>

          <div className="ob-review__boxes">
            <div className="ob-box">
              <h4 className="ob-box__title" style={{ fontSize: "16px", fontWeight: "300" }}>Your initiatives</h4>
              <div className="ob-initiative-tags">
                {INITIATIVE_TAGS.map((t) =>
                <span key={t} className="ob-initiative-tag">{t}</span>
                )}
              </div>
            </div>
            <div className="ob-box">
              <h4 className="ob-box__title" style={{ fontSize: "16px", fontWeight: "300" }}>Your locations</h4>
              <div className="ob-loc-stats">
                {(locations.length ? locations : ["—"]).map((loc) =>
                <div key={loc} className="ob-loc-stat">
                    <span>{loc}</span>
                    <span className="ob-loc-stat__count">
                      {LOCATION_ORG_COUNTS[loc] != null ? `${LOCATION_ORG_COUNTS[loc]} Organizations to support` : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <FocusBubbles top3={top3} />
      </div>

      <div className="ob-review__actions">
        <button type="button" className="ob-btn ob-btn--ghost" onClick={onBack}>
          No, I want to make changes
        </button>
        <button type="button" className="ob-btn ob-btn--solid" onClick={onSubmit}>
          Yes, I approve
        </button>
      </div>
    </div>);

}


export { ReviewStep };
