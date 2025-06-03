'use client';

import { useEffect } from 'react';
import Step1UserInfo          from '@/components/Step1UserInfo';
import Step2Selectors         from '@/components/Step2Selectors';
import Step3Integrations      from '@/components/Step3Integrations';
import Step4AutomationIdea    from '@/components/Step4AutomationIdea';
import Report                 from '@/components/Report';
import { useAuditState,
         useAuditDispatch }   from '@/context/AuditContext';

/* ----------------------------------------------------------- */
/*  Wizard page driven entirely by AuditContext                */
/*  reducer must support: NEXT, BACK, SET_REPORT, SET_ERROR    */
/* ----------------------------------------------------------- */
export default function WizardPage() {
  const state    = useAuditState();
  const dispatch = useAuditDispatch();

  /* ------------------- helpers ----------------------------- */
  const next = () => dispatch({ type: 'NEXT' });
  const back = () => dispatch({ type: 'BACK' });

  /* ------------------- final submit ------------------------ */
  async function submitRoadmap() {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const res   = await fetch('/api/generateReports', {
        method: 'POST',
        body  : JSON.stringify({
          selectors: {
            industry   : state.industry,
            software   : state.software,
            painPoints : state.painPoints,
          },
          userInfo: { business: state.company },
        }),
      });

      const raw   = await res.json();
      const json  = JSON.parse(raw);          // API returns a stringified JSON
      dispatch({ type: 'SET_REPORT', payload: json });
      dispatch({ type: 'SET_STEP',   payload: 'REPORT' });

    } catch (err) {
      console.error(err);
      dispatch({ type: 'SET_ERROR', payload: 'Report generation failed.' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  /* ------------------- render by step ---------------------- */
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

  /* wizard steps */
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {state.step === 1 && (
        <Step1UserInfo
          data={state}
          setData={(d) => dispatch({ type: 'SET_USER', payload: d })}
          onNext={next}
        />
      )}

      {state.step === 2 && (
        <Step2Selectors
          data={state}
          setData={(d) => dispatch({ type: 'SET_SELECTORS', payload: d })}
          onNext={next}
          onBack={back}
        />
      )}

      {state.step === 3 && (
        <Step3Integrations
          data={state}
          setData={(d) => dispatch({ type: 'SET_INTEGRATIONS', payload: d })}
          onNext={next}
          onBack={back}
        />
      )}

      {state.step === 4 && (
        <Step4AutomationIdea
          onBack={back}
          onSubmit={submitRoadmap}
        />
      )}
    </div>
  );
}
