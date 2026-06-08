// FFG Dashboard surface — ported from the prototype's app.jsx shell.
// The control room: hero, transfer status, impact charts, allocation,
// updates. The floating TweaksPanel switches the donation-status phase.
import React, { useState, useEffect } from 'react';
import { useTweaks, TweaksPanel, TweakSection, TweakRadio } from '../tweaks-panel.jsx';
import { DENSITY_PRESETS } from '../components/dashboard/data/densityPresets.jsx';
import { Hero } from '../components/dashboard/sections/Hero.jsx';
import { TransferStatus } from '../components/dashboard/sections/TransferStatus.jsx';
import { PageTabs } from '../components/dashboard/sections/PageTabs.jsx';
import { ImpactOverview } from '../components/dashboard/sections/ImpactOverview.jsx';
import { ImpactAreasSection } from '../components/dashboard/sections/ImpactAreasSection.jsx';
import { TransactionHistorySection } from '../components/dashboard/sections/TransactionHistorySection.jsx';
import { UpdatesSection } from '../components/dashboard/sections/UpdatesSection.jsx';
import { RidgeDivider } from '../components/dashboard/atoms/RidgeDivider.jsx';

const TWEAK_DEFAULTS = {
  name: 'McKay',
  livesCount: 15,
  density: 'default',
  cohortSize: 122,
  firstGiveDate: 'April 15, 2026',
  phase: 'in-progress',
};

export default function Dashboard() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [pageTab, setPageTab] = useState('overview');
  const [allocAmount, setAllocAmount] = useState(200000);

  // Pin to the top on mount. The staggered section entrances start at
  // translateY(10px); with scroll anchoring on, that settling otherwise
  // nudges the page down ~10px on load. Reset before paint so we never
  // land mid-scroll.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Apply tweaks as CSS variables on the document root
  useEffect(() => {
    const r = document.documentElement.style;
    const preset = DENSITY_PRESETS[t.density] || DENSITY_PRESETS.default;
    r.setProperty('--type-hero', preset.hero + 'px');
    r.setProperty('--type-section', preset.section + 'px');
    r.setProperty('--type-card-title', preset.card + 'px');
  }, [t.density]);

  return (
    <>
      <div className="shell">
        <Hero phase={t.phase} name={t.name} livesCount={t.livesCount} onAmountConfirm={setAllocAmount} confirmedAmount={allocAmount} onTabChange={setPageTab} />
        <TransferStatus phase={t.phase} firstGiveDate={t.firstGiveDate} />
        <PageTabs value={pageTab} onChange={setPageTab} />
        {pageTab === 'overview' && <ImpactOverview accent={t.accent} totalContrib={allocAmount} onTabChange={setPageTab} />}
        {pageTab === 'areas' && <ImpactAreasSection cohortSize={t.cohortSize} />}
        {pageTab === 'history' && <TransactionHistorySection phase={t.phase} />}
        {pageTab === 'overview' && <UpdatesSection />}
        <RidgeDivider />
      </div>

      <TweaksPanel>
        <TweakSection label="Donation status" />
        <TweakRadio
          label="State"
          value={t.phase}
          options={['preview', 'in-progress', 'allocated']}
          onChange={(v) => setTweak('phase', v)} />
      </TweaksPanel>
    </>
  );
}
