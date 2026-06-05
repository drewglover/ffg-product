
/* Loose data approximating reference rhythm: stair-step bars, smooth area to upper-right. */
const IMPACT_DATA_YEAR = [
{ m: "Oct '25", dollars: 64000, outcomes: 240 },
{ m: "Nov '25", dollars: 205000, outcomes: 380 },
{ m: "Dec '25", dollars: 28000, outcomes: 210 },
{ m: "Jan '26", dollars: 96000, outcomes: 460 },
{ m: "Feb '26", dollars: 253000, outcomes: 1180 },
{ m: "Mar '26", dollars: 168000, outcomes: 1820 },
{ m: "Apr '26", dollars: 84000, outcomes: 2760 },
{ m: "May '26", dollars: 52000, outcomes: 3000 }];

const IMPACT_DATA_WEEK = [
{ m: "Wk 1", dollars: 22000, outcomes: 60 },
{ m: "Wk 2", dollars: 14000, outcomes: 95 },
{ m: "Wk 3", dollars: 31000, outcomes: 110 },
{ m: "Wk 4", dollars: 9000, outcomes: 175 },
{ m: "Wk 5", dollars: 28000, outcomes: 220 },
{ m: "Wk 6", dollars: 47000, outcomes: 340 },
{ m: "Wk 7", dollars: 19000, outcomes: 480 },
{ m: "Wk 8", dollars: 30000, outcomes: 595 }];

const IMPACT_DATA_DAY = [
{ m: "Mon", dollars: 6400, outcomes: 12 },
{ m: "Tue", dollars: 8200, outcomes: 24 },
{ m: "Wed", dollars: 3100, outcomes: 38 },
{ m: "Thu", dollars: 11200, outcomes: 51 },
{ m: "Fri", dollars: 4400, outcomes: 70 },
{ m: "Sat", dollars: 9700, outcomes: 92 },
{ m: "Sun", dollars: 5200, outcomes: 108 }];

const IMPACT_DATA_BY_PERIOD = { day: IMPACT_DATA_DAY, week: IMPACT_DATA_WEEK, year: IMPACT_DATA_YEAR };


export { IMPACT_DATA_YEAR, IMPACT_DATA_WEEK, IMPACT_DATA_DAY, IMPACT_DATA_BY_PERIOD };
