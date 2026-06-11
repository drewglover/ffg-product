import React, { useState, useEffect, useMemo } from 'react';
import { PIcon } from '../icons/PIcon';
import { statusForName, tierForName } from '../data/statusTaxonomy';
import { PARTNERS } from '../data/partners';
import { PAGE_SIZE } from '../data/sortOptions';
import { SortDropdown } from './SortDropdown';
import { PartnerCard } from './PartnerCard';
import { Pagination } from './Pagination';

// ═══════════════════════════════════════════════════════════════════════════
// DIRECTORY VIEW
// ═══════════════════════════════════════════════════════════════════════════
function Directory({ onOpen }) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("recommended");

  const sorted = useMemo(() => {
    const list = PARTNERS.slice();
    if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
    // Tier sort: highest tier first, then A–Z within a tier so the order is
    // deterministic and the user can scan the top of the list as "most vetted".
    if (sort === "tier") list.sort((a, b) => {
      const sa = statusForName(a.name),sb = statusForName(b.name);
      const ta = tierForName(a.name, sa),tb = tierForName(b.name, sb);
      return tb - ta || a.name.localeCompare(b.name);
    });
    return list;
  }, [sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  // Reset page when sort changes
  useEffect(() => {setPage(1);}, [sort]);

  // Scroll the grid back to the top of the toolbar when paging,
  // so the header / count / sort row stays as the visual anchor.
  const goToPage = (next) => {
    const clamped = Math.max(1, Math.min(totalPages, next));
    setPage(clamped);
    requestAnimationFrame(() => {
      const el = document.querySelector(".pt-toolbar");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };

  return (
    <div className="pt-dir">
      <header className="pt-dir__head">
        <h1 className="pt-dir__title" style={{ fontSize: "48px", fontWeight: "300" }}>Our Opportunities</h1>
        <p className="pt-dir__sub" style={{ color: "var(--ffg-muted)", fontWeight: "300", fontSize: "16px" }}>
          Browse all of the organizations we partner with and find the right match for you.
        </p>
      </header>

      <div className="pt-toolbar">
        <div className="pt-toolbar__results" style={{ fontSize: "14px", color: "var(--ffg-surface-900)" }}>
          <span className="pt-toolbar__count" style={{ fontSize: "14px", fontWeight: "400", color: "var(--ffg-surface-900)" }}>{PARTNERS.length}</span> organizations
        </div>
        <div className="pt-toolbar__right">
          <SortDropdown value={sort} onChange={setSort} />

          <button className="pt-chip" style={{ fontSize: "14px", fontWeight: "300" }}>
            <PIcon.Filter />
            Filter
          </button>
        </div>
      </div>

      <div className="pt-grid">
        {pageItems.map((p) =>
        <PartnerCard
          key={p.name}
          partner={p}
          onOpen={() => onOpen(p)} />

        )}
      </div>

      <Pagination
        page={safePage}
        totalPages={totalPages}
        onChange={goToPage} />

    </div>);

}


export { Directory };
