// FFG Partner surface — ported from the prototype's partner.jsx shell.
// Single app toggling between the directory and an individual partner page.
import React, { useState, useEffect } from 'react';
import { FFGTopNav } from '../topnav-auth.jsx';
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
  return (
    <div className="app" data-gradient="off" style={{ fontSize: '14px', fontWeight: 200, background: 'transparent' }}>
      <FFGTopNav />
      <div className="shell" style={{ padding: '96px 48px 96px' }}>
        <PartnerApp />
      </div>
    </div>
  );
}
