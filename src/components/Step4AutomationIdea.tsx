/* ------------------------------------------------------------------
   Step 4 – free-text “dream automation / AI idea”
   ------------------------------------------------------------------ */
'use client';

import { useAuditState, useAuditDispatch } from '@/context/AuditContext';
import { useState } from 'react';

export default function Step4AutomationIdea() {
  const state    = useAuditState();
  const dispatch = useAuditDispatch();
  const [idea, setIdea] = useState(state.idea ?? '');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type:'SET_IDEA', payload: idea });
    dispatch({ type:'NEXT'  });            // Step 5 → Report
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h1 className="text-xl font-semibold">Step 4 — Your dream AI / automation</h1>

      <textarea
        value={idea}
        onChange={e => setIdea(e.target.value)}
        rows={6}
        className="input"
        placeholder="Describe the automation or AI capability you’d love to have…"
      />

      <button type="submit" className="btn">Generate Report</button>
    </form>
  );
}
