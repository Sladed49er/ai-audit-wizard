// @ts-nocheck
/* -----------------------------------------------------------------
   src/components/Report/index.tsx
   Pulls the GPT-4o JSON via /api/generateReport and renders the
   full consultant-grade report.
   ----------------------------------------------------------------- */

'use client';

import { useEffect, useState } from 'react';
import { useAuditState }       from '@/context/AuditContext';
import {
  fetchLLMReport,
  type LlmReport,
} from '@/lib/reportLLM';

import { enrichStack, mapPainPoints } from '@/lib/reportHelpers';

/* — existing cards — */
import SummaryCard      from './SummaryCard';
import IndustryInsights from './IndustryInsights';
import StackTable       from './StackTable';
import PainPointGrid    from './PainPointGrid';
import QuickWins        from './QuickWins';
import RoiEstimate      from './RoiEstimate';
import Appendix         from './Appendix';

/* — new rich-report cards — */
import ExecSummary        from './ExecSummary';
import UnusedIntegrations from './UnusedIntegrations';
import ImpactMatrix       from './ImpactMatrix';
import Playbooks          from './Playbooks';
import RolloutTimeline    from './RolloutTimeline';
import RiskTable          from './RiskTable';

export default function Report() {
  /* wizard selections */
  const [state] = useAuditState();

  /* LLM JSON holder */
  const [llm, setLlm] = useState<LlmReport | null>(null);
  const [err, setErr] = useState<string | null>(null);

  /* call /api/generateReport once per wizard state */
  useEffect(() => {
    fetchLLMReport(state)
      .then(data => {
        console.log('✅ LLM JSON', data);
        setLlm(data);
      })
      .catch(e => {
        console.error('❌ LLM fetch failed', e);
        setErr(e.message || 'Unknown error');
      });
  }, [state]);

  /* graceful waiting / error UI */
  if (err)   return <p className="p-10 text-red-600">Error: {err}</p>;
  if (!llm)  return <p className="p-10">Generating report… please wait ⏳</p>;

  /*———————— derived data for legacy cards ————————*/
  const { name = '', business = '' }                = state.userInfo   ?? {};
  const { industry = '', software = [], painPoints = [] } =
        state.selectors ?? {};

  const stack      = enrichStack(software);
  const painMatrix = mapPainPoints(painPoints);

  /*———————— render ————————————————————————————————*/
  return (
    <section className="space-y-10 pb-24">

      {/* GPT-4o rich sections */}
      <ExecSummary        data={llm.execSummary} />
      <UnusedIntegrations data={llm.unusedIntegrations} />
      <ImpactMatrix       data={llm.impactMatrix} />
      <Playbooks          data={llm.playbooks} />
      <RolloutTimeline    data={llm.rollout} />
      <RiskTable          data={llm.risks} />

      {/* original wizard cards */}
      <SummaryCard      name={name}    business={business} />
      <IndustryInsights industry={industry} />
      <StackTable       stack={stack} />
      <PainPointGrid    analysis={painMatrix} />
      <QuickWins        stack={stack} pain={painMatrix} />
      <RoiEstimate      pain={painMatrix} />
      <Appendix         stack={stack} />
    </section>
  );
}
