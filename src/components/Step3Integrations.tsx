/* ------------------------------------------------------------------
   Step 3 – capture desired integrations
   ------------------------------------------------------------------ */
'use client';

import { useAuditState, useAuditDispatch } from '@/context/AuditContext';

export default function Step3Integrations() {
  const { software, integrations } = useAuditState();
  const   dispatch                 = useAuditDispatch();

  const onChange = (tool: string, value: string) =>
    dispatch({ type:'SET_INTEGRATION', payload:{ tool, value } });

  const next  = () => dispatch({ type:'NEXT' });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Step 3 — Integration wishes</h1>

      {software.map(tool => (
        <div key={tool} className="space-y-1">
          <label className="block font-medium">{tool}</label>
          <input
            value={integrations[tool] ?? ''}
            onChange={e => onChange(tool, e.target.value)}
            placeholder="e.g. integrate with RingCentral"
            className="w-full border rounded p-2"
          />
        </div>
      ))}

      <button onClick={next} className="btn-primary">Next</button>
    </div>
  );
}
