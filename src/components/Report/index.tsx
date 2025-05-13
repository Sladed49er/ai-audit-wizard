// @ts-nocheck
'use client';

import { useAuditState } from '@/context/AuditContext';

import ExecSummary      from './ExecSummary';
import ImpactMatrix     from './ImpactMatrix';
import QuickWins        from './QuickWins';
import RoiEstimate      from './RoiEstimate';
import RolloutTimeline  from './RolloutTimeline';
import StackTable       from './StackTable';
import PainPointGrid    from './PainPointGrid';
import Appendix         from './Appendix';

export default function Report() {
  const { report, software, painPoints } = useAuditState();

  if (!report) {
    return (
      <p className="text-center mt-20 text-lg text-gray-500">
        Generating report&hellip;
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-5xl space-y-12 p-4">
      <ExecSummary      data={report.execSummary} />
      <ImpactMatrix     data={report.impactMatrix} />
      <QuickWins        data={report.quickWins} />
      <StackTable       data={software} />
      <PainPointGrid    data={painPoints} />
      <RoiEstimate      data={report.roi} />
      <RolloutTimeline  data={report.rolloutTimeline} />
      <Appendix         data={report.appendix} />
    </section>
  );
}
