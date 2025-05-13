/**
 * fetchLLMReport() – wraps the /api endpoint and returns typed JSON
 */
import { AuditState } from '@/context/AuditContext';

export interface LlmReport {
  execSummary:        string;
  unusedIntegrations: string;
  impactMatrix:       string;
  playbooks:          string;
  rollout:            string;
  risks:              string;
}

export async function fetchLLMReport(
  state: AuditState
): Promise<LlmReport> {
  const res = await fetch('/api/generateReport', {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({ state }),
  });

  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as LlmReport;
}
