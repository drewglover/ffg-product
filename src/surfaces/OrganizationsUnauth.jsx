// Dummy unauthenticated Organizations surface — the unauth nav's
// "Organizations" link lands here (the authenticated /partner directory lives
// behind sign-in). Scaffold placeholder, mirrors Home / DashboardUnauth.
import React from 'react';

export default function OrganizationsUnauth() {
  return (
    <div className="shell">
      <div className="page-placeholder">
        <span className="page-placeholder__copy">Organizations — unauthenticated</span>
      </div>
    </div>
  );
}
