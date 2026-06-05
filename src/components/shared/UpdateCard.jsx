import { CATEGORY_ICONS } from '../partner/data/categoryIcons.jsx';
import { IMPACT_AREA_ICONS } from '../dashboard/data/orgTaxonomy.jsx';

// components/shared/UpdateCard.jsx
// Canonical Update Card — used by FFG Dashboard + FFG Partner.
// Style authority: pt-updates (Partner surface).
//
// Props:
//   title  {string}  — card headline
//   copy   {string}  — body text
//   tag    {string?} — impact-area label (e.g. "Community", "Education")
//   img    {string?} — image URL; omit to render the striped placeholder
//   alt    {string?} — img alt text (pass "" for decorative images)

const UpdateCard = ({ title, copy, tag, img, alt }) => {
  const slug = tag ? tag.toLowerCase().replace(/\s+/g, '-') : null;

  // Resolve the tag icon. Both maps carry the same glyph set keyed by label;
  // CATEGORY_ICONS wraps it as { svg, color }, IMPACT_AREA_ICONS is the svg.
  let icon = null;
  if (tag) {
    if (CATEGORY_ICONS[tag]) icon = CATEGORY_ICONS[tag].svg;
    else if (IMPACT_AREA_ICONS[tag]) icon = IMPACT_AREA_ICONS[tag];
  }

  const tagEl = !tag ? null : icon
    ? (
      <span className={`impact-badge impact-badge--${slug}`} style={{ alignItems: 'center', justifyContent: 'flex-start', alignSelf: 'flex-start' }}>
        <span className="impact-badge__icon">{icon}</span>
        <span style={{ fontSize: '14px', fontWeight: '300', color: 'rgb(121, 119, 114)' }}>{tag}</span>
      </span>
    )
    : (
      <span className="pt-badge" style={{ fontSize: '14px', fontWeight: '300', alignSelf: 'flex-start' }}>{tag}</span>
    );

  return (
    <article className="update-card">
      <div className="update-card__image">
        {img
          ? (
            <img
              src={img}
              alt={alt || ''}
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          )
          : (
            <div
              aria-hidden="true"
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: 'repeating-linear-gradient(45deg, var(--ffg-surface-200) 0 10px, var(--ffg-surface-100) 10px 20px)'
              }}
            />
          )
        }
      </div>
      <div className="update-card__body">
        <h4 className="update-card__title">{title}</h4>
        <p className="update-card__copy">{copy}</p>
        {tagEl}
      </div>
    </article>
  );
};


export { UpdateCard };
