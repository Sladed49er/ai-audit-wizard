// src/pages/index.tsx
/* -------------------------------------------------------------
   Wizard wrapper – shows Step 1‒4  or the generated report
-------------------------------------------------------------- */
import Head from 'next/head';
import { useAuditState } from '@/context/AuditContext';

import Step1UserInfo         from '@/components/Step1UserInfo';
import Step2Selectors        from '@/components/Step2Selectors';
import Step3Integrations     from '@/components/Step3Integrations';
import Step4AutomationIdea   from '@/components/Step4AutomationIdea';

import Report                from '@/components/Report';

export default function WizardPage() {
  const { step, report } = useAuditState();

  return (
    <>
      <Head>
        <title>Integration Radar Wizard</title>
      </Head>

      {/* ---- Steps 1 - 4 ----------------------------------- */}
      {step === 1 && <Step1UserInfo />}
      {step === 2 && <Step2Selectors />}
      {step === 3 && <Step3Integrations />}
      {step === 4 && <Step4AutomationIdea />}

      {/* ---- Final report (step > 4) ----------------------- */}
      {step > 4 && report && (
        <main className="mx-auto max-w-5xl p-6">
          <Report data={report} />
        </main>
      )}
    </>
  );
}
