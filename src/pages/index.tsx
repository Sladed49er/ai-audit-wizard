// -------------------------------------------------------------
// Wizard shell + step router
// -------------------------------------------------------------
'use client';

import { useAuditState }     from '@/context/AuditContext';

/* ── step components ──────────────────────────────────────── */
import Step1UserInfo         from '@/components/Step1UserInfo';
import Step2Selectors        from '@/components/Step2Selectors';
import Step3Integrations     from '@/components/Step3Integrations';
import Step4AutomationIdea   from '@/components/Step4AutomationIdea';

/* ── final report ─────────────────────────────────────────── */
import Report                from '@/components/Report';

/* ── tiny loader ──────────────────────────────────────────── */
import Spinner               from '@/components/ui/Spinner';

export default function WizardRouter() {
  const state = useAuditState();

  /* --------------- normal wizard flow --------------------- */
  if (state.step === 1)  return <Step1UserInfo />;
  if (state.step === 2)  return <Step2Selectors />;
  if (state.step === 3)  return <Step3Integrations />;
  if (state.step === 4)  return <Step4AutomationIdea />;

  /* --------------- waiting for OpenAI --------------------- */
  if (!state.report) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <Spinner />
        <p className="mt-4 text-gray-600">Generating report&hellip;</p>
      </div>
    );
  }

  /* --------------- final screen --------------------------- */
  return (
    <section className="mx-auto max-w-5xl space-y-12 p-4">
      <Report data={state.report} />
    </section>
  );
}
