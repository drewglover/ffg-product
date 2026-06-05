// FFG Partner surface — ported from the prototype's partner.jsx shell.
// Single app toggling between the directory and an individual partner page.
import React, { useState, useEffect } from 'react';
import { PartnerDetail } from '../components/partner/sections/PartnerDetail.jsx';
import { Directory } from '../components/partner/sections/Directory.jsx';

function PartnerApp() {
  const [active, setActive] = useState(null); // null = directory, partner obj = detail

  // Reset scroll when switching
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [active]);

  return (
    <div className="pt-app">
      {active ?
        <PartnerDetail partner={active} onBack={() => setActive(null)} /> :
        <Directory onOpen={(p) => setActive(p)} />}
    </div>);
}

export default function Partner() {
  // The .app wrapper (transparent background + lighter type scale) and the top
  // nav are supplied by AuthLayout — see this route's `handle` in main.jsx.
  // Uses the shared responsive .shell padding (no inline override).
  return (
    <div className="shell">
      <PartnerApp />
    </div>
  );
}
