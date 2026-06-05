// Dummy unauthenticated Home surface — scaffold to exercise the unauth top nav.
// The .app wrapper and top nav are supplied by UnauthLayout.
import React from 'react';

export default function Home() {
  return (
    <div className="shell">
      <div className="page-placeholder">
        <span className="page-placeholder__copy">Home — unauthenticated</span>
      </div>
    </div>
  );
}
