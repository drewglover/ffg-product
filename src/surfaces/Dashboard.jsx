// FFG Dashboard surface — ported from the prototype's app.jsx shell.
// The control room: hero, transfer status, impact charts, allocation,
// updates. The floating TweaksPanel switches the donation-status phase.
import React, { useState, useEffect } from 'react';
import { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakToggle } from '../tweaks-panel.jsx';
import { DENSITY_PRESETS } from '../components/dashboard/data/densityPresets.jsx';
import { Hero } from '../components/dashboard/sections/Hero.jsx';
import { Progress } from '../components/dashboard/sections/hero/Progress.jsx';
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
  welcome: 'new good',
  dynamicAction: 'auto',
  stepCount: 4,
  showProgress: true,
};

// Step labels per progress variant. The 4-step variant keeps the original
// transfer copy (including the dollar amount on the first step).
const STEP_LABELS = {
  3: ['Transfer initiated', 'Funds received', 'Funds distributed'],
  4: ['Transfer initiated: $200,000', 'Funds received', 'Allocation in progress', 'Funds distributed'],
  5: ['Transfer initiated', 'Allocate funds', 'Vetting', 'Review vetting', 'Funds distributed'],
};

// Which dynamic-action variant a phase maps to when the tweak is on "auto".
const PHASE_DEFAULT_ACTION = {
  preview: 'annual giving',
  'in-progress': 'none',
  allocated: 'hero-actions',
};

// Build the stepper data for the current phase + step count. "allocated"
// completes every step; "in-progress" lands mid-way (last step pending, the
// one before it active); "preview" shows no stepper at all.
function buildSteps(phase, stepCount, date) {
  if (phase === 'preview') return [];
  const labels = STEP_LABELS[stepCount] || STEP_LABELS[4];
  const activeIdx = labels.length - 2; // second-to-last is "in progress"
  return labels.map((label, i) => {
    if (phase === 'allocated') {
      return { label, date, progress: 100, state: 'done' };
    }
    if (i < activeIdx) return { label, date, progress: 100, state: 'done' };
    if (i === activeIdx) return { label, date, progress: 62, state: 'active' };
    return { label, date, progress: 0, state: 'pending' };
  });
}

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

  const dynamicAction = t.dynamicAction === 'auto'
    ? (PHASE_DEFAULT_ACTION[t.phase] || 'none')
    : t.dynamicAction;
  const steps = buildSteps(t.phase, Number(t.stepCount), t.firstGiveDate);
  const progressTitle = t.phase === 'allocated' ? 'Transfer complete' : 'Transfer in progress';

  return (
    <>
      <div className="shell">
        <Hero
          name={t.name}
          livesCount={t.livesCount}
          onTabChange={setPageTab}
          welcomeState={t.welcome}
          dynamicAction={dynamicAction}
          onAmountConfirm={setAllocAmount}
          confirmedAmount={allocAmount} />
        {t.showProgress && (
          <Progress
            title={progressTitle}
            steps={steps}
            dismissible={t.phase === 'allocated'} />
        )}
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
        <TweakSection label="Hero" />
        <TweakSelect
          label="Welcome"
          value={t.welcome}
          options={['new good', 'generic', 'initial']}
          onChange={(v) => setTweak('welcome', v)} />
        <TweakSelect
          label="Dynamic area"
          value={t.dynamicAction}
          options={['auto', 'none', 'annual giving', 'in action', 'vetting', 'hero-actions']}
          onChange={(v) => setTweak('dynamicAction', v)} />
        <TweakToggle
          label="Show progress"
          value={t.showProgress}
          onChange={(v) => setTweak('showProgress', v)} />
        <TweakRadio
          label="Progress"
          value={t.stepCount}
          options={[3, 4, 5]}
          onChange={(v) => setTweak('stepCount', v)} />
      </TweaksPanel>
    </>
  );
}
