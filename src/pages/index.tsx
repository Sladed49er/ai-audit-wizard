import { AuditProvider, useAuditState } from '@/context/AuditContext';
import Step1UserInfo      from '@/components/Step1UserInfo';
import Step2Selectors     from '@/components/Step2Selectors';
import Step3Integrations  from '@/components/Step3Integrations';
import Step4AutomationIdea from '@/components/Step4AutomationIdea';
import Report             from '@/components/Report';

export default function Home() {
  return (
    <AuditProvider>
      <WizardShell />
    </AuditProvider>
  );
}

function WizardShell() {
  const [state] = useAuditState();

  return (
    <main className="mx-auto max-w-3xl p-4 prose">
      {state.step === 1 && <Step1UserInfo />}
      {state.step === 2 && <Step2Selectors />}
      {state.step === 3 && <Step3Integrations />}
      {state.step === 4 && <Step4AutomationIdea />}
      {state.step === 5 && <Report />}
    </main>
  );
}
