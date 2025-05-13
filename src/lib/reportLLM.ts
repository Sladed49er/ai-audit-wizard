/* -------------------------------------------------------------------
   src/lib/reportLLM.ts
   Sends wizard state to /api/generateReport, logs and displays
   the raw response, then returns parsed JSON (or throws).
   ------------------------------------------------------------------- */

export interface LlmReport {
  execSummary: string;
  unusedIntegrations: Array<{ app: string; suggestion: string }>;
  impactMatrix: Array<{ item: string; impact: number; effort: number }>;
  playbooks: any[];
  rollout:   any[];
  risks:     Array<{ risk: string; mitigation: string }>;
}

/** POST state → receive parsed JSON from the API */
export async function fetchLLMReport(state: unknown): Promise<LlmReport> {
  /* --- POST to our Next.js API route ---------------------------- */
  const res = await fetch('/api/generateReport', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      selectors: (state as any).selectors,
      userInfo:  (state as any).userInfo,
    }),
  });

  /* --- read raw body as text ----------------------------------- */
  const text = await res.text();
  console.log('RAW /api/generateReport →', text);

  /* --- TEMP helper: dump first 800 chars in a fixed <pre> —— */
  if (typeof document !== 'undefined') {
    let box = document.getElementById('raw-dump') as HTMLPreElement | null;
    if (!box) {
      box = document.createElement('pre');
      box.id = 'raw-dump';
      box.style.cssText =
        'position:fixed;bottom:0;left:0;max-height:40%;width:60%;' +
        'overflow:auto;background:#111;color:#0f0;padding:8px;' +
        'z-index:99999;font-size:11px;line-height:1.35';
      document.body.appendChild(box);
    }
    box.textContent = text.slice(0, 800); // show first 800 chars
  }

  /* --- handle non-200 status ----------------------------------- */
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);

  /* --- parse JSON (let caller catch) --------------------------- */
  return JSON.parse(text);
}
