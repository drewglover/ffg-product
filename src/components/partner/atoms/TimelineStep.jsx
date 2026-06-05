
const TimelineStep = ({ n, tag, time, last }) =>
<li className={"pt-tl__item" + (last ? " pt-tl__item--last" : "")} style={{ padding: "0px" }}>
    <span className="pt-tl__bullet">{n}</span>
    <div className="pt-tl__body" style={{ padding: "4px 0px 40px" }}>
      <div className="pt-tl__meta">
        <span className="pt-tl__tag" style={{ fontWeight: "400", fontSize: "12px", borderColor: "rgb(121, 119, 114)", color: "rgb(121, 119, 114)" }}>{tag}</span>
        <span className="pt-tl__time" style={{ fontSize: "14px" }}>{time}</span>
      </div>
      <div className="pt-tl__title" style={{ margin: "12px 0px 4px", padding: "0px" }}>Lorem ipsum dolor sit amet</div>
      <p className="pt-tl__copy" style={{ color: "rgb(121, 119, 114)" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.
      </p>
    </div>
  </li>;


export { TimelineStep };
