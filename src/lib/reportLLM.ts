/* -----------------------------------------------------------------
   src/lib/reportLLM.ts
   Calls the /api/generateReport route and returns typed JSON
   ----------------------------------------------------------------- */

export interface LlmReport {
  execSummary:          string;
  unusedIntegrations:   { app: string; suggestion: string }[];
  impactMatrix:         { item: string; effort: number; impact: number }[];
  playbooks:            {
    title: string;
    trigger: string;
    flow: string;
    owner: string;
    kpi: string;
    sample: string;
  }[];
  rollout:              { day: number; task: string; owner: string }[];
  risks:                { risk: string; mitigation: string }[];
}

export async function fetchLLMReport(state: any): Promise<LlmReport> {
  const res = await fetch('/api/generateReport', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      selectors: state.selectors,
      userInfo:  state.userInfo,
    }),
  });

  if (!res.ok) {
    throw new Error(`LLM route returned ${res.status}`);
  }
  return res.json() as Promise<LlmReport>;
}
