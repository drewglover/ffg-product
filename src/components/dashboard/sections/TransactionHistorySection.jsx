import { Icon } from '../icons/Icon';
import { TRANSACTIONS } from '../data/transactions';
import { StatusPill } from '../atoms/StatusPill';

function TransactionHistorySection({ phase }) {
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
  // Allocated: every row reads "Completed". In progress: first row "In Progress".
  const rows = TRANSACTIONS.map((t, i) => ({
    ...t,
    status: phase === "allocated" ? "Completed" : t.status
  }));
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
          <div className="txn-cell txn-cell--amount" role="columnheader" style={{ fontWeight: "300" }}>Amount</div>
          <div className="txn-cell txn-cell--date" role="columnheader" style={{ fontWeight: "300" }}>Date</div>
          <div className="txn-cell txn-cell--status" role="columnheader" style={{ fontWeight: "300" }}>Status</div>
          <div className="txn-cell txn-cell--menu" role="columnheader" aria-label="Actions" />
        </div>
        {rows.map((t, i) =>
        <div key={i} className="txn-row" role="row">
            <div className="txn-cell txn-cell--amount" role="cell" style={{ fontSize: "16px", fontWeight: "300" }}>${t.amount.toLocaleString()}</div>
            <div className="txn-cell txn-cell--date" role="cell" style={{ fontSize: "16px", fontWeight: "300" }}>{t.date}</div>
            <div className="txn-cell txn-cell--status" role="cell">
              <StatusPill
              variant={t.status === "Completed" ? "resolved" : "active"}
              label={t.status}
              size="md" />

            </div>
            <div className="txn-cell txn-cell--menu" role="cell">
              <button type="button" className="txn-menu-btn" aria-label={`More actions for transaction ${i + 1}`}>
                <Icon.MoreH />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>);

}


export { TransactionHistorySection };
