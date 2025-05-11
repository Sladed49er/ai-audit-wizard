// src/pages/index.tsx
'use client';
import Head from 'next/head';
import { AuditProvider, useAuditState } from '@/context/AuditContext';

/* step components */
import Step1UserInfo      from '@/components/Step1UserInfo';
import Step2Selectors     from '@/components/Step2Selectors';
import Step3Integrations  from '@/components/Step3Integrations';
import Step4AutomationIdea from '@/components/Step4AutomationIdea';
import Report             from '@/components/Report';

function WizardRouter() {
  const { state } = useAuditState();

  switch (state.step) {
    case 1:  return <Step1UserInfo />;
    case 2:  return <Step2Selectors />;
    case 3:  return <Step3Integrations />;
    case 4:  return <Step4AutomationIdea />;
    case 5:  return <Report />;
    default: return <p>Unknown step</p>;
  }
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>AI Audit Wizard</title>
      </Head>

      <main className="mx-auto max-w-3xl p-6">
        <AuditProvider>
          <WizardRouter />
        </AuditProvider>
      </main>
    </>
  );
}
