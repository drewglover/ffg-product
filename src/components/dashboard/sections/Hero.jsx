import React from 'react';
import { Welcome } from './hero/Welcome.jsx';
import { DynamicAction } from './hero/DynamicAction.jsx';

/* ====== Hero ======
   Container for the top area: Welcome on the left, the DynamicAction slot on
   the right. The right slot's contents are chosen by `dynamicAction`. */
function Hero({ name, livesCount, onTabChange, welcomeState, dynamicAction, onAmountConfirm, confirmedAmount }) {
  return (
    <div className="hero">
      <Welcome name={name} livesCount={livesCount} onTabChange={onTabChange} state={welcomeState} />
      <DynamicAction
        variant={dynamicAction}
        onAmountConfirm={onAmountConfirm}
        confirmedAmount={confirmedAmount} />
    </div>
  );
}

export { Hero };
