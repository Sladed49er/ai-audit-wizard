/* -----------------------------------------------------------------
   src/components/Report/index.tsx
   Assembles the full report view – with TS-safe defaults
   ----------------------------------------------------------------- */

'use client';

import { useAuditState } from '@/context/AuditContext';
import { enrichStack, mapPainPoints } from '@/lib/reportHelpers';

import Roadmap          from './Roadmap';
import SummaryCard      from './SummaryCard';
import IndustryInsights from './IndustryInsights';
import StackTable       from './StackTable';
import PainPointGrid    from './PainPointGrid';
import QuickWins        from './QuickWins';
import RoiEstimate      from './RoiEstimate';
import Appendix         from './Appendix';

/* temporary road-map generator (replace later) */
function buildRoadmapHtml(industry: string) {
  return `
    <h3>Roadmap Timeline – ${industry}</h3>
    <table>
      <tr><th>Quarter</th><th>Goal</th><th>Actions</th></tr>
      <tr><td>Q1</td><td>Kick-off integrations</td><td>Map data flows.</td></tr>
      <tr><td>Q2</td><td>Automate follow-ups</td><td>Zapier workflows.</td></tr>
      <tr><td>Q3</td><td>BI dashboards</td><td>Power BI roll-out.</td></tr>
      <tr><td>Q4</td><td>AI optimisation</td><td>Predictive modelling.</td></tr>
    </table>
  `;
}

export default function Report() {
  /* pull state from context, but cast to any to hush TS */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state] = useAuditState() as unknown as any;

  const { name = '', business = '' } = state.userInfo ?? {};
  const {
    industry   = '',
    software   = [] as string[],
    painPoints = [] as string[],
  } = state.selectors ?? {};

  /* ─────────────────────────────────────────── */

  /* derive data for sub-components */
  const stack      = enrichStack(software);
  const painMatrix = mapPainPoints(painPoints);
  const roadmapHtmlString = buildRoadmapHtml(industry);

  return (
    <section className="space-y-10 pb-20">
      <SummaryCard      name={name}    business={business} />
      <IndustryInsights industry={industry} />
      <StackTable       stack={stack} />
      <PainPointGrid    analysis={painMatrix} />
      <QuickWins        stack={stack} pain={painMatrix} />
      <Roadmap          html={roadmapHtmlString} />
      <RoiEstimate      pain={painMatrix} />
      <Appendix         stack={stack} />
    </section>
  );
}
