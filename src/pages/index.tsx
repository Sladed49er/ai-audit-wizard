/*  src/pages/index.tsx
    ──────────────────────────────────────────────────────────────
    Master page for the Integration-Radar wizard.
    • steps 1-4  = form flow
    • step 5     = waiting for OpenAI → spinner
    • report set = printable report
*/
'use client';

import { useAuditState }       from '@/context/AuditContext';

/* step components */
import Step1UserInfo           from '@/components/Step1UserInfo';
import Step2Selectors          from '@/components/Step2Selectors';
import Step3Integrations       from '@/components/Step3Integrations';
import Step4AutomationIdea     from '@/components/Step4AutomationIdea';

/* ui helpers */
import Spinner                 from '@/components/ui/Spinner';
import Report                  from '@/components/Report/Report';

export default function WizardPage() {
  const { step, report } = useAuditState();

  /* ───────────── 1-4: user fills in details ───────────── */
  if (step === 1) return <Step1UserInfo      />;
  if (step === 2) return <Step2Selectors     />;
  if (step === 3) return <Step3Integrations  />;
  if (step === 4) return <Step4AutomationIdea/>;

  /* ───────────── 5: waiting for OpenAI ──────────────── */
  if (!report) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
        <Spinner className="size-6 text-sky-600" />
        <p className="text-gray-600">Generating report…</p>
      </div>
    );
  }

  /* ───────────── 6: finished – show report ───────────── */
  return (
    <main className="mx-auto max-w-4xl p-6">
      <Report data={report} />
    </main>
  );
}
