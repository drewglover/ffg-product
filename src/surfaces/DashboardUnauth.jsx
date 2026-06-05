// Dummy unauthenticated Dashboard surface — scaffold to exercise the unauth top nav.
// The .app wrapper and top nav are supplied by UnauthLayout.
import React from 'react';

export default function DashboardUnauth() {
  return (
    <div className="shell">
      <div className="page-placeholder">
        <span className="page-placeholder__copy">Dashboard — unauthenticated</span>
      </div>
    </div>
  );
}
