// -------------------------------------------------------------
// Simple SVG loader used while calling /api/generatePlan
// -------------------------------------------------------------
export default function Spinner() {
  return (
    <svg
      className="h-6 w-6 animate-spin text-sky-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <circle cx="12" cy="12" r="10" opacity=".25" />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        strokeLinecap="round"
        opacity=".75"
      />
    </svg>
  );
}
