import React from 'react';

// Unauthenticated FFG top nav. Same wordmark + primary nav links as the
// authenticated nav, but the right side swaps the notifications/avatar for
// sign-in CTAs.
import { Link } from 'react-router-dom';
import { NavLinks, NAV_LINKS_UNAUTH } from './topnav-auth.jsx';

function TopNavUnauth({ padded = true, stuck = false }) {
  return (
    <header className={"nav" + (stuck ? " is-stuck" : "")}>
      <div className="nav-inner" style={padded ? { padding: "12px 48px" } : undefined}>
        <a className="wordmark" href="/home" aria-label="Factory for Good">
          <img src="/assets/Factory_for_Good_dark.svg" alt="Factory for Good" />
        </a>
        <div className="nav-right">
          <NavLinks links={NAV_LINKS_UNAUTH} />
          <Link className="nav-cta" to="/dashboard">Log in</Link>
          <a className="nav-cta nav-cta--solid" href="/onboarding">Get started</a>
        </div>
      </div>
    </header>
  );
}

export { TopNavUnauth, TopNavUnauth as FFGTopNavUnauth };
