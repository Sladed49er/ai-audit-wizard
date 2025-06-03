// File: src/pages/index.tsx
'use client';

import { AuditProvider, useAuditState } from '@/context/AuditContext';

import Step1UserInfo        from '@/components/Step1UserInfo';
import Step2Selectors       from '@/components/Step2Selectors';
import Step3Integrations    from '@/components/Step3Integrations';
import Step4AutomationIdea  from '@/components/Step4AutomationIdea';
import Report               from '@/components/Report';

function WizardBody() {
  const { step, report } = useAuditState();

  if (report) {
    /* ----- finished: show printable report -------------------- */
    return (
      <section className="mx-auto max-w-5xl p-6">
        <Report data={report} />
      </section>
    );
  }

  /* ----- still collecting answers ----------------------------- */
  switch (step) {
    case 1:  return <Step1UserInfo />;
    case 2:  return <Step2Selectors />;
    case 3:  return <Step3Integrations />;
    case 4:  return <Step4AutomationIdea />;
    default: return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex items-center gap-2 text-sky-600">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
            <circle
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4" fill="none"
              strokeLinecap="round"
              strokeDasharray="60 24"
            />
          </svg>
          <span>Generating report…</span>
        </div>
      </div>
    );
  }
}

export default function Page() {
  return (
    <AuditProvider>
      <WizardBody />
    </AuditProvider>
  );
}
