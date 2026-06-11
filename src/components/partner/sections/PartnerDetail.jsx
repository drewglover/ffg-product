import { PIcon } from '../icons/PIcon';
import { PARTNER_DESC } from '../data/partners';
import { CATEGORY_ICONS } from '../data/categoryIcons';
import { Badge } from '../atoms/Badge';
import { LogoPlaceholder } from '../atoms/LogoPlaceholder';
import { KPI } from '../atoms/KPI';
import { Section } from '../atoms/Section';
import { Stat } from '../atoms/Stat.partner';
import { TimelineStep } from '../atoms/TimelineStep';
import { UpdatesSection } from '../../shared/UpdatesSection';
import { PARTNER_UPDATE_ITEMS } from '../data/updateItems';
import { Accordion } from '../modals/Accordion.partner';
import { ChartCard } from '../charts/ChartCard';
import { DotChart } from '../charts/DotChart';

// ═══════════════════════════════════════════════════════════════════════════
// INDIVIDUAL PARTNER PAGE
// ═══════════════════════════════════════════════════════════════════════════
function PartnerDetail({ partner, onBack }) {
  return (
    <div className="pt-detail">
      {/* Top bar — Back link + right-side badges */}
      <div className="pt-topbar">
        <button className="pt-back" onClick={onBack} style={{ fontSize: "14px" }}>
          <PIcon.ArrowLeft />
          All Opportunities
        </button>
        <div className="pt-topbar__badges">
          <div className="pt-backed">
            <PIcon.ShieldCheck />
            Backed by 112 Builders
          </div>
          <div className="pt-backed">
            <PIcon.Search />
            Ongoing Review
          </div>
        </div>
      </div>

      {/* Hero — logo + name, meta row, desc, tags, KPIs */}
      <section className="pt-hero">
        {/* Logo + name + meta */}
        <div className="pt-hero__id">
          <LogoPlaceholder size={84} name={partner.name} />
          <div className="pt-hero__id-text">
            <h1 style={{ fontFamily: "\"PP Fragment Sans\", sans-serif", fontWeight: 400, fontStyle: "normal", fontSize: "48px", lineHeight: 1.05, letterSpacing: "-0.01em", margin: 0 }}>
              {partner.name}
            </h1>
            <div className="pt-side__meta">
              <span className="pt-side__meta-item" style={{ fontSize: "13px", color: "var(--ffg-muted)", fontWeight: 300 }}>
                EIN: 12-3456789
              </span>
              <span className="pt-side__meta-dot" />
              <a className="pt-side__meta-item pt-side__meta-item--link" href="#">
                <PIcon.Link />
                Website
              </a>
            </div>
          </div>
        </div>

        {/* Description — full width */}
        <p className="pt-side__desc" style={{ marginTop: "24px" }}>{PARTNER_DESC}</p>

        {/* Cause area tags */}
        <div className="pt-side__tags" style={{ marginTop: "24px" }}>
          {partner.tags.map((t, i) => <Badge key={i}>{t}</Badge>)}
        </div>

        {/* KPIs row — 3 items */}
        <div className="pt-hero__kpis" style={{ marginTop: "48px" }}>
          <KPI label="Yearly People Reached" value="142" />
          <KPI label="Cost Per Outcome" value="$1,600" />
          <KPI label="Stage" value="500K–2M" />
        </div>
      </section>

      {/* Photo + Location — two-column row */}
      <div className="pt-photo-loc">
        <div className="pt-org-photo">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80&auto=format&fit=crop"
            alt={`${partner.name} — organization photo`}
            className="pt-org-photo__img"
          />
        </div>
        <div className="pt-photo-loc__info">
          <div className="pt-loc-box">
            <span className="pt-hero__detail-label">Location (1)</span>
            <span className="pt-hero__detail-sub">Places where this organization intervenes</span>
            <span className="pt-hero__detail-value">{partner.location}</span>
          </div>
        </div>
      </div>

      {/* Why we chose — full width, outside pt-main */}
      <div className="pt-why">
        <Section title="Why we chose this partner" fullWidth aside={
          <div className="pt-reviewed-by">
            <div className="pt-reviewed-by__badge">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="17" stroke="#C8C5BF" strokeWidth="1" />
                <text x="18" y="23" textAnchor="middle" fontFamily='"PP Fragment Glare", serif' fontSize="12" fontWeight="300" fill="currentColor" letterSpacing="0.02em">FfG</text>
              </svg>
            </div>
            <div className="pt-reviewed-by__text">
              <span className="pt-reviewed-by__label">Reviewed by</span>
              <span className="pt-reviewed-by__name">FFG Impact Team</span>
            </div>
          </div>
        }>
          <div className="pt-acc-list pt-acc-list--boxed">
            <div className="ob-cause-card">
              <Accordion icon={<PIcon.Target />} title="Problem Quality" defaultOpen>
                <p className="pt-acc__copy" style={{ color: "var(--ffg-muted)", fontSize: "16px" }}>
{partner.name} addresses a clearly defined, high-impact problem with strong evidence of need. The scope is focused enough to drive measurable change while meaningful enough to matter at scale.
                </p>
              </Accordion>
            </div>
            <div className="ob-cause-card">
              <Accordion icon={<PIcon.Users />} title="Team & Leadership">
                <p className="pt-acc__copy" style={{ color: "var(--ffg-muted)", fontSize: "16px" }}>
The leadership team brings deep domain expertise, lived experience, and a track record of sound decision-making. We trust them to operate with integrity, humility, and community connection.
                </p>
              </Accordion>
            </div>
            <div className="ob-cause-card">
              <Accordion icon={<PIcon.BarChart />} title="Track Record & Approach">
                <p className="pt-acc__copy" style={{ color: "var(--ffg-muted)", fontSize: "16px" }}>
{partner.name} has demonstrated consistent, reproducible results over time. Their methodology is grounded in evidence and adapted thoughtfully to the communities they serve.
                </p>
              </Accordion>
            </div>
            <div className="ob-cause-card">
              <Accordion icon={<PIcon.TrendingUp />} title="Growth Potential & Fit">
                <p className="pt-acc__copy" style={{ color: "var(--ffg-muted)", fontSize: "16px" }}>
This organization is positioned for responsible growth. Their model aligns well with Factory for Good's strategic focus areas and has clear pathways to expand reach without sacrificing quality.
                </p>
              </Accordion>
            </div>
            <div className="ob-cause-card">
              <Accordion icon={<PIcon.Coin />} title="Cost Effectiveness & Leverage">
                <p className="pt-acc__copy" style={{ color: "var(--ffg-muted)", fontSize: "16px" }}>
Dollars directed to {partner.name} go far. Their cost-per-outcome benchmarks favorably against peers, and their model creates downstream leverage — multiplying impact beyond the direct investment.
                </p>
              </Accordion>
            </div>
          </div>
        </Section>
      </div>

      <div className="pt-why">
        <Section title="Performance Metrics" fullWidth>
          <div className="pt-metrics-grid">
            {/* Left column — POI slider + charts stacked */}
            <div className="pt-metrics-left">
              {/* Point of Intervention slider */}
              <div className="pt-poi">
                <div className="pt-label-row">
                  <span className="pt-label">Point of Intervention</span>
                  <PIcon.Info className="pt-info" />
                </div>
                <p className="pt-sub" style={{ fontSize: "14px" }}>
                  Our intervention keeps individuals and families on stable footing.
                </p>
                <div className="pt-poi__track">
                  <div className="pt-poi__fill" style={{ width: "50%" }} />
                  <div className="pt-poi__dot" style={{ left: "50%" }} />
                </div>
                <div className="pt-poi__labels">
                  <span style={{ fontSize: "14px" }}>Suffering</span>
                  <span style={{ fontSize: "14px" }}>Stable</span>
                  <span style={{ fontSize: "14px" }}>Flourishing</span>
                </div>
              </div>

              {/* Dot scatter chart */}
              <DotChart peopleReached={1000} depth={2} />
            </div>

            {/* Right column — Cause Allocation treemap */}
            <div className="pt-metrics-right">
              <div className="pt-alloc">
                <div className="pt-label-row">
                  <span className="pt-label">Cause Allocation</span>
                  <PIcon.Info className="pt-info" />
                </div>
                <div className="pt-tm-grid">
                  <div className="pt-tm__cell" style={{ borderColor: CATEGORY_ICONS["Culture"].color, gridArea: "culture" }}>
                    <div className="pt-tm__pct">20%</div>
                    <div className="pt-tm__cat">Culture</div>
                  </div>
                  <div className="pt-tm__cell" style={{ borderColor: CATEGORY_ICONS["Education"].color, gridArea: "education" }}>
                    <div className="pt-tm__pct">20%</div>
                    <div className="pt-tm__cat">Education</div>
                  </div>
                  <div className="pt-tm__cell" style={{ borderColor: CATEGORY_ICONS["Social Justice"].color, gridArea: "social" }}>
                    <div className="pt-tm__pct">40%</div>
                    <div className="pt-tm__cat">Social Justice</div>
                  </div>
                  <div className="pt-tm__cell" style={{ borderColor: CATEGORY_ICONS["Community"].color, gridArea: "community" }}>
                    <div className="pt-tm__pct">15%</div>
                    <div className="pt-tm__cat">Community</div>
                  </div>
                  <div className="pt-tm__cell" style={{ borderColor: CATEGORY_ICONS["Environment"].color, gridArea: "environment" }}>
                    <div className="pt-tm__pct">15%</div>
                    <div className="pt-tm__cat">Environment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* How Your Impact Works — full width */}
      <div className="pt-why">
        <Section title="How Your Impact Works" fullWidth>
          <div className="pt-tl-cards">
            <TimelineStep n="01" tag="Funding" time="1–2 weeks" />
            <TimelineStep n="02" tag="Intervention" time="6–8 weeks" />
            <TimelineStep n="03" tag="Outputs" time="6–8 Months" />
            <TimelineStep n="04" tag="Outcomes" time="6–8 Months" />
          </div>
        </Section>
      </div>

      <main className="pt-main">
        {/* Proven Outcomes */}
        <Section title="Proven Outcomes">
          <div className="pt-results">
            <Stat label="Evictions avoided" value="1,345" />
            <Stat label="People supported" value="3,442" />
            <Stat label="Homes built" value="8,142" />
          </div>
        </Section>
      </main>

      {/* Updates from your partners and community */}
      <UpdatesSection items={PARTNER_UPDATE_ITEMS} />
    </div>);

}


export { PartnerDetail };
