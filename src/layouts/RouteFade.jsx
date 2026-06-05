import React from 'react';
import { useLocation } from 'react-router-dom';

// Cross-fades routed content on navigation. Keyed on pathname so React
// remounts this subtree — replaying the CSS enter animation — each time the
// surface changes, while the surrounding nav stays mounted in the layout.
export function RouteFade({ children }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="route-fade">
      {children}
    </div>
  );
}
