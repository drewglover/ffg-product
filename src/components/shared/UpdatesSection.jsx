import { UpdateCard } from './UpdateCard';

// components/shared/UpdatesSection.jsx
// Canonical "Updates from your partners and community" section.
// Used by FFG Dashboard + FFG Partner. Driven entirely by the `items` array,
// so each surface supplies its own copy/images.
//
// Props:
//   items       {Array}   — update records: { title, body, partner?, tag?, img?, alt? }
//   title       {string?} — section heading
//   seeMoreHref {string?} — "See more" link target

const UpdatesSection = ({
  items = [],
  title = 'Updates from your organizations and community',
  seeMoreHref = '#',
}) => {
  return (
    <section className="section-block updates-section" aria-label={title}>
      <div className="updates-head" style={{ alignItems: 'flex-end' }}>
        <h3 style={{ fontWeight: '300', fontSize: '20px' }}>{title}</h3>
        <a href={seeMoreHref} className="see-more" style={{ fontSize: '16px' }}>See more</a>
      </div>
      <div className="updates-grid">
        {items.map((item, i) => (
          <UpdateCard
            key={i}
            title={item.title}
            copy={item.body}
            partner={item.partner}
            tag={item.tag}
            img={item.img}
            alt={item.alt}
          />
        ))}
      </div>
    </section>
  );
};

export { UpdatesSection };
