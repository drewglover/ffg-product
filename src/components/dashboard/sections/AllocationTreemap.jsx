import { TOTAL_CONTRIBUTIONS, ALLOCATION_DATA } from '../data/allocationData';
import { CauseAllocationTreemap } from '../../shared/CauseAllocationTreemap';

/* ====== Impact allocation treemap (dashboard) ====== */
// Thin wrapper over the canonical CauseAllocationTreemap. The shared
// .pt-tm-grid is stretched to fill the chart card's column height by the
// .alloc-treemap-card .pt-tm-grid rule in styles.css.
function AllocationTreemap({ totalContrib = TOTAL_CONTRIBUTIONS }) {
  return <CauseAllocationTreemap data={ALLOCATION_DATA} />;
}


export { AllocationTreemap };
