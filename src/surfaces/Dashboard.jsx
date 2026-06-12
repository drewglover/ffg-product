// FFG Dashboard surface — ported from the prototype's app.jsx shell.
// The control room: hero, transfer status, impact charts, allocation,
// updates. The floating TweaksPanel switches the donation-status phase.
import React, { useState, useEffect } from 'react';
import { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakToggle } from '../tweaks-panel.jsx';
import { DENSITY_PRESETS } from '../components/dashboard/data/densityPresets.jsx';
import { Hero } from '../components/dashboard/sections/Hero.jsx';
import { UpdatesArea } from '../components/dashboard/sections/UpdatesArea.jsx';
import { PageTabs } from '../components/dashboard/sections/PageTabs.jsx';
import { ImpactOverview } from '../components/dashboard/sections/ImpactOverview.jsx';
import { ImpactAreasSection } from '../components/dashboard/sections/ImpactAreasSection.jsx';
import { TransactionHistorySection } from '../components/dashboard/sections/TransactionHistorySection.jsx';
import { UpdatesSection } from '../components/shared/UpdatesSection.jsx';
import { UPDATE_ITEMS } from '../components/dashboard/data/updateItems.jsx';
import { RidgeDivider } from '../components/dashboard/atoms/RidgeDivider.jsx';
import { pulse as pulseGradient } from '../lib/gradient/controller.js';

const TWEAK_DEFAULTS = {
  name: 'McKay',
  livesCount: 15,
  density: 'default',
  cohortSize: 122,
  firstGiveDate: 'April 15, 2026',
  phase: 'in-progress',
  welcome: 'new good',
  allocationCard: true,
  update: 'auto',
  stepCount: 4,
};

// Copy presets for the non-status update types, rehomed from the old hero
// callouts / action prompts.
const UPDATE_PRESETS = {
  'update-action':   { title: 'Get your good in action.', copy: 'Your transfer is ready to be wired so your good can begin.', action: { label: 'Wire funds' } },
  'update-advisory': { title: "We're vetting your requested organizations.", copy: "We'll send you an update in 3-4 weeks." },
  'update-general':  { title: 'Your funds are being put to work.', copy: "Outcomes are visible in your dash, we'll send you impact stories as they happen." },
};

// Which update a phase shows when the tweak is on "auto".
const PHASE_DEFAULT_UPDATE = {
  preview: 'action',
  'in-progress': 'status',
  allocated: 'general',
};

// Resolve the tweak + phase into a single update object for UpdatesArea.
function buildUpdate(updateTweak, phase, steps, title) {
  const kind = updateTweak === 'auto' ? (PHASE_DEFAULT_UPDATE[phase] || 'none') : updateTweak;
  if (kind === 'none') return null;
  if (kind === 'status') {
    if (!steps.length) return null;
    return { type: 'update-status', title, steps };
  }
  const type = `update-${kind}`;
  return UPDATE_PRESETS[type] ? { type, ...UPDATE_PRESETS[type] } : null;
}

// Step labels per progress variant. The 4-step variant keeps the original
// transfer copy (including the dollar amount on the first step).
const STEP_LABELS = {
  3: ['Transfer initiated', 'Funds received', 'Funds distributed'],
  4: ['Transfer initiated: $200,000', 'Funds received', 'Allocation in progress', 'Funds distributed'],
  5: ['Transfer initiated', 'Allocate funds', 'Vetting', 'Final selection', 'Funds distributed'],
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
    if (i === activeIdx) {
      // Active bar spans full width (keeps the pulse); the 4-step variant
      // surfaces a nonprofit-selection action in place of the date.
      const step = { label, date, progress: 100, state: 'active' };
      if (stepCount === 4) step.action = { label: 'Choose nonprofits' };
      if (stepCount === 5) step.action = { label: 'Review vetting' };
      return step;
    }
    return { label, date, progress: 0, state: 'pending' };
  });
}

export default function Dashboard() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [pageTab, setPageTab] = useState('overview');
  const [allocAmount, setAllocAmount] = useState(200000);

  // Committing a higher annual donation ripples the background mesh. Decreases
  // (or no-change) commit silently.
  const handleAmountConfirm = (next) => {
    if (next > allocAmount) pulseGradient();
    setAllocAmount(next);
  };

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

  const steps = buildSteps(t.phase, Number(t.stepCount), t.firstGiveDate);
  const progressTitle = t.phase === 'allocated' ? 'Transfer complete' : 'Transfer in progress';
  const update = buildUpdate(t.update, t.phase, steps, progressTitle);

  return (
    <>
      <div className="shell">
        <Hero
          name={t.name}
          livesCount={t.livesCount}
          onTabChange={setPageTab}
          welcomeState={t.welcome}
          allocationCard={t.allocationCard}
          onAmountConfirm={handleAmountConfirm}
          confirmedAmount={allocAmount} />
        <UpdatesArea key={update?.type || 'none'} update={update} />
        <PageTabs value={pageTab} onChange={setPageTab} />
        {pageTab === 'overview' && <ImpactOverview accent={t.accent} totalContrib={allocAmount} onTabChange={setPageTab} />}
        {pageTab === 'areas' && <ImpactAreasSection cohortSize={t.cohortSize} />}
        {pageTab === 'history' && <TransactionHistorySection phase={t.phase} />}
        {pageTab === 'overview' && <UpdatesSection items={UPDATE_ITEMS} />}
        <RidgeDivider />
      </div>

      <TweaksPanel title="Tweaks & States">
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
          options={['new good', 'generic', 'initial', 'none']}
          onChange={(v) => setTweak('welcome', v)} />
        <TweakToggle
          label="Allocation card"
          value={t.allocationCard}
          onChange={(v) => setTweak('allocationCard', v)} />
        <TweakSection label="Updates" />
        <TweakSelect
          label="Update"
          value={t.update}
          options={['auto', 'none', 'status', 'action', 'advisory', 'general']}
          onChange={(v) => setTweak('update', v)} />
        <TweakRadio
          label="Progress"
          value={t.stepCount}
          options={[3, 4, 5]}
          onChange={(v) => setTweak('stepCount', v)} />
      </TweaksPanel>
    </>
  );
}
