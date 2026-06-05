import React, { useState } from 'react';
import { IMPACT_DATA_BY_PERIOD } from '../data/impactData';
import { IMPACT_AREAS } from '../data/orgTaxonomy';
import { FilterChip } from '../atoms/FilterChip';
import { Stat } from '../atoms/Stat.app';
import { AllocModal } from '../modals/AllocModal';
import { ImpactChart } from './ImpactChart';
import { AllocationTreemap } from './AllocationTreemap';

/* ====== Impact Overview Section ====== */
function ImpactOverview({ accent, totalContrib = 200000, onTabChange }) {
  const [allocModalOpen, setAllocModalOpen] = useState(false);
  const [scope, setScope] = useState("you");
  const [areaFilter, setAreaFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("actual");
  const [periodFilter, setPeriodFilter] = useState("year");

  const scale = scope === "factory" ? 15 : 1;
  const livesValue = Math.round(34000 * scale).toLocaleString();
  const orgsValue = Math.round(142 * scale).toLocaleString();
  const contribValue = "$" + Math.round(totalContrib * scale).toLocaleString();
  const periodData = IMPACT_DATA_BY_PERIOD[periodFilter];

  return (
    <>
    <section className="section-block" aria-label="Impact overview" style={{ padding: "0px 0px 110px" }}>
      <div className="overview-topbar" data-comment-anchor="6bc2ea5625-div-1335-7" style={{ alignItems: "center", margin: "0px 0px 24px" }}>
        <h2 className="overview-title">What you're building</h2>
        <div className="scope-toggle" role="group" aria-label="Impact scope" style={{ marginLeft: "auto" }}>
          <button
              type="button"
              className={"scope-toggle__btn" + (scope === "you" ? " is-active" : "")}
              aria-pressed={scope === "you"}
              onClick={() => setScope("you")} style={{ fontSize: "14px", fontWeight: "300" }}>
            Your impact</button>
          <button
              type="button"
              className={"scope-toggle__btn" + (scope === "factory" ? " is-active" : "")}
              aria-pressed={scope === "factory"}
              onClick={() => setScope("factory")} style={{ fontSize: "14px", fontWeight: "300" }}>
            Factory impact</button>
        </div>
      </div>
      <div className="stats-row" key={scope} style={{ marginBottom: "64px" }}>
        <Stat label="Projected lives reached" value={livesValue} rawNum={Math.round(34000 * scale)} trend="+100% increase this month" onClick={() => {const el = document.getElementById("impact-chart");if (el) el.scrollIntoView ? window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" }) : null;}} />
        <Stat label="Projected organizations supported" value={orgsValue} rawNum={Math.round(142 * scale)} trend="+100% increase this month" onClick={() => onTabChange && onTabChange("areas")} />
        <Stat label="Total contributions" value="$10,928" trend="+100% increase this month" onClick={() => onTabChange && onTabChange("history")} />
      </div>

      <div className="impact">
        <div className="chart-card" id="impact-chart">
          <div className="chart-header" style={{ padding: "0px 0px 12px" }}>
            <h3 className="chart-title">{scope === "factory" ? "Factory impact growth" : "Your impact growth"}</h3>
            <div className="chart-filters">
              <FilterChip
                  value={areaFilter}
                  onChange={setAreaFilter}
                  options={[{ value: "all", label: "All impact areas" }, ...IMPACT_AREAS.map((a) => ({ value: a, label: a }))]}
                  ariaLabel="Filter by impact area" />

              <FilterChip
                  value={modeFilter}
                  onChange={setModeFilter}
                  options={[{ value: "actual", label: "Actual" }, { value: "projected", label: "Projected" }]}
                  ariaLabel="Actual or projected" />

              <FilterChip
                  value={periodFilter}
                  onChange={setPeriodFilter}
                  options={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "year", label: "Year" }]}
                  ariaLabel="Time period" />

            </div>
          </div>
          <ImpactChart accent={accent} data={periodData} scale={scale} mode={modeFilter} />
          <div className="chart-legend" style={{ justifyContent: "center", alignItems: "center", gap: "16px" }}>
            <span className="chart-legend__item" style={{ fontSize: "14px", padding: "0px 12px 0px 0px", alignItems: "center", gap: "4px" }}>
              <span className="chart-legend__swatch chart-legend__swatch--bar" style={{ flexShrink: 0 }} />
              Dollars given
            </span>
            <span className="chart-legend__item" style={{ fontSize: "14px", padding: "0px", alignItems: "center", gap: "4px" }}>
              <span className="chart-legend__swatch chart-legend__swatch--area" style={{ flexShrink: 0 }} />
              Outcomes created
            </span>
          </div>
        </div>

        <div className="alloc-treemap-card">
          <div className="alloc-treemap-head" style={{ padding: "0px", alignItems: "flex-start", height: "40px", margin: "0px" }}>
            <h3 className="chart-title">Impact areas</h3>
            <button className="alloc-treemap-view-btn" onClick={() => setAllocModalOpen(true)}>View</button>
          </div>
          <AllocationTreemap totalContrib={totalContrib} />
        </div>
      </div>
    </section>
    {allocModalOpen && <AllocModal onClose={() => setAllocModalOpen(false)} />}
    </>);


}


export { ImpactOverview };
