import { PIcon } from '../icons/PIcon';
import { PARTNER_DESC } from '../data/partners';
import { CATEGORY_ICONS } from '../data/categoryIcons';
import { Badge } from '../atoms/Badge';
import { LogoPlaceholder } from '../atoms/LogoPlaceholder';
import { KPI } from '../atoms/KPI';
import { Section } from '../atoms/Section';
import { Stat } from '../atoms/Stat.partner';
import { TimelineStep } from '../atoms/TimelineStep';
import { UpdateCard } from '../../shared/UpdateCard';
import { Accordion } from '../modals/Accordion.partner';
import { ChartCard } from '../charts/ChartCard';

// ═══════════════════════════════════════════════════════════════════════════
// INDIVIDUAL PARTNER PAGE
// ═══════════════════════════════════════════════════════════════════════════
function PartnerDetail({ partner, onBack }) {
  return (
    <div className="pt-detail">
      {/* Top bar — Back link */}
      <div className="pt-topbar">
        <button className="pt-back" onClick={onBack} style={{ fontSize: "14px" }}>
          <PIcon.ArrowLeft />
          All partners
        </button>
      </div>

      {/* Hero — org identity top, then two-column: desc+tags left, KPIs right */}
      <section className="pt-hero">
        {/* Logo + name + meta */}
        <div className="pt-hero__id">
          <LogoPlaceholder size={72} name={partner.name} />
          <div className="pt-hero__id-text">
            <h1 style={{ fontFamily: "\"PP Fragment Sans\", sans-serif", fontWeight: 400, fontStyle: "normal", fontSize: "48px", lineHeight: 1.05, letterSpacing: "-0.01em", margin: 0 }}>
              {partner.name}
            </h1>
            <div className="pt-side__meta">
              <span className="pt-side__meta-item">
                <PIcon.MapPin />
                {partner.location}
              </span>
              <span className="pt-side__meta-dot" />
              <a className="pt-side__meta-item pt-side__meta-item--link" href="#">
                <PIcon.Link />
                Website
              </a>
              <span className="pt-side__meta-dot" />
              <span className="pt-side__meta-item">
                <PIcon.Search />
                Ongoing Review
              </span>
            </div>
          </div>
        </div>

        {/* Description + tags (left) · KPIs side-by-side (right) */}
        <div className="pt-hero__body">
          <div>
            <p className="pt-side__desc">{PARTNER_DESC}</p>
            <div className="pt-side__tags">
              {partner.tags.map((t, i) => <Badge key={i}>{t}</Badge>)}
            </div>
          </div>
          <div className="pt-hero__kpis">
            <KPI label="Yearly People Reached" value="142" />
            <KPI label="Cost Per Outcome" value="$1,600" />
          </div>
        </div>
      </section>

      <main className="pt-main">
        {/* Why we chose */}
        <Section title="Why we chose this partner" aside={
          <div className="pt-reviewed-by">
            <div className="pt-reviewed-by__badge">
              <span className="pt-reviewed-by__logo">F/G</span>
            </div>
            <div className="pt-reviewed-by__text">
              <span className="pt-reviewed-by__label">Reviewed by</span>
              <span className="pt-reviewed-by__name">FFG Impact Team</span>
            </div>
          </div>
        }>
          <div className="pt-acc-list">
            <Accordion icon={<PIcon.Target />} title="Problem Quality" defaultOpen>
              <p className="pt-acc__copy" style={{ color: "var(--ffg-muted)", fontSize: "16px" }}>
{partner.name} addresses a clearly defined, high-impact problem with strong evidence of need. The scope is focused enough to drive measurable change while meaningful enough to matter at scale.
              </p>
            </Accordion>
            <Accordion icon={<PIcon.Users />} title="Team & Leadership">
              <p className="pt-acc__copy" style={{ color: "var(--ffg-muted)", fontSize: "16px" }}>
The leadership team brings deep domain expertise, lived experience, and a track record of sound decision-making. We trust them to operate with integrity, humility, and community connection.
              </p>
            </Accordion>
            <Accordion icon={<PIcon.BarChart />} title="Track Record & Approach">
              <p className="pt-acc__copy" style={{ color: "var(--ffg-muted)", fontSize: "16px" }}>
{partner.name} has demonstrated consistent, reproducible results over time. Their methodology is grounded in evidence and adapted thoughtfully to the communities they serve.
              </p>
            </Accordion>
            <Accordion icon={<PIcon.TrendingUp />} title="Growth Potential & Fit">
              <p className="pt-acc__copy" style={{ color: "var(--ffg-muted)", fontSize: "16px" }}>
This organization is positioned for responsible growth. Their model aligns well with Factory for Good's strategic focus areas and has clear pathways to expand reach without sacrificing quality.
              </p>
            </Accordion>
            <Accordion icon={<PIcon.Coin />} title="Cost Effectiveness & Leverage">
              <p className="pt-acc__copy" style={{ color: "var(--ffg-muted)", fontSize: "16px" }}>
Dollars directed to {partner.name} go far. Their cost-per-outcome benchmarks favorably against peers, and their model creates downstream leverage — multiplying impact beyond the direct investment.
              </p>
            </Accordion>
          </div>
        </Section>

        {/* Performance Metrics */}
        <Section title="Performance Metrics">
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

          {/* Cause Allocation treemap */}
          <div className="pt-alloc">
            <div className="pt-label-row">
              <span className="pt-label">Cause Allocation</span>
              <PIcon.Info className="pt-info" />
            </div>
            <div className="pt-tm">
              <div className="pt-tm__col">
                <div className="pt-tm__cell" style={{ borderColor: CATEGORY_ICONS["Culture"].color }}>
                  <div className="pt-tm__pct" style={{ fontFamily: "\"PP Fragment Sans\"" }}>20%</div>
                  <div className="pt-tm__cat" style={{ fontSize: "14px" }}>Culture</div>
                </div>
                <div className="pt-tm__cell" style={{ borderColor: CATEGORY_ICONS["Education"].color }}>
                  <div className="pt-tm__pct" style={{ fontFamily: "\"PP Fragment Sans\"" }}>20%</div>
                  <div className="pt-tm__cat" style={{ fontSize: "14px" }}>Education</div>
                </div>
              </div>
              <div className="pt-tm__col pt-tm__col--wide">
                <div className="pt-tm__cell pt-tm__cell--lg" style={{ borderColor: CATEGORY_ICONS["Social Justice"].color }}>
                  <div className="pt-tm__pct" style={{ fontFamily: "\"PP Fragment Sans\"" }}>40%</div>
                  <div className="pt-tm__cat" style={{ fontSize: "14px", fontWeight: "300" }}>Social Justice</div>
                </div>
              </div>
            </div>
            <div className="pt-tm pt-tm--row">
              <div className="pt-tm__cell pt-tm__cell--row" style={{ borderColor: CATEGORY_ICONS["Community"].color }}>
                <div className="pt-tm__pct" style={{ fontFamily: "\"PP Fragment Sans\"" }}>15%</div>
                <div className="pt-tm__cat" style={{ fontSize: "14px" }}>Community</div>
              </div>
              <div className="pt-tm__cell pt-tm__cell--row pt-tm__cell--wide" style={{ borderColor: CATEGORY_ICONS["Environment"].color }}>
                <div className="pt-tm__pct" style={{ fontFamily: "\"PP Fragment Sans\"" }}>15%</div>
                <div className="pt-tm__cat" style={{ fontSize: "14px" }}>Environment</div>
              </div>
            </div>
          </div>

          {/* Two side-by-side charts */}
          <div className="pt-charts">
            <ChartCard title="Depth of Intervention" />
            <ChartCard title="Strength of Intervention" />
          </div>
        </Section>

        {/* How Your Impact Works */}
        <Section title="How Your Impact Works">
          <ol className="pt-timeline">
            <TimelineStep n="01" tag="Funding" time="1–2 weeks" />
            <TimelineStep n="02" tag="Intervention" time="6–8 weeks" />
            <TimelineStep n="03" tag="Outputs" time="6–8 Months" />
            <TimelineStep n="04" tag="Outcomes" time="6–8 Months" last />
          </ol>
        </Section>

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
      <section className="pt-updates">
        <div className="pt-updates__head">
          <h2 className="pt-updates__title" style={{ fontSize: "20px", fontFamily: "\"PP Fragment Sans\"" }}>Updates from your partners and community</h2>
          <a className="pt-updates__more" href="#" style={{ fontSize: "16px", fontWeight: "300" }}>See more</a>
        </div>
        <div className="pt-updates__grid">
          <UpdateCard
          // Family/home interior — reads as the moment a shelter becomes housing.
          img="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=80&auto=format&fit=crop"
          title="New shelter site opens in Treasure Valley"
          copy="We've opened a new shelter wing with capacity to serve another 100 families this winter."
          tag="Community" />

          <UpdateCard
          // Neighborhood / housing rows — ties to the housing-stability report.
          img="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80&auto=format&fit=crop"
          title="Q1 housing-stability report is live"
          copy="Three quarters in, our caseworkers report a 38% drop in repeat-shelter intake across the families we placed last year."
          tag="Education" />

          <UpdateCard
          // People around a table — case-management / training scene.
          img="https://images.unsplash.com/photo-1552581234-26160f608093?w=900&q=80&auto=format&fit=crop"
          title="Partnering with Boise State on case-management training"
          copy="A new cohort of social-work students is shadowing our caseworkers each week as part of a year-long field placement."
          tag="Culture" />

        </div>
        <div className="pt-updates__nav">
          <button className="pt-arrow" aria-label="Previous"><PIcon.ArrowLeft /></button>
          <button className="pt-arrow" aria-label="Next"><PIcon.Arrow /></button>
        </div>
      </section>
    </div>);

}


export { PartnerDetail };
