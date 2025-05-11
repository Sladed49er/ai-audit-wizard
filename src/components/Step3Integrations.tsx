// src/components/Step3Integrations.tsx
'use client';
import { useAuditState } from '@/context/AuditContext';

export default function Step3Integrations() {
  const { state, dispatch, goBack, reset } = useAuditState();

  /* toggle helper */
  const toggle = (name: string) => {
    dispatch({
      type: 'SET_INTEGRATIONS',
      payload: {
        ...state.integrationNotes,
        [name]: state.integrationNotes[name] ? '' : '✅ integrated',
      },
    });
  };

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">
        Step 3 – Mark software that’s already integrated
      </h1>

      {/* two-column table */}
      <div className="grid grid-cols-2 gap-4">
        {/* left column: selected software list */}
        <div>
          <h2 className="font-medium mb-2 text-gray-700">Software</h2>
          {state.software.map((s) => (
            <p key={s} className="border rounded p-2 mb-1">{s}</p>
          ))}
        </div>

        {/* right column: checkboxes to mark “already integrated” */}
        <div>
          <h2 className="font-medium mb-2 text-gray-700">Already integrated?</h2>
          {state.software.map((s) => (
            <label key={s} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={!!state.integrationNotes[s]}
                onChange={() => toggle(s)}
              />
              {state.integrationNotes[s] ? 'Yes' : 'No'}
            </label>
          ))}
        </div>
      </div>

      {/* nav buttons */}
      <div className="mt-6 flex justify-between">
        <button type="button" onClick={goBack}
          className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300">
          ← Back
        </button>

        <button type="button" onClick={reset}
          className="rounded bg-red-100 px-4 py-2 text-red-700 hover:bg-red-200">
          Reset form
        </button>

        <button type="button" onClick={() => dispatch({ type: 'NEXT' })}
          className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
          Next →
        </button>
      </div>
    </>
  );
}
