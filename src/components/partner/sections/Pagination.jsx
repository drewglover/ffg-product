import React, { useMemo } from 'react';
import { PIcon } from '../icons/PIcon';

function Pagination({ page, totalPages, onChange }) {
  // Build a compact list of page tokens: always show first, last, current and
  // neighbours; insert ellipses for gaps. Works for any number of pages.
  const tokens = useMemo(() => {
    const out = [];
    const add = (v) => {if (out[out.length - 1] !== v) out.push(v);};
    const window = 1; // neighbours on each side of current

    add(1);
    if (page - window > 2) add("…");
    for (let i = Math.max(2, page - window); i <= Math.min(totalPages - 1, page + window); i++) add(i);
    if (page + window < totalPages - 1) add("…");
    if (totalPages > 1) add(totalPages);
    return out;
  }, [page, totalPages]);

  return (
    <nav className="pt-pagination" aria-label="Pagination">
      <button
        className="pt-pg pt-pg--arrow"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}>

        <PIcon.ArrowLeft />
      </button>
      <div className="pt-pg__nums">
        {tokens.map((t, i) =>
        t === "…" ?
        <span key={"e" + i} className="pt-pg__ellip">…</span> :

        <button
          key={t}
          className={"pt-pg pt-pg--num" + (t === page ? " is-active" : "")}
          aria-current={t === page ? "page" : undefined}
          onClick={() => onChange(t)}>

              {t}
            </button>

        )}
      </div>
      <button
        className="pt-pg pt-pg--arrow"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}>

        <PIcon.Arrow />
      </button>
    </nav>);

}


export { Pagination };
