import { PIcon } from '../icons/PIcon';
import { statusForName, tierForName } from '../data/statusTaxonomy';
import { PARTNER_DESC } from '../data/partners';
import { Badge } from '../atoms/Badge';
import { LogoPlaceholder } from '../atoms/LogoPlaceholder';

function PartnerCard({ partner, onOpen }) {
  const status = statusForName(partner.name);
  const tier = tierForName(partner.name, status);
  const isVerified = status === "Verified";

  return (
    <article className="pt-card" onClick={onOpen} role="button" tabIndex={0}
    onKeyDown={(e) => {if (e.key === "Enter") onOpen();}} style={{ height: "275px", opacity: "0.25", backgroundColor: "rgba(255, 255, 255, 0.25)" }}>
      {/* Identity: logo + name (+ verified badge) + location, with the
              open-card affordance pinned top-right. */}
      <div className="pt-card__head">
        <div className="pt-card__id">
          <LogoPlaceholder name={partner.name} />
          <div className="pt-card__name-block">
            <h3 className="pt-card__name">
              <span>{partner.name}</span>
              {isVerified &&
              <span className="pt-card__verified" aria-label="Verified" title="Verified">
                  <PIcon.ShieldCheck />
                </span>}
            </h3>
            <div className="pt-card__loc">
              <span style={{ fontSize: "14px" }}>{partner.location}</span>
            </div>
          </div>
        </div>
        <button
          className="pt-card__open"
          aria-label={`Open ${partner.name}`}
          onClick={(e) => {e.stopPropagation();onOpen();}}>
          <PIcon.ArrowUpRight />
        </button>
      </div>

      <p className="pt-card__desc">{partner.desc || PARTNER_DESC}</p>

      <div className="pt-card__tags">
        {partner.tags.map((t, i) => <Badge key={i}>{t}</Badge>)}
      </div>

      {/* Footer: credibility tier (1–5) */}
      <div className="pt-card__foot pt-card__foot--tier" style={{ alignItems: "baseline" }}>
        <span className="pt-card__tier" style={{ fontWeight: "400" }}>Tier {tier}</span>
        <span className="pt-card__tier-unit" style={{ fontSize: "14px" }}>/ Credibility scale</span>
        <PIcon.Info className="pt-info" />
      </div>
    </article>);

}


export { PartnerCard };
