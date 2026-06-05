
const Section = ({ title, body, children }) =>
<section className="pt-sec" style={{ gap: "40px", alignItems: "flex-start", width: "900px" }}>
    <h2 className="pt-sec__title" style={{ fontFamily: "\"PP Fragment Sans\"", fontSize: "20px" }}>{title}</h2>
    {body && <p className="pt-sec__body">{body}</p>}
    <div className="pt-sec__content" style={{ gap: "40px", width: "900px" }}>{children}</div>
  </section>;


export { Section };
