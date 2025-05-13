// @ts-nocheck                        // skip TS while we iterate
'use client';

import { useAuditState } from '@/context/AuditContext';

import ExecSummary      from '@/components/Report/ExecSummary';
import ImpactMatrix     from '@/components/Report/ImpactMatrix';
import QuickWins        from '@/components/Report/QuickWins';
import RoiEstimate      from '@/components/Report/RoiEstimate';
import RolloutTimeline  from '@/components/Report/RolloutTimeline';
import Appendix         from '@/components/Report/Appendix';

export default function Report() {
  const { report, software, painPoints } = useAuditState();

  /* while /api/generatePlan is still running */
  if (!report) {
    return (
      <p className="mt-24 text-center text-lg text-gray-500">
        Generating report&hellip;
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-5xl space-y-12 p-4">
      <ExecSummary      data={report.execSummary} />
      <ImpactMatrix     data={report.impactMatrix} />
      <QuickWins        data={report.quickWins} />
      {/* keep your old tables if you like */}
      {/* <StackTable   data={software} /> */}
      {/* <PainPointGrid data={painPoints} /> */}
      <RoiEstimate      data={report.roi} />
      <RolloutTimeline  data={report.rolloutTimeline} />
      <Appendix         data={report.appendix} />
    </section>
  );
}
