
/* ====== Impact allocation treemap ====== */
// Colors are derived from CATEGORY_ICONS (single source of truth) in the
// shared CauseAllocationTreemap, so only name + size live here.
const TOTAL_CONTRIBUTIONS = 200000; // fallback; live value passed as prop
const ALLOCATION_DATA = [
{ name: "Social Justice", size: 40 },
{ name: "Culture", size: 20 },
{ name: "Education", size: 20 },
{ name: "Community", size: 15 },
{ name: "Environment", size: 5 }];


export { TOTAL_CONTRIBUTIONS, ALLOCATION_DATA };
