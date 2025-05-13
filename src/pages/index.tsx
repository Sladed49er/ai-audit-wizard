// src/pages/index.tsx
import { useRouter } from 'next/router';
import { AuditProvider, useAuditState } from '@/context/AuditContext';

import Step1UserInfo       from '@/components/Step1UserInfo';
import Step2Selectors      from '@/components/Step2Selectors';
import Step3Integrations   from '@/components/Step3Integrations';
import Step4AutomationIdea from '@/components/Step4AutomationIdea';
import Report              from '@/components/Report';

export default function Home() {
  const { query } = useRouter();
  const embed = query.embed === '1' || query.embed === 'true';

  return (
    <AuditProvider>
      <WizardShell embed={embed} />
    </AuditProvider>
  );
}

function WizardShell({ embed }: { embed: boolean }) {
  /* ← FIX HERE (no array-destructuring) */
  const state = useAuditState();

  const wrapper = embed ? 'p-4' : 'mx-auto max-w-3xl p-4';

  return (
    <main className={wrapper}>
      {state.step === 1 && <Step1UserInfo />}
      {state.step === 2 && <Step2Selectors />}
      {state.step === 3 && <Step3Integrations />}
      {state.step === 4 && <Step4AutomationIdea />}
      {state.step === 5 && <Report />}
    </main>
  );
}
