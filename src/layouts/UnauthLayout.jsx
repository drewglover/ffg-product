import React, { useState, useEffect } from 'react';
import { Outlet, useMatches } from 'react-router-dom';
import { FFGTopNavUnauth } from '../topnav-unauth.jsx';
import { RouteFade } from './RouteFade.jsx';

// Persistent unauthenticated shell. Mirrors AuthLayout but mounts the unauth
// top nav (sign-in CTAs instead of the avatar menu). The nav stays put while
// the routed surface swaps inside <Outlet/>.
export default function UnauthLayout() {
  const [stuck, setStuck] = useState(false);

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
      <FFGTopNavUnauth stuck={stuck} padded={false} />
      <RouteFade>
        <Outlet />
      </RouteFade>
    </div>
  );
}
