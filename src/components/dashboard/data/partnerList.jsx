
// ── Partners from the Our Partners directory ──────────────────────────────
const PARTNER_LIST = [
{ name: "Jesse Tree", location: "Boise, Idaho", tags: ["Community", "Education"], cost: 142 },
{ name: "Bright Path Learning", location: "Detroit, Michigan", tags: ["Education", "Community"], cost: 168 },
{ name: "Open Harvest", location: "Lincoln, Nebraska", tags: ["Humanitarian", "Community"], cost: 96 },
{ name: "Riverstone Counsel", location: "Portland, Oregon", tags: ["Humanitarian", "Community"], cost: 214 },
{ name: "North Star Foundation", location: "Anchorage, Alaska", tags: ["Health", "Community"], cost: 312 },
{ name: "Common Ground", location: "Birmingham, Alabama", tags: ["Community", "Social Justice"], cost: 88 },
{ name: "Cedar Mountain Fund", location: "Boulder, Colorado", tags: ["Environment", "Education"], cost: 254 },
{ name: "Hearth & Home Trust", location: "Providence, RI", tags: ["Humanitarian", "Community"], cost: 178 },
{ name: "Daylight Initiative", location: "Memphis, Tennessee", tags: ["Social Justice", "Community"], cost: 122 },
{ name: "Greenline Project", location: "Cleveland, Ohio", tags: ["Environment", "Economic Growth"], cost: 196 },
{ name: "Skyline Schools", location: "Phoenix, Arizona", tags: ["Education", "Community"], cost: 145 },
{ name: "Westwater Aid", location: "Fresno, California", tags: ["Humanitarian", "Health"], cost: 109 },
{ name: "Maplewood Mentors", location: "Pittsburgh, PA", tags: ["Education", "Community"], cost: 164 },
{ name: "Coastal Watch", location: "Charleston, SC", tags: ["Environment", "Community"], cost: 188 },
{ name: "Stillwater Health", location: "Tulsa, Oklahoma", tags: ["Health", "Community"], cost: 232 },
{ name: "Lantern Refugee Aid", location: "Minneapolis, MN", tags: ["Community", "Economic Growth"], cost: 274 },
{ name: "Field & Plate", location: "Madison, Wisconsin", tags: ["Humanitarian", "Economic Growth"], cost: 118 },
{ name: "Beacon Recovery", location: "Manchester, NH", tags: ["Health", "Social Justice"], cost: 206 },
{ name: "Tideline Schools", location: "New Orleans, LA", tags: ["Education", "Community"], cost: 156 },
{ name: "Highland Land Trust", location: "Asheville, NC", tags: ["Environment", "Social Justice"], cost: 298 },
{ name: "Sunrise Shelter Net", location: "Salt Lake City, UT", tags: ["Humanitarian", "Community"], cost: 134 },
{ name: "Quiet Harbor Counsel", location: "Bangor, Maine", tags: ["Social Justice", "Community"], cost: 172 },
{ name: "Mesa Workforce", location: "Albuquerque, NM", tags: ["Economic Growth", "Education"], cost: 152 },
{ name: "Verdant Roots", location: "Atlanta, Georgia", tags: ["Humanitarian", "Education"], cost: 102 },
{ name: "Anchor Youth Works", location: "Baltimore, MD", tags: ["Economic Growth", "Social Justice"], cost: 198 },
{ name: "Inlet Conservancy", location: "Seattle, Washington", tags: ["Environment", "Health"], cost: 244 },
{ name: "Hearthstone Hospice", location: "Des Moines, Iowa", tags: ["Health", "Community"], cost: 286 },
{ name: "Plainsong Reading", location: "Wichita, Kansas", tags: ["Education", "Community"], cost: 116 },
{ name: "Borderlands Care", location: "El Paso, Texas", tags: ["Health", "Community"], cost: 158 },
{ name: "Foundry Civic", location: "Milwaukee, WI", tags: ["Community", "Education"], cost: 124 },
{ name: "Cinder Block Co-op", location: "Bronx, New York", tags: ["Humanitarian", "Economic Growth"], cost: 192 },
{ name: "Wildroot Schools", location: "Burlington, Vermont", tags: ["Education", "Environment"], cost: 178 },
{ name: "Steady Footing Fund", location: "Louisville, KY", tags: ["Humanitarian", "Community"], cost: 144 },
{ name: "Open Door Legal", location: "San Francisco, CA", tags: ["Social Justice", "Community"], cost: 226 },
{ name: "Cornerstone Reentry", location: "Newark, NJ", tags: ["Social Justice", "Economic Growth"], cost: 168 },
{ name: "Bluegrass Roots", location: "Lexington, Kentucky", tags: ["Humanitarian", "Community"], cost: 98 }];


function _pSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619) >>> 0;
  return h;
}
const _STRATS = ["Angel", "SPV", "Fund", "Granted", "Pooled"];

const ORGS = PARTNER_LIST.map((p) => {
  const confidence = _pSeed(p.name + "c") % 40 + 60; // 60–99% confidence level
  const strategy = _STRATS[_pSeed(p.name + "s") % _STRATS.length];
  const lives = Math.round((_pSeed(p.name + "l") % 38000 + 3000) / 100) * 100;
  const donated = Math.round((_pSeed(p.name + "d") % 11000 + 2000) / 100) * 100;
  const livesImpacted = _pSeed(p.name + "i") % 291 + 10; // 10–300 lives impacted
  return { name: p.name, loc: p.location, confidence, strategy, lives, donated, livesImpacted, tags: p.tags };
});


export { PARTNER_LIST, _pSeed, _STRATS, ORGS };
