'use client';

/* ------------------------------------------------------------------
   Appendix.tsx
   Renders optional software-recommendation bullets in the report.
   ------------------------------------------------------------------ */

interface Props {
  data?: {
    softwareRecommendations?: string[];
    bestPractices?: string[];         // other keys are fine; ignored for now
  };
}

export default function Appendix({ data }: Props) {
  const sw = data?.softwareRecommendations ?? [];

  /* Nothing to show?  Don’t render the section at all. */
  if (sw.length === 0) return null;

  return (
    <section className="rounded border p-6 shadow">
      <h2 className="text-xl font-semibold mb-2">Appendix</h2>

      <h3 className="font-medium">Software Recommendations</h3>
      <ul className="list-disc pl-6 space-y-1">
        {sw.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
