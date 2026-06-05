import { Ic } from '../icons/Ic';

/* ── Cause area catalog ───────────────────────────────── */
const CAUSE_AREAS = [
{ id: "environment", name: "Environment", icon: Ic.Leaf, description: "You're drawn to climate resilience, conservation, and the systems that keep ecosystems intact for future generations." },
{ id: "education", name: "Education", icon: Ic.Book, description: "Education is your lever — closing access gaps and investing in the institutions that shape what comes next." },
{ id: "health", name: "Health", icon: Ic.Heart, description: "Physical and mental wellbeing as foundational — relief in crisis, access to care, and the conditions for healthy lives." },
{ id: "social", name: "Social Justice", icon: Ic.Scale, description: "You believe systemic barriers compound — and that closing the equity gap is how durable change actually happens." },
{ id: "community", name: "Community", icon: Ic.Users, description: "Local-first impact: neighborhoods, civic infrastructure, and the organizations that hold communities together." },
{ id: "culture", name: "Culture", icon: Ic.Drama, description: "Arts, heritage, and creative expression — the institutions that preserve identity and make life worth living." },
{ id: "economic", name: "Economic Growth", icon: Ic.Trending, description: "Pathways out of poverty through opportunity — workforce development, capital access, and entrepreneurship." },
{ id: "humanitarian", name: "Humanitarian", icon: Ic.CrossMed, description: "Direct, immediate relief — food, shelter, and medical aid for people in active crisis." }];


const CAUSE_BY_ID = Object.fromEntries(CAUSE_AREAS.map((c) => [c.id, c]));


export { CAUSE_AREAS, CAUSE_BY_ID };
