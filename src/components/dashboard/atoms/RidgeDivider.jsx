import { Hero } from '../sections/Hero';

/* ConfirmAllocationBanner removed — confirmation is now inline in the Hero alloc card */

/* ====== Ridge divider ====== */
function RidgeDivider() {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <svg
        width="33%"
        viewBox="0 0 252 50"
        fill="none"
        aria-hidden="true">

        <path
          d="M0.249023 48.8633L83.9157 0.863281V48.8633L167.582 0.863281V48.8633L251.249 0.863281V48.8633"
          stroke="var(--ffg-surface-800)"
          strokeWidth="1" style={{ stroke: "var(--ffg-surface-950)", opacity: "0.1" }} />

      </svg>
    </div>);

}


export { RidgeDivider };
