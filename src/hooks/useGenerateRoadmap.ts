/* ------------------------------------------------------------------
   Hook:  useGenerateRoadmap()
   ------------------------------------------------------------------
   • Calls /api/generatePlan       (POST JSON → JSON)
   • While waiting → sets loading  = true
   • On success  → dispatches  SET_REPORT   with the JSON
   • On failure  → dispatches  SET_REPORT   with { error: … }
   • ALWAYS logs what came back so we can diagnose shape issues
------------------------------------------------------------------- */
'use client';

import { useState, useCallback } from 'react';
import { useAuditDispatch, useAuditState } from '@/context/AuditContext';

interface ApiBody {
  selectors: {
    industry   : string;
    software   : string[];
    painPoints : string[];
  };
  userInfo: {
    name   : string;
    email  : string;
    company: string;
  };
}

export default function useGenerateRoadmap() {
  const [loading, setLoading] = useState(false);
  const dispatch              = useAuditDispatch();
  const {
    industry,
    software,
    painPoints,
    name,
    email,
    company,
  } = useAuditState();

  const generate = useCallback(async () => {
    setLoading(true);

    const body: ApiBody = {
      selectors: { industry, software, painPoints },
      userInfo : { name, email, company },
    };

    try {
      /* ---- call the API ---------------------------------------- */
      const res = await fetch('/api/generatePlan', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      /* ---- parse & sanity-check ------------------------------- */
      const json = await res.json();
      console.log('✅ generatePlan JSON →', json);          /** <--  keep this */

      /* if execSummary is missing we still dispatch so the UI can
         show a friendly “could not generate” message instead of
         blowing up with an undefined read                               */
      dispatch({ type: 'SET_REPORT', payload: json });

    } catch (err: any) {
      console.error('❌ generatePlan error', err);
      dispatch({ type: 'SET_REPORT', payload: { error: String(err) } });
    } finally {
      setLoading(false);
    }
  }, [industry, software, painPoints, name, email, company, dispatch]);

  return { generate, loading };
}
