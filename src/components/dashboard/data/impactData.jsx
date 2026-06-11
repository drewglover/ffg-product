
/* Loose data approximating reference rhythm: stair-step bars, smooth area to upper-right. */
const IMPACT_DATA_YEAR = [
{ m: "Oct '25", dollars: 64000, outcomes: 240, balance: 120000 },
{ m: "Nov '25", dollars: 205000, outcomes: 380, balance: 286000 },
{ m: "Dec '25", dollars: 28000, outcomes: 210, balance: 264000 },
{ m: "Jan '26", dollars: 96000, outcomes: 460, balance: 332000 },
{ m: "Feb '26", dollars: 253000, outcomes: 1180, balance: 548000 },
{ m: "Mar '26", dollars: 168000, outcomes: 1820, balance: 672000 },
{ m: "Apr '26", dollars: 84000, outcomes: 2760, balance: 728000 },
{ m: "May '26", dollars: 52000, outcomes: 3000, balance: 760000 }];

const IMPACT_DATA_WEEK = [
{ m: "Wk 1", dollars: 22000, outcomes: 60, balance: 41000 },
{ m: "Wk 2", dollars: 14000, outcomes: 95, balance: 49000 },
{ m: "Wk 3", dollars: 31000, outcomes: 110, balance: 72000 },
{ m: "Wk 4", dollars: 9000, outcomes: 175, balance: 76000 },
{ m: "Wk 5", dollars: 28000, outcomes: 220, balance: 96000 },
{ m: "Wk 6", dollars: 47000, outcomes: 340, balance: 134000 },
{ m: "Wk 7", dollars: 19000, outcomes: 480, balance: 146000 },
{ m: "Wk 8", dollars: 30000, outcomes: 595, balance: 168000 }];

const IMPACT_DATA_DAY = [
{ m: "Mon", dollars: 6400, outcomes: 12, balance: 12000 },
{ m: "Tue", dollars: 8200, outcomes: 24, balance: 18000 },
{ m: "Wed", dollars: 3100, outcomes: 38, balance: 20000 },
{ m: "Thu", dollars: 11200, outcomes: 51, balance: 29000 },
{ m: "Fri", dollars: 4400, outcomes: 70, balance: 32000 },
{ m: "Sat", dollars: 9700, outcomes: 92, balance: 40000 },
{ m: "Sun", dollars: 5200, outcomes: 108, balance: 44000 }];

const IMPACT_DATA_BY_PERIOD = { day: IMPACT_DATA_DAY, week: IMPACT_DATA_WEEK, year: IMPACT_DATA_YEAR };


export { IMPACT_DATA_YEAR, IMPACT_DATA_WEEK, IMPACT_DATA_DAY, IMPACT_DATA_BY_PERIOD };
