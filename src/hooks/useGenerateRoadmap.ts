import { useState } from 'react';
import { useAuditState, useAuditDispatch } from '@/context/AuditContext';

export default function useGenerateRoadmap() {
  const [loading, setLoading] = useState(false);
  const state                 = useAuditState();
  const dispatch              = useAuditDispatch();

  const generate = async (): Promise<void> => {
    setLoading(true);
    try {
      const resp = await fetch('/api/generatePlan', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          idea    : state.idea,
          software: state.software,
          pains   : state.painPoints,
          industry: state.industry,
        }),
      });

      if (!resp.ok) throw new Error(await resp.text());
      const { report } = (await resp.json()) as { report: any };

      dispatch({ type: 'SET_REPORT', payload: report });
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading };
}
