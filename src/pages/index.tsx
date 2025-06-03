// File: src/pages/index.tsx
'use client';

import { useAuditState }          from '@/context/AuditContext';
import Step1UserInfo              from '@/components/Step1UserInfo';
import Step2Selectors             from '@/components/Step2Selectors';
import Step3Integrations          from '@/components/Step3Integrations';
import Step4AutomationIdea        from '@/components/Step4AutomationIdea';
import Report                     from '@/components/Report';

export default function WizardPage() {
  const state = useAuditState();   // { step, loading, error, report, … }

  /* ------------ global status screens ------------ */
  if (state.loading)
    return (
      <p className="text-center mt-24 text-lg text-gray-500">
        Generating report…
      </p>
    );

  if (state.error)
    return (
      <p className="text-center mt-24 text-lg text-red-600">
        {state.error}
      </p>
    );

  if (state.step === 'REPORT' && state.report)
    return (
      <main className="mx-auto max-w-5xl p-4">
        <Report data={state.report} />
      </main>
    );

  /* ---------------- wizard steps ----------------- */
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {state.step === 1 && <Step1UserInfo />}
      {state.step === 2 && <Step2Selectors />}
      {state.step === 3 && <Step3Integrations />}
      {state.step === 4 && <Step4AutomationIdea />}
    </div>
  );
}
