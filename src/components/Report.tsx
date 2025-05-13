/* --------------------------------------------------------------
   Final report view  (print-friendly)
   -------------------------------------------------------------- */
'use client';

import { useRef }         from 'react';
import { useReactToPrint } from 'react-to-print';

import { useAuditState }   from '@/context/AuditContext';

export default function Report() {
  /*  useAuditState returns THE STATE OBJECT, not an array */
  const state = useAuditState();

  const ref   = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({
    content: () => ref.current,
  });

  return (
    <section className="mx-auto max-w-4xl space-y-6 p-4">
      <h1 className="text-2xl font-semibold text-center">AI Audit Report</h1>

      {/* printable area ------------------------------------------------ */}
      <div ref={ref} className="space-y-4 rounded border bg-white p-6 shadow">
        <h2 className="text-xl font-medium">Snapshot</h2>
        <p>
          <strong>Name:</strong> {state.name} <br />
          <strong>Company:</strong> {state.company} <br />
          <strong>Industry:</strong> {state.industry}
        </p>

        <h2 className="text-xl font-medium">Selected Software</h2>
        <ul className="list-disc pl-6">
          {state.software.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <h2 className="text-xl font-medium">Pain Points</h2>
        <ul className="list-disc pl-6">
          {state.painPoints.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>

        <h2 className="text-xl font-medium">Automation Wish</h2>
        <p>{state.idea}</p>
      </div>

      <button
        onClick={print}
        className="mx-auto block rounded bg-sky-600 px-8 py-2 font-semibold text-white hover:bg-sky-700"
      >
        Print / Save PDF
      </button>
    </section>
  );
}
