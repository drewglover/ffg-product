import { useState } from 'react';
import { Icon } from '../icons/Icon';
import { TRANSACTIONS } from '../data/transactions';
import { StatusPill } from '../atoms/StatusPill';

// Columns are sortable (click a header to toggle asc → desc) unless sortable: false.
const COLUMNS = [
{ key: "date", label: "Date", cell: "txn-cell--date" },
{ key: "user", label: "User", cell: "txn-cell--user" },
{ key: "org", label: "Organization", cell: "txn-cell--name" },
{ key: "ein", label: "EIN", cell: "txn-cell--ein", sortable: false },
{ key: "status", label: "Status", cell: "txn-cell--status" },
{ key: "amount", label: "Amount", cell: "txn-cell--amount" }];


// Parse "MM/DD/YY" into a sortable timestamp.
function dateValue(s) {
  const [m, d, y] = s.split("/").map(Number);
  return new Date(2000 + y, m - 1, d).getTime();
}

// Sort key for the attributed user: FFG team members sort by "FFG <name>",
// so all FFG entries group together and "You" sorts on its own.
function userValue(t) {
  return t.ffg ? `FFG ${t.user}` : t.user;
}

function compare(a, b, key) {
  if (key === "amount") return a.amount - b.amount;
  if (key === "date") return dateValue(a.date) - dateValue(b.date);
  if (key === "user") return userValue(a).localeCompare(userValue(b));
  return String(a[key]).localeCompare(String(b[key]));
}

// Amount sign + hover explanation, keyed by transaction flow.
const FLOW_SIGN = { credit: "+", debit: "-", upload: "" };
const FLOW_LABEL = { credit: "Account credit", debit: "Account debit", upload: "Donation upload" };

// Map each transaction status to a status-pill variant.
const STATUS_VARIANT = {
  Completed: "resolved",
  Pending: "active",
  Failed: "failed",
  Cancelled: "cancelled",
  Reversed: "reversed",
};

const PER_PAGE = 10;

function TransactionHistorySection({ phase }) {
  const [sort, setSort] = useState({ key: "date", dir: "desc" });
  const [page, setPage] = useState(1);

  // In-progress and Allocated both show the table; Preview shows the empty state.
  if (phase !== "in-progress" && phase !== "allocated") {
    return (
      <section className="section-block" aria-label="Transaction history">
        <div className="empty-state">
          <p className="empty-state__copy">
            Once you've contributed, your activity and transactions will appear here.
          </p>
        </div>
      </section>);

  }

  // Re-sorting can change which rows fall on the current page, so jump back to page 1.
  const toggleSort = (key) => {
    setPage(1);
    setSort((s) => s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });
  };

  // Allocated: pending transfers read "Completed"; Failed/Cancelled/Reversed
  // keep their own status. In progress: rows keep their own status.
  const sorted = TRANSACTIONS.
  map((t) => ({ ...t, status: phase === "allocated" && t.status === "Pending" ? "Completed" : t.status })).
  sort((a, b) => {
    const v = compare(a, b, sort.key);
    return sort.dir === "asc" ? v : -v;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const rows = sorted.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <section className="section-block" aria-label="Transaction history">
      <div className="txn-toolbar">
        <button type="button" className="txn-range-pill">
          <span style={{ fontSize: "14px" }}>Date Range: Last 12 Months</span>
          <Icon.Caret />
        </button>
        <button type="button" className="txn-download">
          <Icon.Download />
          <span style={{ fontSize: "14px" }}>Download report</span>
        </button>
      </div>

      <div className="txn-table" role="table" aria-label="Transactions">
        <div className="txn-row txn-row--head" role="row">
          {COLUMNS.map((col) =>
          col.sortable === false ?
          <div key={col.key} className={`txn-cell ${col.cell}`} role="columnheader">
              <span className="txn-sort__label">{col.label}</span>
            </div> :

          <div key={col.key} className={`txn-cell ${col.cell}`} role="columnheader" aria-sort={sort.key === col.key ? sort.dir === "asc" ? "ascending" : "descending" : "none"}>
              <button type="button" className={`txn-sort${sort.key === col.key ? " is-sorted" : ""}`} onClick={() => toggleSort(col.key)}>
                <span>{col.label}</span>
                <span className={`txn-sort__caret${sort.key === col.key ? " is-active" : ""}${sort.key === col.key && sort.dir === "asc" ? " is-asc" : ""}`}>
                  <Icon.Caret />
                </span>
              </button>
            </div>
          )}
          <div className="txn-cell txn-cell--menu" role="columnheader" aria-label="Actions" />
        </div>
        {rows.map((t, i) =>
        <div key={i} className="txn-row" role="row">
            <div className="txn-cell txn-cell--date" role="cell">{t.date}</div>
            <div className="txn-cell txn-cell--user" role="cell">
              {t.ffg ?
              <span className="txn-user">
                  <span className="txn-ffg-badge">FFG</span>
                  {t.user}
                </span> :

              t.user}
            </div>
            <div className="txn-cell txn-cell--name" role="cell">{t.org}</div>
            <div className="txn-cell txn-cell--ein" role="cell">{t.ein}</div>
            <div className="txn-cell txn-cell--status" role="cell">
              <StatusPill
              variant={STATUS_VARIANT[t.status] || "active"}
              label={t.status}
              size="md" />

            </div>
            <div className="txn-cell txn-cell--amount" role="cell">
              <span className="txn-amount" tabIndex={0} aria-label={FLOW_LABEL[t.flow]}>
                {FLOW_SIGN[t.flow]}${t.amount.toLocaleString()}
                <span className="txn-amount__tip" role="tooltip">{FLOW_LABEL[t.flow]}</span>
              </span>
            </div>
            <div className="txn-cell txn-cell--menu" role="cell">
              <button type="button" className="txn-menu-btn" title="Download receipt" aria-label={`Download receipt for transaction ${i + 1}`}>
                <Icon.Download />
              </button>
            </div>
          </div>
        )}
      </div>

      {sorted.length > PER_PAGE &&
      <nav className="orgs-pagination" aria-label="Pagination">
          <div className="orgs-pagination__info">
            Showing {(safePage - 1) * PER_PAGE + 1}–{Math.min(safePage * PER_PAGE, sorted.length)} of {sorted.length}
          </div>
          <div className="orgs-pagination__controls">
            <button
            type="button"
            className="orgs-page-btn"
            aria-label="Previous page"
            disabled={safePage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}>

              <Icon.ArrowLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) =>
          <button
            key={n}
            type="button"
            className={"orgs-page-btn orgs-page-btn--num" + (n === safePage ? " is-active" : "")}
            aria-current={n === safePage ? "page" : undefined}
            onClick={() => setPage(n)}>
            {n}</button>
          )}
            <button
            type="button"
            className="orgs-page-btn"
            aria-label="Next page"
            disabled={safePage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>

              <Icon.ArrowRight />
            </button>
          </div>
        </nav>
      }
    </section>);

}


export { TransactionHistorySection };
