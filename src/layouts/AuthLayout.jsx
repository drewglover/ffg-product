import React, { useState, useEffect } from 'react';
import { Outlet, useMatches } from 'react-router-dom';
import { FFGTopNav } from '../topnav-auth.jsx';
import { RouteFade } from './RouteFade.jsx';

// Persistent authenticated shell. The top nav mounts once here and stays put
// while the routed surface swaps inside <Outlet/> — no remount, no reload.
// A surface can tune the shared .app wrapper (e.g. transparent background to
// reveal the mesh, a different type scale) via its route's `handle.appStyle`.
export default function AuthLayout() {
  const [stuck, setStuck] = useState(false);

  // Toggle sticky-nav fill once the page is scrolled. Lives here so the
  // listener is registered once for the whole authenticated shell.
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const appStyle = useMatches().reduce(
    (acc, m) => ({ ...acc, ...(m.handle?.appStyle || {}) }),
    {},
  );

  return (
    <div className="app" data-gradient="off" style={appStyle}>
      <FFGTopNav stuck={stuck} padded={false} />
      <RouteFade>
        <Outlet />
      </RouteFade>
    </div>
  );
}
