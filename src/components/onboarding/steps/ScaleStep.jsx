import React, { useState, useMemo } from 'react';
import { Ic } from '../icons/Ic';
import { SCALES } from '../data/scales';
import { LOCATIONS, LOCATION_TYPE_BY_NAME } from '../data/locationSuggestions';

/* ── Step 5: scale + locations ───────────────────────── */
function ScaleStep({ scales, setScales, locations, setLocations }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const toggleScale = (id) => {
    setScales(scales.includes(id) ? scales.filter((s) => s !== id) : [...scales, id]);
  };
  const addLocation = (name) => {
    if (!locations.includes(name)) setLocations([...locations, name]);
    setQuery("");
  };
  const removeLocation = (name) => setLocations(locations.filter((l) => l !== name));

  /* Type-aware icon: continents and countries get the globe, smaller
     geographies (states, cities) get the pin. Falls back to pin for
     anything not in the dataset (e.g. a persisted legacy value). */
  const iconForType = (t) => (t === "continent" || t === "country" ? <Ic.Globe /> : <Ic.MapPin />);

  /* Filter + rank suggestions:
       1. Name starts with the query
       2. Any token in the name starts with the query (e.g. "york" → "New York…")
       3. Substring anywhere
     Ties broken by the original list order (continents → countries → states → cities),
     which roughly tracks specificity from broad to narrow. */
  const matches = useMemo(() => {
    const raw = query.trim();
    if (!raw) return [];
    const q = raw.toLowerCase();
    const scored = [];
    for (let i = 0; i < LOCATIONS.length; i++) {
      const loc = LOCATIONS[i];
      if (locations.includes(loc.name)) continue;
      const lower = loc.name.toLowerCase();
      let score;
      if (lower.startsWith(q)) score = 0;
      else if (lower.split(/[\s,]+/).some((tok) => tok.startsWith(q))) score = 1;
      else if (lower.includes(q)) score = 2;
      else continue;
      scored.push({ loc, score, idx: i });
    }
    scored.sort((a, b) => a.score - b.score || a.idx - b.idx);
    return scored.slice(0, 7).map((s) => s.loc);
  }, [query, locations]);

  return (
    <div className="ob-step">
      <h2 className="ob-title">Where do you want to make an impact?</h2>
      <p className="ob-subtitle">Select the scales your interested in supporting</p>

      <div className="ob-scales">
        {SCALES.map((s) => {
          const Icon = s.icon;
          const isSel = scales.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              className={"ob-scale" + (isSel ? " is-selected" : "")}
              onClick={() => toggleScale(s.id)}
              aria-pressed={isSel}>

              <div className="ob-scale__top">
                <span className="ob-scale__icon"><Icon width="22" height="22" /></span>
                <span className="ob-scale__check"><Ic.Check /></span>
              </div>
              <div className="ob-scale__name">{s.name}</div>
            </button>);

        })}
      </div>

      {scales.length > 0 && <>
        <div className="ob-loc-search">
          <Ic.Search />
          <input
            type="text"
            placeholder="Search a city, state, country, or continent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 120)}
            aria-label="Search location" />

        </div>
        {focused && query.trim() && (
          matches.length > 0 ?
          <div className="ob-loc-suggest" role="listbox">
              {matches.map((m) =>
            <button key={m.name} type="button" onClick={() => addLocation(m.name)} role="option">
                  {iconForType(m.type)}
                  <span>{m.name}</span>
                  <small style={{ marginLeft: "auto", color: "var(--ffg-muted)", fontSize: "11px", textTransform: "capitalize", letterSpacing: "0.04em" }}>{m.type}</small>
                </button>
            )}
            </div> :

          <div className="ob-loc-suggest" role="listbox" aria-live="polite">
              <div style={{ padding: "10px 14px", fontSize: "13px", color: "var(--ffg-muted)", letterSpacing: "0.005em" }}>
                No matches for “{query.trim()}”
              </div>
            </div>
        )}

        <div className="ob-loc-list">
          {locations.map((loc) => {
            const t = LOCATION_TYPE_BY_NAME[loc];
            return (
              <div className="ob-loc-row" key={loc}>
                {iconForType(t)}
                <span className="ob-loc-row__name">{loc}</span>
                <button type="button" className="ob-loc-row__remove" onClick={() => removeLocation(loc)} aria-label={`Remove ${loc}`}>
                  <Ic.X />
                </button>
              </div>);

          })}
        </div>
      </>}
    </div>);

}


export { ScaleStep };
