
/* ====== Page-level tabs ====== */
function PageTabs({ value, onChange }) {
  const tabs = [
  { id: "overview", label: "Overview" },
  { id: "areas", label: "Your impact areas" },
  { id: "history", label: "Transaction history" }];

  return (
    <div className="page-tabs" role="tablist" aria-label="Impact view" style={{ margin: "-16px 0px 48px" }}>
      {tabs.map((t) =>
      <button
        key={t.id}
        type="button"
        role="tab"
        aria-selected={value === t.id}
        className={"page-tabs__tab" + (value === t.id ? " is-active" : "")}
        onClick={() => onChange(t.id)} style={{ fontSize: "16px", fontWeight: "300" }}>

          {t.label}
        </button>
      )}
    </div>);

}


export { PageTabs };
