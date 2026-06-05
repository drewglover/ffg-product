import { CATEGORY_ICONS } from '../data/categoryIcons';

const Badge = ({ children, solid }) => {
  const cat = typeof children === "string" ? CATEGORY_ICONS[children] : null;
  if (cat && !solid) {
    const slug = children.toLowerCase().replace(/\s+/g, "-");
    return (
      <span className={`impact-badge impact-badge--${slug}`} style={{ alignItems: "center", justifyContent: "flex-start" }}>
        <span className="impact-badge__icon">{cat.svg}</span>
        <span style={{ fontSize: "14px", fontWeight: "300", color: "rgb(121, 119, 114)" }}>{children}</span>
      </span>);


  }
  return <span className={"pt-badge" + (solid ? " pt-badge--solid" : "")} style={{ fontSize: "14px", fontWeight: "400" }}>{children}</span>;
};


export { Badge };
