import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { SAMPLE_LINE } from '../data/orgPanelData';

function OrgMiniLine({ ariaLabel }) {
  return (
    <div className="op-line" role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={SAMPLE_LINE} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
          <CartesianGrid horizontal={true} vertical={false} stroke="#EAE8E3" />
          <XAxis dataKey="x" hide />
          <YAxis hide domain={[0, 100]} />
          <Area type="monotone" dataKey="avg" stroke="#92908B" strokeWidth={1.5} fill="none" dot={false} isAnimationActive={false} />
          <Area type="monotone" dataKey="you" stroke="#141413" strokeWidth={1.5} fill="none" dot={false} isAnimationActive={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>);

}


export { OrgMiniLine };
