import { useState } from 'react';

// Living index of FFG-native components — the hand-built ones with no shadcn
// equivalent. Sibling of /shadcn-demo (which covers the themed @/components/ui
// primitives). Each entry renders every variant live, with its surface, source
// path, CSS class family, and migration status. Route: /inventory.

// FFG components
import { Badge } from '../components/partner/atoms/Badge';
import { KPI } from '../components/partner/atoms/KPI';
import { TimelineStep } from '../components/partner/atoms/TimelineStep';
import { PartnerCard } from '../components/partner/sections/PartnerCard';
import { Pagination } from '../components/partner/sections/Pagination';
import { ChartCard } from '../components/partner/charts/ChartCard';
import { ProgressBar } from '../components/onboarding/atoms/ProgressBar';
import { FocusBubbles } from '../components/onboarding/atoms/FocusBubbles';
import { StatusPill } from '../components/dashboard/atoms/StatusPill';
import { CauseAllocationTreemap } from '../components/shared/CauseAllocationTreemap';
import { UpdateCard } from '../components/shared/UpdateCard';

// Sample data pulled from the same modules production uses — no new fixtures.
import { PARTNERS } from '../components/partner/data/partners';
import { statusForName } from '../components/partner/data/statusTaxonomy';
import { CATEGORY_ICONS } from '../components/partner/data/categoryIcons';
import { CAUSE_AREAS } from '../components/onboarding/data/causeAreas';
import { ALLOCATION_DATA } from '../components/dashboard/data/allocationData';
import { UPDATE_ITEMS } from '../components/dashboard/data/updateItems';

// ── Derived variant sets ─────────────────────────────────────────────────────
const CATEGORIES = Object.keys(CATEGORY_ICONS);
const STATUS_PILL_VARIANTS = ['idle', 'active', 'resolved', 'failed', 'cancelled', 'reversed'];
const CAUSE_IDS = CAUSE_AREAS.map((c) => c.id);
// One partner per pipeline status (status is hashed from the name).
const PARTNERS_BY_STATUS = ['Verified', 'Ongoing Review', 'Screening']
  .map((st) => PARTNERS.find((p) => statusForName(p.name) === st))
  .filter(Boolean);

const SURFACES = ['All', 'Dashboard', 'Onboarding', 'Partner', 'Shared'];

// ── Small layout helpers ─────────────────────────────────────────────────────
// A labeled variant cell: the live component above, a caption below.
function Variant({ label, children, grow }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        flex: grow ? '1 1 100%' : '0 0 auto',
        minWidth: 0,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', width: grow ? '100%' : 'auto' }}>
        {children}
      </div>
      {label && <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{label}</span>}
    </div>
  );
}

// Flex-wrap row of variants.
function Variants({ children, gap = 24, align = 'flex-end' }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap, justifyContent: 'center', alignItems: align, width: '100%' }}>
      {children}
    </div>
  );
}

// One entry per FFG-native component. `render` mounts every variant.
const REGISTRY = [
  {
    name: 'StatusPill',
    surface: 'Dashboard',
    classFamily: '.status-pill',
    path: 'src/components/dashboard/atoms/StatusPill.jsx',
    status: 'FFG-NATIVE',
    note: 'Design contract — do not alter without a design decision.',
    render: () => (
      <div style={{ display: 'grid', gap: 20, width: '100%' }}>
        <Variants gap={10} align="center">
          {STATUS_PILL_VARIANTS.map((v) => (
            <Variant key={v} label={v}>
              <StatusPill variant={v} label={v[0].toUpperCase() + v.slice(1)} />
            </Variant>
          ))}
        </Variants>
        <Variants gap={10} align="center">
          <Variant label="size=sm">
            <StatusPill variant="active" label="Small" size="sm" />
          </Variant>
          <Variant label="size=md">
            <StatusPill variant="active" label="Medium" size="md" />
          </Variant>
        </Variants>
      </div>
    ),
  },
  {
    name: 'CauseAllocationTreemap',
    surface: 'Dashboard',
    classFamily: '.pt-tm-rc / .pt-tm__*',
    path: 'src/components/shared/CauseAllocationTreemap.jsx',
    status: 'FFG-NATIVE',
    note: 'Data-driven Recharts treemap with FFG cell styling; shared by Dashboard + Partner.',
    render: () => (
      // .pt-tm-rc is flex:1 — it needs a flex-column parent with a fixed height
      // to give the ResponsiveContainer a box to measure.
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: 240 }}>
        <CauseAllocationTreemap data={ALLOCATION_DATA} />
      </div>
    ),
  },
  {
    name: 'ProgressBar',
    surface: 'Onboarding',
    classFamily: '.ob-progress',
    path: 'src/components/onboarding/atoms/ProgressBar.jsx',
    status: 'FFG-NATIVE',
    note: 'Six steps — shown at every position.',
    render: () => (
      <div style={{ display: 'grid', gap: 14, width: '100%' }}>
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <div key={step} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>step={step}</span>
            <ProgressBar step={step} />
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'FocusBubbles',
    surface: 'Onboarding',
    classFamily: '.ob-bubbles',
    path: 'src/components/onboarding/atoms/FocusBubbles.jsx',
    status: 'FFG-NATIVE',
    note: 'Packed-circle SVG, keyed by the top-3 cause ranking. Two rankings shown.',
    render: () => (
      <Variants gap={32} align="flex-start">
        <Variant label={CAUSE_IDS.slice(0, 3).join(' · ')}>
          <FocusBubbles top3={CAUSE_IDS.slice(0, 3)} />
        </Variant>
        <Variant label={CAUSE_IDS.slice(3, 6).join(' · ')}>
          <FocusBubbles top3={CAUSE_IDS.slice(3, 6)} />
        </Variant>
      </Variants>
    ),
  },
  {
    name: 'Badge',
    surface: 'Partner',
    classFamily: '.pt-badge / .impact-badge',
    path: 'src/components/partner/atoms/Badge.jsx',
    status: 'FFG-NATIVE',
    note: 'Icon variant per cause category, plus the solid variant.',
    render: () => (
      <div style={{ display: 'grid', gap: 20, width: '100%' }}>
        <Variants gap={10} align="center">
          {CATEGORIES.map((cat) => (
            <Badge key={cat}>{cat}</Badge>
          ))}
        </Variants>
        <Variants gap={10} align="center">
          {['Verified', 'Tier 4', 'Featured'].map((label) => (
            <Variant key={label} label="solid">
              <Badge solid>{label}</Badge>
            </Variant>
          ))}
        </Variants>
      </div>
    ),
  },
  {
    name: 'KPI',
    surface: 'Partner',
    classFamily: '.pt-kpi',
    path: 'src/components/partner/atoms/KPI.jsx',
    status: 'FFG-NATIVE',
    render: () => (
      <Variants gap={24} align="flex-start">
        <KPI label="Cost per outcome" value="$142" />
        <KPI label="Families served" value="1,284" />
        <KPI label="Confidence level" value="100%" />
      </Variants>
    ),
  },
  {
    name: 'TimelineStep',
    surface: 'Partner',
    classFamily: '.pt-tl-card (.pt-tl-cards)',
    path: 'src/components/partner/atoms/TimelineStep.jsx',
    status: 'FFG-NATIVE',
    note: 'The full four-step intervention sequence, as composed in PartnerDetail.',
    render: () => (
      <div className="pt-tl-cards" style={{ maxWidth: 560 }}>
        <TimelineStep n="01" tag="Funding" time="1–2 weeks" />
        <TimelineStep n="02" tag="Intervention" time="6–8 weeks" />
        <TimelineStep n="03" tag="Outputs" time="6–8 Months" />
        <TimelineStep n="04" tag="Outcomes" time="6–8 Months" />
      </div>
    ),
  },
  {
    name: 'PartnerCard',
    surface: 'Partner',
    classFamily: '.pt-card',
    path: 'src/components/partner/sections/PartnerCard.jsx',
    status: 'FFG-NATIVE',
    note: 'One card per pipeline status — Verified (shield), Ongoing Review, Screening.',
    render: () => (
      <Variants gap={20} align="flex-start">
        {PARTNERS_BY_STATUS.map((p) => (
          <Variant key={p.name} label={statusForName(p.name)}>
            <div style={{ width: 280 }}>
              <PartnerCard partner={p} onOpen={() => {}} />
            </div>
          </Variant>
        ))}
      </Variants>
    ),
  },
  {
    name: 'Pagination',
    surface: 'Partner',
    classFamily: '.pt-pagination',
    path: 'src/components/partner/sections/Pagination.jsx',
    status: 'FFG-NATIVE',
    note: 'Token compaction at the start, middle, and end of a long range.',
    render: () => (
      <div style={{ display: 'grid', gap: 18, width: '100%', justifyItems: 'center' }}>
        <Variant label="page 1 of 8">
          <PaginationPreview initial={1} total={8} />
        </Variant>
        <Variant label="page 4 of 8">
          <PaginationPreview initial={4} total={8} />
        </Variant>
        <Variant label="page 8 of 8">
          <PaginationPreview initial={8} total={8} />
        </Variant>
      </div>
    ),
  },
  {
    name: 'ChartCard',
    surface: 'Partner',
    classFamily: '.pt-chart',
    path: 'src/components/partner/charts/ChartCard.jsx',
    status: 'FFG-NATIVE',
    note: 'Hand-built SVG area/balance chart with legend + expand modal (click to expand).',
    render: () => (
      <Variants gap={20} align="flex-start">
        <div style={{ width: 420 }}>
          <ChartCard title="Outcomes over time" />
        </div>
        <div style={{ width: 420 }}>
          <ChartCard title="Cost efficiency" />
        </div>
      </Variants>
    ),
  },
  {
    name: 'UpdateCard',
    surface: 'Shared',
    classFamily: '.update-card',
    path: 'src/components/shared/UpdateCard.jsx',
    status: 'FFG-NATIVE',
    note: 'Image variants (every sample item) plus the striped placeholder (no img).',
    render: () => (
      <Variants gap={20} align="flex-start">
        {UPDATE_ITEMS.map((item) => (
          <div key={item.title} style={{ width: 280 }}>
            <UpdateCard
              title={item.title}
              copy={item.body}
              partner={item.partner}
              tag={item.tag}
              img={item.img}
              alt={item.alt}
            />
          </div>
        ))}
        <Variant label="no img → placeholder">
          <div style={{ width: 280 }}>
            <UpdateCard
              title="120 families kept in their homes"
              copy="Emergency rental assistance reached a record number of households facing eviction this quarter."
              partner="Jesse Tree"
              tag="Community"
            />
          </div>
        </Variant>
      </Variants>
    ),
  },
];

// Pagination is controlled — give each preview its own local state.
function PaginationPreview({ initial, total }) {
  const [page, setPage] = useState(initial);
  return <Pagination page={page} totalPages={total} onChange={setPage} />;
}

const SURFACE_COLORS = {
  Dashboard: '#15315A',
  Onboarding: '#5B7A3A',
  Partner: '#8A5A2B',
  Shared: '#6B5B95',
};

function MetaRow({ label, children }) {
  return (
    <div style={{ display: 'flex', gap: 8, fontSize: 13, lineHeight: 1.5 }}>
      <span style={{ color: 'var(--muted-foreground)', minWidth: 88 }}>{label}</span>
      <span style={{ minWidth: 0, wordBreak: 'break-word' }}>{children}</span>
    </div>
  );
}

export default function Inventory() {
  const [filter, setFilter] = useState('All');

  const visible = REGISTRY.filter((c) => filter === 'All' || c.surface === filter);

  return (
    <div
      data-theme="light"
      style={{ minHeight: '100vh', padding: '48px', background: 'var(--background)', color: 'var(--foreground)' }}
    >
      <div style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gap: 32 }}>
        <header style={{ display: 'grid', gap: 6 }}>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontWeight: 300, fontSize: 32, margin: 0 }}>
            FFG · component inventory
          </h1>
          <p style={{ color: 'var(--muted-foreground)', margin: 0 }}>
            FFG-native components (no shadcn equivalent), every variant. Themed shadcn primitives live at{' '}
            <code>/shadcn-demo</code>.
          </p>
        </header>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SURFACES.map((s) => {
            const active = filter === s;
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 999,
                  fontSize: 13,
                  cursor: 'pointer',
                  border: '1px solid var(--border)',
                  background: active ? 'var(--foreground)' : 'transparent',
                  color: active ? 'var(--background)' : 'var(--foreground)',
                }}
              >
                {s}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'grid', gap: 24 }}>
          {visible.map((c) => (
            <section
              key={c.name}
              style={{
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
                background: 'var(--card, #fff)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 12,
                  padding: '14px 18px',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <h2 style={{ fontSize: 18, margin: 0 }}>{c.name}</h2>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 0.4,
                    padding: '3px 9px',
                    borderRadius: 999,
                    color: '#fff',
                    background: SURFACE_COLORS[c.surface] || '#555',
                  }}
                >
                  {c.surface}
                </span>
              </div>

              {/* Live preview well */}
              <div
                style={{
                  padding: 24,
                  background:
                    'repeating-conic-gradient(var(--muted, #f1efe9) 0% 25%, transparent 0% 50%) 0 / 16px 16px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 120,
                }}
              >
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>{c.render()}</div>
              </div>

              {/* Metadata strip */}
              <div style={{ display: 'grid', gap: 4, padding: '14px 18px', borderTop: '1px solid var(--border)' }}>
                <MetaRow label="Class">
                  <code>{c.classFamily}</code>
                </MetaRow>
                <MetaRow label="Source">
                  <code>{c.path}</code>
                </MetaRow>
                <MetaRow label="Status">
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: 999,
                      border: '1px solid var(--border)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {c.status}
                  </span>
                </MetaRow>
                {c.note && <MetaRow label="Note">{c.note}</MetaRow>}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
