/* -----------------------------------------------------------------
   src/components/Report/index.tsx
   Fetches the rich GPT-4o report + renders every section
   ----------------------------------------------------------------- */

// @ts-nocheck
   'use client';

import { useEffect, useState } from 'react';
import { useAuditState }       from '@/context/AuditContext';
import { fetchLLMReport, type LlmReport } from '@/lib/reportLLM';
import { enrichStack, mapPainPoints }     from '@/lib/reportHelpers';

/* existing cards — keep them */
import SummaryCard      from './SummaryCard';
import IndustryInsights from './IndustryInsights';
import StackTable       from './StackTable';
import PainPointGrid    from './PainPointGrid';
import QuickWins        from './QuickWins';
import RoiEstimate      from './RoiEstimate';
import Appendix         from './Appendix';

/* NEW rich-report cards */
import ExecSummary        from './ExecSummary';
import UnusedIntegrations from './UnusedIntegrations';
import ImpactMatrix       from './ImpactMatrix';
import Playbooks          from './Playbooks';
import RolloutTimeline    from './RolloutTimeline';
import RiskTable          from './RiskTable';

export default function Report() {
  /* wizard context */
  const [state] = useAuditState();

  /* hold LLM JSON */
  const [llm, setLlm] = useState<LlmReport | null>(null);

  /* call the /api/generateReport route once */
  useEffect(() => {
    fetchLLMReport(state).then(setLlm).catch(console.error);
  }, []);

  /* quick skeleton while waiting */
  if (!llm) {
    return (
      <div className="py-20 text-center text-gray-600">
        Generating detailed report… please wait&nbsp;⏳
      </div>
    );
  }

  /*———— existing derived data ————*/
  const { name = '', business = '' }             = state.userInfo   ?? {};
  const { industry = '', software = [], painPoints = [] } =
        state.selectors ?? {};

  const stack      = enrichStack(software);
  const painMatrix = mapPainPoints(painPoints);

  /*———————————————— render —————————————*/
  return (
    <section className="space-y-10 pb-24">
      {/* rich LLM sections */}
      <ExecSummary        data={llm.execSummary} />
      <UnusedIntegrations data={llm.unusedIntegrations} />
      <ImpactMatrix       data={llm.impactMatrix} />
      <Playbooks          data={llm.playbooks} />
      <RolloutTimeline    data={llm.rollout} />
      <RiskTable          data={llm.risks} />

      {/* your original cards */}
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
