import { UPDATE_ITEMS } from '../data/updateItems';
import { UpdateCard } from '../../shared/UpdateCard';

function UpdatesSection() {
  return (
    <section className="section-block updates-section" aria-label="Updates from your partners and community">
      <div className="updates-head" style={{ alignItems: "flex-end" }}>
        <h3 style={{ fontWeight: "300", fontSize: "20px" }}>Updates from your partners and community</h3>
        <a href="#" className="see-more" style={{ fontSize: "16px" }}>See more</a>
      </div>
      <div className="updates-grid">
        {UPDATE_ITEMS.map((item, i) =>
        <UpdateCard
          key={i}
          title={item.title}
          copy={item.body}
          partner={item.partner}
          tag={item.tag}
          img={item.img}
          alt={item.alt} />

        )}
      </div>
    </section>);

}


export { UpdatesSection };
