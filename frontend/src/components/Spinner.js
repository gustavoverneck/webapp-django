export default function Spinner() {
  return (
    <span className="dashboard-spinner" role="status" aria-label="Carregando">
      <svg viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="#ff6b35"
          strokeWidth="4"
          strokeDasharray="60"
          strokeDashoffset="20"
        />
      </svg>
    </span>
  );
}