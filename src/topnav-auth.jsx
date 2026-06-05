import React from 'react';
import ReactDOM from 'react-dom';

// Shared FFG top nav + Lucide icon set, mounted into #topnav-root by any page
// that includes this script.

const Icon = {
  Bell: (p) =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell" {...p}>
      <path d="M10.268 21a2 2 0 0 0 3.464 0" />
      <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
    </svg>,

  Gear: (p) =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>,

  User: (p) =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>,

  LogOut: (p) =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>,
};

function TopNav({ padded = true, stuck = false }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className={"nav" + (stuck ? " is-stuck" : "")}>
      <div className="nav-inner" style={padded ? { padding: "12px 48px" } : undefined}>
        <a className="wordmark" href="/dashboard" aria-label="Factory for Good">
          <img src="/assets/Factory_for_Good_dark.svg" alt="Factory for Good" />
        </a>
        <div className="nav-right">
          <button className="icon-btn" aria-label="Notifications">
            <Icon.Bell />
          </button>

          <div className="nav-avatar-wrap" ref={menuRef}>
            <button
              type="button"
              className={"avatar avatar--btn" + (menuOpen ? " is-open" : "")}
              aria-label="Account menu"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            />
            {menuOpen && (
              <div className="nav-dropdown" role="menu">
                <div className="nav-dropdown__group">
                  {[
                    { label: "Profile",  I: Icon.User },
                    { label: "Settings", I: Icon.Gear },
                  ].map(({ label, I }) => (
                    <button key={label} type="button" className="nav-dropdown__item" role="menuitem" onClick={() => setMenuOpen(false)}>
                      <I />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
                <div className="nav-dropdown__sep" role="separator" />
                <div className="nav-dropdown__group">
                  <button type="button" className="nav-dropdown__item nav-dropdown__item--destructive" role="menuitem" onClick={() => setMenuOpen(false)}>
                    <Icon.LogOut />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export { Icon, TopNav, TopNav as FFGTopNav };
