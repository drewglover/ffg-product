import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { setSurface } from './controller.js';

// Lives inside the router so it can observe navigation. On each pathname change
// it asks the gradient controller to morph to that surface's config. Renders the
// matched route via <Outlet/>, so it can wrap the whole route tree transparently.
export default function GradientRouteSync() {
  const { pathname } = useLocation();

  useEffect(() => {
    setSurface(pathname);
  }, [pathname]);

  return <Outlet />;
}
