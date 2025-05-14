// @ts-nocheck
'use client';

import { useRef } from 'react';
import { useAuditState } from '@/context/AuditContext';

/* ----- report sections (already in src/components/Report/) ----- */
import ExecSummary      from '@/components/Report/ExecSummary';
import ImpactMatrix     from '@/components/Report/ImpactMatrix';
import QuickWins        from '@/components/Report/QuickWins';
import RoiEstimate      from '@/components/Report/RoiEstimate';
import RolloutTimeline  from '@/components/Report/RolloutTimeline';
import Appendix         from '@/components/Report/Appendix';

/* ----- new action bar (in src/components/ui/) ------------------ */
import ActionBar        from '@/components/ui/ActionBar';

export default function Report() {
  const { report, software, painPoints } = useAuditState();
  const pdfRef = useRef<HTMLDivElement>(null);

  /* still waiting for /api/generatePlan */
  if (!report) {
    return (
      <p className="mt-24 text-center text-lg text-gray-500">
        Generating report&hellip;
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-5xl space-y-12 p-4">
      {/* ------------- printable content -------------------- */}
      <div ref={pdfRef} className="space-y-12">
        <ExecSummary      data={report.execSummary} />
        <ImpactMatrix     data={report.impactMatrix} />
        <QuickWins        data={report.quickWins} />
        <RoiEstimate      data={report.roi} />
        <RolloutTimeline  data={report.rolloutTimeline} />
        <Appendix         data={report.appendix} />
      </div>

      {/* ------------- actions ------------------------------ */}
      <ActionBar pdfTargetRef={pdfRef} />
    </section>
  );
}
