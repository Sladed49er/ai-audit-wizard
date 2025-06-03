// src/components/ui/Spinner.tsx
export default function Spinner({ className = '' }) {
  return (
    <svg
      className={`animate-spin text-sky-600 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4"/>
      <path  className="opacity-75" fill="currentColor"
             d="M4 12a8 8 0 018-8v4l5-5-5-5v4A12 12 0 004 12z" />
    </svg>
  );
}

