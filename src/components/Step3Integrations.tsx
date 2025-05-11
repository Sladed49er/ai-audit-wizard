// src/components/Step3Integrations.tsx
'use client';

import { useAuditState } from '@/context/AuditContext';
import { getIntegrationMap } from '@/lib/getData';

export default function Step3Integrations() {
  const { state, dispatch, goBack, reset } = useAuditState();
  const integrationMap = getIntegrationMap();

  /* toggle check-box helper */
  const toggle = (name: string) => {
    dispatch({
      type: 'SET_INTEGRATIONS',
      payload: {
        ...state.integrationNotes,
        [name]: state.integrationNotes[name] ? '' : '✅ integrated',
      },
    });
  };

  /* build rows for table */
  const rows = state.software.map((sw) => ({
    name: sw,
    integrated: !!state.integrationNotes[sw],
    partners: integrationMap[sw]?.integrates_with.join(', ') ?? '—',
  }));

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">
        Step&nbsp;3 – Mark current integrations
      </h1>

      {/* three-column responsive table */}
      <div className="overflow-x-auto">
        <table className="min-w-full rounded border">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-2 border">Software</th>
              <th className="p-2 border text-center">Already integrated?</th>
              <th className="p-2 border">Integrates with…</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="odd:bg-white even:bg-gray-50">
                <td className="p-2 border">{r.name}</td>
                <td className="p-2 border text-center">
                  <input
                    type="checkbox"
                    checked={r.integrated}
                    onChange={() => toggle(r.name)}
                  />
                </td>
                <td className="p-2 border">{r.partners}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* nav buttons */}
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={goBack}
          className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={reset}
          className="rounded bg-red-100 px-4 py-2 text-red-700 hover:bg-red-200"
        >
          Reset form
        </button>

        <button
          type="button"
          onClick={() => dispatch({ type: 'NEXT' })}
          className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          Next →
        </button>
      </div>
    </>
  );
}
