import React, { useEffect } from 'react';
import { Icon } from '../icons/Icon';
import { ALLOCATION_DATA } from '../data/allocationData';
import { IMPACT_AREA_ICONS } from '../data/orgTaxonomy';
import { OrgLogoPlaceholder } from '../atoms/OrgLogoPlaceholder';
import { OpChartSVG } from './OpChartSVG';
import { OpAccordion } from './OpAccordion';

function OrgPanel({ org, onClose, cohortSize = 122 }) {
  // Close on Esc; lock body scroll while open.
  useEffect(() => {
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  // Build allocation data scoped to the org's tags so the treemap reflects
  // what's actually shown in the row. Uses a tiny seeded RNG so values stay
  // stable across renders for the same org+tag pair.
  function seed(s) {let h = 2166136261;for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);return (h >>> 0) % 1000 / 1000;}
  const TAG_GREYS = ["#92908B", "#C5C2BD", "#DEDBD6", "#EAE8E3", "#F0EDE8"];
  const TAG_COLORS = Object.fromEntries(ALLOCATION_DATA.map((a) => [a.name, a.color]));
  const weights = org.tags.map((t) => 0.3 + seed(org.name + t) * 0.7);
  const sumW = weights.reduce((a, b) => a + b, 0);
  const tagAlloc = org.tags.map((t, i) => ({
    name: t,
    size: Math.round(weights[i] / sumW * 100),
    color: TAG_COLORS[t] || TAG_GREYS[i % TAG_GREYS.length]
  }));
  const allocation = tagAlloc;

  return (
    <div className="op-overlay" role="dialog" aria-modal="true" aria-label={`${org.name} detail`}>
      <div className="op-backdrop" onClick={onClose} aria-hidden="true" />
      <aside className="op-panel">
        <button type="button" className="op-close" aria-label="Close detail panel" onClick={onClose}>
          <Icon.X />
        </button>

        {/* ── Header ── */}
        <header className="op-header" style={{ padding: "64px 0px 32px" }}>
          <div className="op-header__left">
            <OrgLogoPlaceholder name={org.name} size={60} />
            <div className="op-id">
              <h2 className="op-name" style={{ fontSize: "32px", fontWeight: "300" }}>{org.name}</h2>
              <div className="op-meta">
                <span className="op-meta__item">
                  <Icon.Pin />
                  <span style={{ fontSize: "14px" }}>{org.loc}</span>
                </span>
                <span className="op-meta__dot" aria-hidden="true">·</span>
                <span className="op-meta__item">
                  <Icon.Link />
                  <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: "14px" }}>Website</a>
                </span>
              </div>
              <div className="op-tags">
                {org.tags.map((tag) => {
                  const slug = tag.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <span key={tag} className={`impact-badge impact-badge--${slug}`} style={{ alignItems: "center" }}>
                      <span className="impact-badge__icon">{IMPACT_AREA_ICONS[tag]}</span>
                      <span style={{ fontSize: "14px", fontWeight: "300", color: "rgb(121, 119, 114)" }}>{tag}</span>
                    </span>);

                })}
              </div>
            </div>
          </div>
          <div className="op-backed" style={{ borderColor: "rgba(20, 17, 67, 0.1)" }}>
            <Icon.Check />
            <span>Backed by {cohortSize.toLocaleString()} Builders</span>
          </div>
        </header>

        <hr className="op-rule" />

        {/* ── Top stats ── */}
        <div className="op-stats" style={{ margin: "0px 0px 64px" }}>
          <div className="op-stat">
            <div className="op-stat__label" style={{ fontSize: "14px", fontWeight: "300", display: "flex", alignItems: "center", gap: "4px" }}>Tier <Icon.Info /></div>
            <div className="op-stat__value" style={{ fontSize: "24px", fontWeight: "300" }}>Tier {org.tier}</div>
          </div>
          <div className="op-stat">
            <div className="op-stat__label" style={{ fontSize: "14px", fontWeight: "300", display: "flex", alignItems: "center", gap: "4px" }}>Cost offset <Icon.Info /></div>
            <div className="op-stat__value" style={{ fontSize: "24px", fontWeight: "300" }}>$155,000</div>
          </div>
          <div className="op-stat">
            <div className="op-stat__label" style={{ fontSize: "14px", fontWeight: "300", display: "flex", alignItems: "center", gap: "4px" }}>Yearly people reached <Icon.Info /></div>
            <div className="op-stat__value" style={{ fontSize: "24px", fontWeight: "300" }}>{org.lives.toLocaleString()}</div>
          </div>
        </div>

        {/* ── Why we chose this partner ── */}
        <section className="op-section" style={{ margin: "0px 0px 55px" }}>
          <h3 className="op-h3" style={{ marginBottom: "4px", fontFamily: "\"PP Fragment Sans\"", padding: "0px 0px 16px", fontWeight: "300", fontSize: "20px" }}>Why we chose this partner</h3>
          <div className="pt-acc-list">
            <OpAccordion
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>}
              title="Social Impact"
              defaultOpen />
            <OpAccordion
              icon={<Icon.Pin />}
              title="Location" />
            <OpAccordion
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10" /><path d="M12 20v-6" /><path d="M12 14c0-4 4-6 8-6 0 4-2 8-8 8Z" /><path d="M12 14c0-3-3-5-7-5 0 3 2 6 7 6Z" /></svg>}
              title="Growth Potential" />
          </div>
        </section>

        {/* ── Point of Intervention ── */}
        <section className="op-section" style={{ margin: "0px 0px 55px" }}>
          <h3 className="op-h3" style={{ fontWeight: "300", fontSize: "20px" }}>Point of Intervention</h3>
          <p className="op-body" style={{ fontSize: "16px", fontWeight: "300", color: "rgb(121, 119, 114)" }}>Our intervention keeps individuals and families on stable footing.</p>
          <div className="op-poi" aria-hidden="true">
            <div className="op-poi__track">
              <span className="op-poi__fill" style={{ left: "22%", right: "15%" }} />
              <span className="op-poi__dot" style={{ left: "22%" }} />
              <span className="op-poi__dot" style={{ left: "85%" }} />
            </div>
            <div className="op-poi__labels">
              <span style={{ fontSize: "14px" }}>Suffering</span>
              <span style={{ fontSize: "14px" }}>Stable</span>
              <span style={{ fontSize: "14px", fontWeight: "300" }}>Flourishing</span>
            </div>
          </div>
        </section>

        {/* ── Two-column charts ── */}
        <section className="op-cols" style={{ margin: "0px 0px 55px" }}>
          <div className="op-col">
          {/* Cause Allocation — static treemap matching partner.jsx */}
          <div className="op-card op-card--alloc" style={{ borderRadius: "6px", borderColor: "rgba(20, 20, 19, 0.1)" }}>
            <div className="op-card__head">
              <span style={{ fontSize: "14px", fontWeight: "300" }}>Cause Allocation</span>
              <Icon.Info />
            </div>
            {(() => {
                const sorted = [...allocation].sort((a, b) => b.size - a.size);
                const [big, second, third, fourth] = sorted;
                return (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
                  <div className="pt-tm">
                    {second &&
                      <div className="pt-tm__col">
                        <div className="pt-tm__cell" style={{ borderColor: second.color }}>
                          <div className="pt-tm__pct" style={{ fontFamily: '"PP Fragment Sans"' }}>{second.size}%</div>
                          <div className="pt-tm__cat" style={{ fontSize: "14px" }}>{second.name}</div>
                        </div>
                      </div>
                      }
                    <div className="pt-tm__col pt-tm__col--wide">
                      <div className="pt-tm__cell pt-tm__cell--lg" style={{ borderColor: big.color }}>
                        <div className="pt-tm__pct" style={{ fontFamily: '"PP Fragment Sans"' }}>{big.size}%</div>
                        <div className="pt-tm__cat" style={{ fontSize: "14px" }}>{big.name}</div>
                      </div>
                    </div>
                  </div>
                  {(third || fourth) &&
                    <div className="pt-tm pt-tm--row">
                      {third &&
                      <div className="pt-tm__cell pt-tm__cell--row" style={{ borderColor: third.color }}>
                          <div className="pt-tm__pct" style={{ fontFamily: '"PP Fragment Sans"' }}>{third.size}%</div>
                          <div className="pt-tm__cat" style={{ fontSize: "12px" }}>{third.name}</div>
                        </div>
                      }
                      {fourth &&
                      <div className="pt-tm__cell pt-tm__cell--row" style={{ borderColor: fourth.color }}>
                          <div className="pt-tm__pct" style={{ fontFamily: '"PP Fragment Sans"' }}>{fourth.size}%</div>
                          <div className="pt-tm__cat" style={{ fontSize: "12px" }}>{fourth.name}</div>
                        </div>
                      }
                    </div>
                    }
                </div>);

              })()}
          </div>

          {/* Cost to impact */}
          <div className="op-card op-card--cost" style={{ borderColor: "rgba(20, 20, 19, 0.1)", borderRadius: "6px" }}>
            <div className="op-card__head">
              <span style={{ fontSize: "14px", fontWeight: "300" }}>Cost to impact a life</span>
              <Icon.Info />
            </div>
            <div className="op-cost">
              <span className="op-cost__amt" style={{ fontSize: "24px", fontWeight: "300" }}>$650</span>
              <span className="op-cost__unit" style={{ fontSize: "14px" }}>per outcome</span>
            </div>
          </div>
          </div>

          <div className="op-col">
          {/* Longevity — pt-chart style */}
          <div className="op-card op-card--chart" style={{ borderColor: "rgba(20, 20, 19, 0.1)", borderRadius: "6px" }}>
            <div className="pt-chart__head">
              <span className="pt-chart__title" style={{ fontFamily: '"PP Fragment Sans"', fontSize: "14px", padding: "0px 1px 0px 0px" }}>
                Longevity <Icon.Info style={{ marginLeft: 6 }} />
              </span>
              <button type="button" className="pt-chart__exp" aria-label="Expand longevity chart"><Icon.Maximize /></button>
            </div>
            <OpChartSVG height={140} />
            <div className="pt-chart__legend">
              <span><span style={{ display: "inline-block", width: "18px", height: "4px", borderRadius: "2px", background: "linear-gradient(90deg, #6F9DCB, #15315A)", verticalAlign: "middle", marginRight: "6px" }} />This Organization</span>
              <span><span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "2px", background: "#EAE8E3", border: "1px solid #92908B", verticalAlign: "middle", marginRight: "6px" }} />Average of others</span>
            </div>
          </div>

          {/* Depth of Intervention — pt-chart style */}
          <div className="op-card op-card--chart" style={{ borderColor: "rgba(20, 20, 19, 0.1)", borderRadius: "6px" }}>
            <div className="pt-chart__head">
              <span className="pt-chart__title" style={{ fontFamily: '"PP Fragment Sans"', fontSize: "14px", margin: "0px 6px 0px 0px" }}>
                Depth of Intervention <Icon.Info style={{ marginLeft: 6 }} />
              </span>
              <button type="button" className="pt-chart__exp" aria-label="Expand depth chart"><Icon.Maximize /></button>
            </div>
            <OpChartSVG height={140} />
            <div className="pt-chart__legend">
              <span><span style={{ display: "inline-block", width: "18px", height: "4px", borderRadius: "2px", background: "linear-gradient(90deg, #6F9DCB, #15315A)", verticalAlign: "middle", marginRight: "6px" }} />This Organization</span>
              <span><span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "2px", background: "#EAE8E3", border: "1px solid #92908B", verticalAlign: "middle", marginRight: "6px" }} />Average of others</span>
            </div>
          </div>
          </div>
        </section>

        {/* ── Outcomes and Impact ── */}
        <section className="op-section">
          <h3 className="op-h3" style={{ fontWeight: "300", fontSize: "20px" }}>Outcomes and Impact <Icon.Info /></h3>
          <ul className="op-outcomes__list">
            <li>
              <span className="op-num" style={{ fontSize: "24px", fontWeight: "300" }}>2,600</span>
              <span className="op-num-label" style={{ color: "rgb(121, 119, 114)", fontSize: "14px", fontWeight: "300" }}>individuals have become financially stable this year</span>
            </li>
            <li>
              <span className="op-num" style={{ fontSize: "24px", fontWeight: "300" }}>1,600</span>
              <span className="op-num-label" style={{ fontSize: "14px", color: "rgb(121, 119, 114)" }}>people have been housed this year</span>
            </li>
            <li>
              <span className="op-num" style={{ fontSize: "24px", fontWeight: "300" }}>340</span>
              <span className="op-num-label" style={{ fontSize: "14px", color: "rgb(121, 119, 114)" }}>evictions have been avoided this year</span>
            </li>
          </ul>
        </section>
      </aside>
    </div>);

}


export { OrgPanel };
