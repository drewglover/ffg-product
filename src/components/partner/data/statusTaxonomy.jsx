
// ── Status / tier derivation ────────────────────────────────────────────────
// Each org sits at one of three points in FFG’s vetting pipeline. Status is
// hashed from the org name so it’s stable across renders; tier (1–5) is
// constrained by status so the two columns can’t contradict each other —
// a Verified org can’t read Tier 1, a Screening org can’t read Tier 5.
const STATUSES = {
  "Screening": { icon: "Clock", variant: "idle" },
  "Ongoing Review": { icon: "Search", variant: "active" },
  "Verified": { icon: "ShieldCheck", variant: "resolved" }
};

const hashName = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
  return h;
};

const statusForName = (name) => {
  // 50% Verified, 33% Ongoing Review, 17% Screening — most partners FFG
  // surfaces are already through the pipeline; only a few are still being
  // assessed. Keeps the directory from reading as “all probationary”.
  const buckets = [
  "Verified", "Verified", "Verified",
  "Ongoing Review", "Ongoing Review",
  "Screening"];

  return buckets[hashName(name) % buckets.length];
};

const tierForName = (name, status) => {
  const h = hashName(name + "#tier");
  if (status === "Verified") return 4 + h % 2; // 4–5
  if (status === "Ongoing Review") return 2 + h % 3; // 2–4
  return 1 + h % 2; // 1–2
};


export { STATUSES, hashName, statusForName, tierForName };
