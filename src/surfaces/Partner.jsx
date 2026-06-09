// FFG Partner surface — ported from the prototype's partner.jsx shell.
// Single app toggling between the directory and an individual partner page.
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PartnerDetail } from '../components/partner/sections/PartnerDetail.jsx';
import { Directory } from '../components/partner/sections/Directory.jsx';
import { PARTNERS } from '../components/partner/data/partners.jsx';

function PartnerApp() {
  // URL-driven: /partner shows the directory, /partner/:name opens that detail.
  // This lets other surfaces (e.g. the dashboard org rows) deep-link to a partner.
  const { name } = useParams();
  const navigate = useNavigate();
  const active = name ? PARTNERS.find((p) => p.name === decodeURIComponent(name)) ?? null : null;

  // Reset scroll when switching between directory and detail.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [name]);

  return (
    <div className="pt-app">
      {active ?
        <PartnerDetail partner={active} onBack={() => navigate('/partner')} /> :
        <Directory onOpen={(p) => navigate(`/partner/${encodeURIComponent(p.name)}`)} />}
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
