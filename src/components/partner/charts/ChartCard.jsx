import React, { useState } from 'react';
import { PIcon } from '../icons/PIcon';
import { ChartSVG } from './ChartSVG';
import { ChartModal } from './ChartModal';

function ChartCard({ title }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="pt-chart">
        <div className="pt-chart__head">
          <span className="pt-chart__title" style={{ fontFamily: "\"PP Fragment Sans\"", fontSize: "14px" }}>
            {title}
            <PIcon.Info className="pt-info" style={{ marginLeft: 8 }} />
          </span>
          <button
            className="pt-chart__exp"
            aria-label={`Expand ${title} chart`}
            onClick={() => setOpen(true)}>

            <PIcon.Expand />
          </button>
        </div>
        <ChartSVG height={140} />
        <div className="pt-chart__legend">
          <span><span className="pt-chart__sw pt-chart__sw--line" style={{ width: '18px', height: '4px', borderRadius: '2px', background: 'linear-gradient(90deg, #6F9DCB, #15315A)' }} /> This Organization</span>
          <span><span className="pt-chart__sw pt-chart__sw--bar" style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#EAE8E3', border: '1px solid #92908B' }} /> Average of others</span>
        </div>
      </div>
      {open && <ChartModal title={title} onClose={() => setOpen(false)} />}
    </>);

}


export { ChartCard };
