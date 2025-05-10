'use client';
import { useForm } from 'react-hook-form';
import { useAuditState } from '@/context/AuditContext';
import { getIntegrationList } from '@/lib/getData';

type FormData = {
  integrationNotes: Record<string, string>;
  alreadyIntegrated: Record<string, boolean>;
};

export default function Step3Integrations() {
  const [state, dispatch] = useAuditState();
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: { integrationNotes: {}, alreadyIntegrated: {} },
  });
  const onSubmit = (d: FormData) => {
    dispatch({ type: 'SET_INTEGRATIONS', payload: d.integrationNotes });
    dispatch({ type: 'NEXT' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-xl font-semibold mb-2">Step 3 – Integration Matrix</h1>
      <p className="text-sm text-gray-600">
        Check what you’ve already connected and jot notes for anything tricky.
      </p>

      <table className="w-full text-sm border">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-1 border">Software</th>
            <th className="px-2 py-1 border">Integrates with</th>
            <th className="px-2 py-1 border">Already?</th>
            <th className="px-2 py-1 border">Notes</th>
          </tr>
        </thead>
        <tbody>
          {state.software.map((code) => {
            const list = getIntegrationList(code);
            return (
              <tr key={code}>
                <td className="border px-2 py-1 font-medium">{code}</td>
                <td className="border px-2 py-1">
                  {list.length ? list.join(', ') : '—'}
                </td>
                <td className="border px-2 py-1 text-center">
                  <input
                    type="checkbox"
                    {...register(`alreadyIntegrated.${code}` as const)}
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    placeholder="e.g., with HubSpot"
                    className="w-full border rounded px-1"
                    {...register(`integrationNotes.${code}` as const)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        type="submit"
        className="rounded bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700"
      >
        Next
      </button>
    </form>
  );
}
