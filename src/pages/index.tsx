// src/pages/index.tsx
import Head from 'next/head';
import { AuditProvider, useAuditState } from '@/context/AuditContext';

import Step1UserInfo       from '@/components/Step1UserInfo';
import Step2Selectors      from '@/components/Step2Selectors';
import Step3Integrations   from '@/components/Step3Integrations';
import Step4AutomationIdea from '@/components/Step4AutomationIdea';
import Report              from '@/components/Report';

function WizardSteps() {
  const { step, report } = useAuditState();

  if (step === 1) return <Step1UserInfo />;
  if (step === 2) return <Step2Selectors />;
  if (step === 3) return <Step3Integrations />;
  if (step === 4) return <Step4AutomationIdea />;

  /* step 5 → finished */
  return <Report data={report} />;
}

export default function WizardPage() {
  return (
    <AuditProvider>
      <Head><title>Integration Radar Wizard</title></Head>
      <main className="p-4 max-w-5xl mx-auto">
        <WizardSteps />
      </main>
    </AuditProvider>
  );
}
