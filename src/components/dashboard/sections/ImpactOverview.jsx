import React, { useState } from 'react';
import { IMPACT_DATA_BY_PERIOD } from '../data/impactData';
import { IMPACT_AREAS } from '../data/orgTaxonomy';
import { FilterChip } from '../atoms/FilterChip';
import { Stat } from '../atoms/Stat.app';
import { AllocModal } from '../modals/AllocModal';
import { ImpactChart } from './ImpactChart';
import { AllocationTreemap } from './AllocationTreemap';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

/* ====== Impact Overview Section ====== */
function ImpactOverview({ accent, totalContrib = 200000, onTabChange }) {
  const [allocModalOpen, setAllocModalOpen] = useState(false);
  const [scope, setScope] = useState("you");
  const [areaFilter, setAreaFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("actual");
  const [periodFilter, setPeriodFilter] = useState("year");

  const scale = scope === "factory" ? 15 : scope === "circle" ? 5 : 1;
  const livesValue = Math.round(34000 * scale).toLocaleString();
  const orgsValue = Math.round(142 * scale).toLocaleString();
  // Contributions scale with scope just like lives/outcomes (you → circle → factory).
  const contribNum = Math.round(10928 * scale);
  const periodData = IMPACT_DATA_BY_PERIOD[periodFilter];

  // Randomized once per mount so the figures stay put across scope re-renders.
  const trends = React.useMemo(() => {
    const rand = () => Math.floor(Math.random() * 56) + 40; // 40–95%
    return {
      contrib: `+${rand()}% increase this month`,
      outcomes: `+${rand()}% increase this month`,
      lives: `+${rand()}% increase this month`
    };
  }, []);

  return (
    <>
    <section className="section-block" aria-label="Impact overview">
      <div className="overview-topbar" data-comment-anchor="6bc2ea5625-div-1335-7">
        <h2 className="overview-title">What you're building</h2>
        <ToggleGroup
            variant="outline"
            value={[scope]}
            onValueChange={(vals) => vals[0] && setScope(vals[0])}
            aria-label="Impact scope">
          <ToggleGroupItem value="you">Your impact</ToggleGroupItem>
          <ToggleGroupItem value="circle">Circle impact</ToggleGroupItem>
          <ToggleGroupItem value="factory">Factory impact</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="stats-row">
        <Stat scope={scope} label="Contributions" value={"$" + contribNum.toLocaleString()} rawNum={contribNum} prefix="$" trend={trends.contrib} onClick={() => onTabChange && onTabChange("history")} />
        <Stat scope={scope} label="Outcomes" value={orgsValue} rawNum={Math.round(142 * scale)} trend={trends.outcomes} onClick={() => onTabChange && onTabChange("areas")} />
        <Stat scope={scope} label="Lives impacted" value={livesValue} rawNum={Math.round(34000 * scale)} trend={trends.lives} onClick={() => {const el = document.getElementById("impact-chart");if (el) el.scrollIntoView ? window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" }) : null;}} />
      </div>

      <div className="impact">
        <div className="chart-card" id="impact-chart">
          <div className="chart-header">
            <h3 className="chart-title">{scope === "factory" ? "Factory impact growth" : scope === "circle" ? "Circle impact growth" : "Your impact growth"}</h3>
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
          <div className="chart-legend">
            <span className="chart-legend__item" style={{ fontSize: "14px" }}>
              <span className="chart-legend__swatch chart-legend__swatch--bar" />
              Dollars given
            </span>
            <span className="chart-legend__item" style={{ fontSize: "14px" }}>
              <span className="chart-legend__swatch chart-legend__swatch--area" />
              Outcomes created
            </span>
          </div>
        </div>

        <div className="alloc-treemap-card">
          <div className="alloc-treemap-head">
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
