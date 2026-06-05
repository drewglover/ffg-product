import { PIcon } from '../icons/PIcon';

const Stat = ({ label, value }) =>
<div className="pt-stat">
    <div className="pt-stat__label" style={{ fontSize: "14px" }}>
      {label} <PIcon.Info className="pt-info" />
    </div>
    <div className="pt-stat__value" style={{ fontFamily: "\"PP Fragment Sans\"", fontWeight: "200", fontSize: "24px" }}>{value}</div>
  </div>;


export { Stat };
