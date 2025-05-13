/* ------------------------------------------------------------------
   Step 3 – capture any in-place or desired integrations
   ------------------------------------------------------------------ */
'use client';

import { useAuditState, useAuditDispatch } from '@/context/AuditContext';

export default function Step3Integrations() {
  const state    = useAuditState();
  const dispatch = useAuditDispatch();

  const onChange = (tool: string, value: string) => {
    dispatch({ type:'SET_INTEGRATION', payload:{ tool, value } });
  };

  const onNext = () => dispatch({ type:'NEXT' });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Step 3 — Current / desired integrations</h1>

      {state.selectors?.software?.map(tool => (
        <div key={tool}>
          <label className="block font-medium">{tool}</label>
          <input
            value={state.selectors.integrations?.[tool] ?? ''}
            onChange={e => onChange(tool, e.target.value)}
            placeholder="e.g. integrates with RingCentral"
            className="input"
          />
        </div>
      ))}

      <button onClick={onNext} className="btn">Next</button>
    </div>
  );
}
