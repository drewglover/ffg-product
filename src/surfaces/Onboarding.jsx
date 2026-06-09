// FFG Onboarding flow — ported from the prototype's onboarding.jsx shell.
// Landing → 6 questionnaire steps → Submitted. Single-file state machine.
import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CAUSE_AREAS } from '../components/onboarding/data/causeAreas.jsx';
import { Landing } from '../components/onboarding/steps/Landing.jsx';
import { CausePriorities } from '../components/onboarding/steps/CausePriorities.jsx';
import { GoalsStep } from '../components/onboarding/steps/GoalsStep.jsx';
import { ScaleStep } from '../components/onboarding/steps/ScaleStep.jsx';
import { ReviewStep } from '../components/onboarding/steps/ReviewStep.jsx';
import { Submitted } from '../components/onboarding/steps/Submitted.jsx';
import { StepChrome } from '../components/onboarding/atoms/StepChrome.jsx';
import { Ic } from '../components/onboarding/icons/Ic.jsx';

export default function Onboarding() {
  const navigate = useNavigate();
  /* screens:
     "landing" → "step1" → "step2" → "step3" → "step4" → "step5" → "step6" → "done" */
  const SCREENS = ['landing', 'step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'done'];
  const [screen, setScreen] = useState('landing');
  const goTo = useCallback((nextScreen, scrollTop = true) => {
    setScreen(nextScreen);
    if (scrollTop) window.scrollTo({ top: 0 });
  }, []);

  const [order, setOrder] = useState(CAUSE_AREAS.map((c) => c.id));
  const [goalsByCause, setGoalsByCause] = useState({}); // { causeId: [goal,..] }
  const [scales, setScales] = useState([]);
  const [locations, setLocations] = useState([]);

  const top3 = order.slice(0, 3);
  const goalCauseIds = top3; // steps 2,3,4 iterate these

  const idx = SCREENS.indexOf(screen);
  const stepNumber = idx === 0 || idx === 7 ? 0 : idx; // 1..6 inside questionnaire

  const next = useCallback(() => {
    goTo(SCREENS[Math.min(idx + 1, SCREENS.length - 1)]);
  }, [idx, goTo]);
  const back = useCallback(() => {
    goTo(SCREENS[Math.max(idx - 1, 0)]);
  }, [idx, goTo]);
  const resetToLanding = () => {
    setOrder(CAUSE_AREAS.map((c) => c.id));
    setGoalsByCause({});
    setScales([]);
    setLocations([]);
    goTo('landing');
  };
  const closeOut = () => goTo('landing');

  // Continue-button enabled state per step
  const canContinue = useMemo(() => {
    if (screen === 'step1') return order.length >= 3;
    if (screen === 'step2' || screen === 'step3' || screen === 'step4') {
      // Step's goals are optional (the figma shows a Skip button), so always allow Continue
      return true;
    }
    if (screen === 'step5') return scales.length >= 1;
    return true;
  }, [screen, order, scales]);

  const goalCauseForStep = (s) => {
    if (s === 'step2') return goalCauseIds[0];
    if (s === 'step3') return goalCauseIds[1];
    if (s === 'step4') return goalCauseIds[2];
    return null;
  };
  const setGoalsFor = (causeId, goals) => setGoalsByCause({ ...goalsByCause, [causeId]: goals });

  // Skip on goal steps just clears that cause's selection and advances
  const skipGoals = () => {
    const c = goalCauseForStep(screen);
    if (c) setGoalsFor(c, []);
    next();
  };

  // Render
  if (screen === 'landing') {
    return (
      <div className="ob-app ob-app--landing">
        <button type="button" className="ob-landing__close" onClick={() => navigate('/dashboard')} aria-label="Close">
          <Ic.X width="24" height="24" />
        </button>
        <Landing onStart={next} />
      </div>);
  }
  if (screen === 'done') {
    return (
      <div className="ob-app ob-app--landing">
        <button type="button" className="ob-landing__close" onClick={() => navigate('/dashboard')} aria-label="Close">
          <Ic.X width="24" height="24" />
        </button>
        <Submitted />
      </div>);
  }

  let body = null;
  let footer = null;
  if (screen === 'step1') {
    body = <CausePriorities order={order} setOrder={setOrder} />;
    footer =
      <button
        type="button"
        className="ob-btn ob-btn--solid"
        onClick={next}>
        Continue
      </button>;
  } else if (screen === 'step2' || screen === 'step3' || screen === 'step4') {
    const causeId = goalCauseForStep(screen);
    const selected = goalsByCause[causeId] || [];
    body =
      <GoalsStep
        causeId={causeId}
        selected={selected}
        setSelected={(g) => setGoalsFor(causeId, g)} />;

    footer =
      <>
        <button type="button" className="ob-btn ob-btn--ghost" onClick={skipGoals}>Skip</button>
        <button type="button" className="ob-btn ob-btn--solid" onClick={next}>Continue</button>
      </>;
  } else if (screen === 'step5') {
    body =
      <ScaleStep
        scales={scales} setScales={setScales}
        locations={locations} setLocations={setLocations} />;

    footer =
      <button type="button" className="ob-btn ob-btn--solid" onClick={next}>
        Review
      </button>;
  } else if (screen === 'step6') {
    body =
      <ReviewStep
        order={order}
        locations={locations}
        onBack={resetToLanding}
        onSubmit={next} />;

    // Footer rendered inside ReviewStep itself
    footer = null;
  }

  return (
    <div className="ob-app">
      <StepChrome step={stepNumber} onBack={back} onClose={closeOut} />
      <div className="ob-body">
        {body}
        {footer && <div className="ob-footer">{footer}</div>}
      </div>
    </div>);
}
