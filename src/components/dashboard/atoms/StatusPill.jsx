
/* ====== Status pill (unified) ======
   Three semantic states reused across the dashboard. Tags are a separate
   component (.op-tag / .org-tag) because they're categorical, not stateful.
*/
function StatusPill({ variant = "idle", label, size = "md", className = "" }) {
  return (
    <span className={`status-pill status-pill--${variant} status-pill--${size} ${className}`.trim()} style={{ padding: "8px 14px", borderRadius: "42px" }}>
      <span className="status-pill__label" style={{ fontSize: "14px", fontWeight: "300" }}>{label}</span>
    </span>);

}
const PHASE_TO_VARIANT = { preview: "idle", "in-progress": "active", allocated: "resolved" };


export { StatusPill, PHASE_TO_VARIANT };
