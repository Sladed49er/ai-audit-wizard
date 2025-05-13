/**
 * React hook – calls /api/generatePlan and returns
 * { plan, loading }
 */
import { useState } from 'react';

export type PlanArgs = { idea: string };

export default function useGeneratePlan() {
  const [loading, setLoading] = useState(false);

  const plan = async ({ idea }: PlanArgs): Promise<string> => {
    setLoading(true);
    try {
      const resp = await fetch('/api/generatePlan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });

      if (!resp.ok) {
        throw new Error(await resp.text());
      }

      const data = (await resp.json()) as { roadmap: string };
      return data.roadmap;
    } finally {
      setLoading(false);
    }
  };

  return { plan, loading };
}
