import { useState } from 'react';
import { Icon } from '../icons/Icon';
import { TRANSACTIONS } from '../data/transactions';
import { StatusPill } from '../atoms/StatusPill';

// Columns are sortable (click a header to toggle asc → desc) unless sortable: false.
const COLUMNS = [
{ key: "date", label: "Date", cell: "txn-cell--date" },
{ key: "org", label: "Organization", cell: "txn-cell--name" },
{ key: "ein", label: "EIN", cell: "txn-cell--ein", sortable: false },
{ key: "status", label: "Status", cell: "txn-cell--status" },
{ key: "amount", label: "Amount", cell: "txn-cell--amount" }];


// Parse "MM/DD/YY" into a sortable timestamp.
function dateValue(s) {
  const [m, d, y] = s.split("/").map(Number);
  return new Date(2000 + y, m - 1, d).getTime();
}

function compare(a, b, key) {
  if (key === "amount") return a.amount - b.amount;
  if (key === "date") return dateValue(a.date) - dateValue(b.date);
  return String(a[key]).localeCompare(String(b[key]));
}

function TransactionHistorySection({ phase }) {
  const [sort, setSort] = useState({ key: "date", dir: "desc" });

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

  const toggleSort = (key) =>
  setSort((s) => s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });

  // Allocated: every row reads "Completed". In progress: first row "In Progress".
  const rows = TRANSACTIONS.
  map((t) => ({ ...t, status: phase === "allocated" ? "Completed" : t.status })).
  sort((a, b) => {
    const v = compare(a, b, sort.key);
    return sort.dir === "asc" ? v : -v;
  });

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
            <div className="txn-cell txn-cell--name" role="cell">{t.org}</div>
            <div className="txn-cell txn-cell--ein" role="cell">{t.ein}</div>
            <div className="txn-cell txn-cell--status" role="cell">
              <StatusPill
              variant={t.status === "Completed" ? "resolved" : "active"}
              label={t.status}
              size="md" />

            </div>
            <div className="txn-cell txn-cell--amount" role="cell">${t.amount.toLocaleString()}</div>
            <div className="txn-cell txn-cell--menu" role="cell">
              <button type="button" className="txn-menu-btn" title="Download receipt" aria-label={`Download receipt for transaction ${i + 1}`}>
                <Icon.Download />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>);

}


export { TransactionHistorySection };
