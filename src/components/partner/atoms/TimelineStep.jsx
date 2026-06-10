
const TimelineStep = ({ n, tag, time }) =>
<div className="pt-tl-card">
  <div className="pt-tl-card__header">
    <span className="pt-tl-card__n">{n}</span>
    <span className="pt-tl-card__tag">{tag}</span>
    <span className="pt-tl-card__time">{time}</span>
  </div>
  <p className="pt-tl-card__copy">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </p>
</div>;


export { TimelineStep };
