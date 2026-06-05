// Dummy unauthenticated Home surface — scaffold to exercise the unauth top nav.
import React, { useState, useEffect } from 'react';
import { FFGTopNavUnauth } from '../topnav-unauth.jsx';

export default function Home() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="app" data-gradient="off">
      <FFGTopNavUnauth stuck={stuck} padded={false} />
      <div className="shell">
        <div className="page-placeholder">
          <span className="page-placeholder__copy">Home — unauthenticated</span>
        </div>
      </div>
    </div>
  );
}
