/* ------------------------------------------------------------------
   Step 3 – Integration Matrix  (with live “integrates_with” lookup)
   ------------------------------------------------------------------ */
'use client';

import { useAuditState, useAuditDispatch } from '@/context/AuditContext';
import rawIntegrations                     from '@/data/integration-data-updated.json';

/* ---------- type the JSON once ---------------------------------- */
interface IntegrationEntry {
  integrates_with: string[];
  /** any other fields present in the JSON that we’re not using yet */
  [key: string]: unknown;
}

const integrationMap: Record<string, IntegrationEntry> =
  rawIntegrations as Record<string, IntegrationEntry>;

export default function Step3Integrations() {
  const { software, integrations } = useAuditState();
  const dispatch                   = useAuditDispatch();

  /* helpers ------------------------------------------------------- */
  const setNote = (tool: string, value: string) =>
    dispatch({ type: 'SET_INTEGRATION', payload: { tool, value } });

  const next = () => dispatch({ type: 'NEXT' });

  /* -------------------------------------------------------------- */
  return (
    <section className="mx-auto max-w-4xl space-y-6 p-4">
      <h1 className="text-xl font-semibold text-center">
        Step 3 – Integration Matrix
      </h1>
      <p className="text-sm text-gray-600 text-center">
        Check what you’ve already connected and jot notes for anything tricky.
      </p>

      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Software</th>
              <th className="px-4 py-2 text-left font-medium">Integrates with</th>
              <th className="px-4 py-2 text-center font-medium">Already?</th>
              <th className="px-4 py-2 text-left font-medium">Notes</th>
            </tr>
          </thead>

          <tbody>
            {software.map((tool, idx) => {
              const entry  = integrationMap[tool];
              const target = entry?.integrates_with?.join(', ') || '—';

              return (
                <tr
                  key={tool}
                  className={idx % 2 ? 'bg-white' : 'bg-gray-50/50'}
                >
                  <td className="border-t px-4 py-2 font-medium">{tool}</td>
                  <td className="border-t px-4 py-2">{target}</td>

                  <td className="border-t px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-sky-600"
                      checked={!!integrations[tool]}
                      onChange={(e) =>
                        setNote(tool, e.target.checked ? '✔️' : '')
                      }
                    />
                  </td>

                  <td className="border-t px-4 py-2">
                    <input
                      value={integrations[tool] ?? ''}
                      onChange={(e) => setNote(tool, e.target.value)}
                      placeholder="e.g., sync to HubSpot"
                      className="w-full rounded border px-2 py-1"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        onClick={next}
        className="mx-auto block rounded bg-sky-600 px-6 py-2 font-semibold text-white hover:bg-sky-700"
      >
        Next
      </button>
    </section>
  );
}
