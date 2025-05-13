/* -----------------------------------------------------------------
   src/components/Report/index.tsx
   Assembles the full report view.  Shows a spinner while waiting,
   surfaces any backend error, and isolates card crashes with
   <ErrorBoundary> so one bad card never blanks the page.
   ---------------------------------------------------------------- */

'use client';

import { useEffect, useState }      from 'react';
import { ErrorBoundary }            from 'react-error-boundary';

import { useAuditState }            from '@/context/AuditContext';
import { fetchLLMReport, LlmReport } from '@/lib/reportLLM';

/* ------------------ small card shells --------------------------- */
import ExecSummary        from './ExecSummary';
import UnusedIntegrations from './UnusedIntegrations';
import ImpactMatrix       from './ImpactMatrix';
import Playbooks          from './Playbooks';
import RolloutTimeline    from './RolloutTimeline';
import RiskTable          from './RiskTable';

/* -----------------------------------------------------------------
   Report root
   ---------------------------------------------------------------- */
export default function Report() {
  /* wizard context ------------------------------------------------ */
  const [state]       = useAuditState();

  /* LLM JSON + error state --------------------------------------- */
  const [llm,  setLlm] = useState<LlmReport | null>(null);
  const [err,  setErr] = useState<string   | null>(null);

  /* fire once on mount ------------------------------------------- */
  useEffect(() => {
    console.log('🟡  fetchLLMReport() …');

    fetchLLMReport(state)
      .then(json => {
        console.log('🟢  setLlm() ←', json);
        setLlm(json);
      })
      .catch(e => {
        console.error('🔴  fetchLLMReport error →', e);
        setErr(e.message || String(e));
      });
  }, [state]);

  /* ----------------- UI states ---------------------------------- */
  if (err)
    return (
      <p className="p-10 text-red-600">
        Error generating report:&nbsp;{err}
      </p>
    );

  if (!llm)
    return (
      <p className="p-10">
        Generating report… please wait&nbsp;⏳
      </p>
    );

  /* ----------------- happy path --------------------------------- */
  return (
    <section className="space-y-10 pb-24">
      <ErrorBoundary
        fallback={<p className="text-red-600">Card crashed.</p>}
      >
        <ExecSummary        data={llm.execSummary}        />
        <UnusedIntegrations data={llm.unusedIntegrations} />
        <ImpactMatrix       data={llm.impactMatrix}       />
        <Playbooks          data={llm.playbooks}          />
        <RolloutTimeline    data={llm.rollout}            />
        <RiskTable          data={llm.risks}              />
      </ErrorBoundary>
    </section>
  );
}
