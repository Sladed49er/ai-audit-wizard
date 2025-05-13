/* -----------------------------------------------------------------
   src/lib/reportLLM.ts
   Sends selectors + userInfo to /api/generateReport and returns the
   parsed JSON.  Any backend error is surfaced to the caller.
   ---------------------------------------------------------------- */
export interface LlmReport {
  execSummary:        string;
  unusedIntegrations: unknown;
  impactMatrix:       unknown;
  playbooks:          unknown;
  rollout:            unknown;
  risks:              unknown;
}

export async function fetchLLMReport(state: unknown): Promise<LlmReport> {
  const res  = await fetch('/api/generateReport', {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({
      selectors: (state as any).selectors,
      userInfo : (state as any).userInfo,
    }),
  });

  const text = await res.text();                         // <- ALWAYS read
  console.log('📡 /api/generateReport raw →', text);     //    what came back

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);

  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(`LLM returned non-JSON:\n${text}`);
  }
}
