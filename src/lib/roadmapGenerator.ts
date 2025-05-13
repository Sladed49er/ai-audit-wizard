/* -------------------------------------------------------------
   Generates a 30 / 60 / 120 / 365-day roadmap from wizard data
   ------------------------------------------------------------- */
import type { EnrichedStackRow } from './reportHelpers';

export interface RoadmapItem {
  day: 30 | 60 | 120 | 365;
  title: string;
  detail: string;
  owner: string;
}

export function buildRoadmap(
  industry: string,
  painPoints: string[],
  stack: EnrichedStackRow[]
): RoadmapItem[] {
  const items: RoadmapItem[] = [];

  /* ---------- 30-day quick wins ---------- */
  items.push({
    day: 30,
    title: 'Automate top pain point',
    detail: `Implement a no-code integration (Zapier/Make) to reduce “${painPoints[0] ?? 'manual workload'}”.`,
    owner: 'Ops Lead',
  });

  /* ---------- 60-day ---------- */
  const lowIntegration = stack.find(s => s.integrationCount === 0);
  if (lowIntegration) {
    items.push({
      day: 60,
      title: `Integrate ${lowIntegration.name}`,
      detail: `Connect ${lowIntegration.name} with CRM & support tools to eliminate re-keying.`,
      owner: 'IT / RevOps',
    });
  }

  /* ---------- 120-day ---------- */
  items.push({
    day: 120,
    title: 'Roll out BI dashboard',
    detail: `Combine ${stack.slice(0, 2).map(s => s.name).join(' & ')} data in a single Looker/PowerBI view for exec reporting.`,
    owner: 'Data Team',
  });

  /* ---------- 365-day vision ---------- */
  items.push({
    day: 365,
    title: 'AI-driven optimisation programme',
    detail: `Use domain-specific LLMs to predict churn and suggest cross-sell in ${industry}.`,
    owner: 'Chief AI Officer',
  });

  return items;
}
