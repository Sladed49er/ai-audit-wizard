'use client';
import { useForm } from 'react-hook-form';
import { useAuditState } from '@/context/AuditContext';

type FormData = { idea: string };

export default function Step4AutomationIdea() {
  const [state, dispatch] = useAuditState();
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { idea: state.automationIdea ?? '' },
  });

  const onSubmit = async (d: FormData) => {
    dispatch({ type: 'SET_IDEA', payload: d.idea });

    const res = await fetch('/api/generatePlan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: state.user,
        software: state.software,
        painPoints: state.painPoints,
        integrations: state.integrationNotes,
        idea: d.idea,
      }),
    }).then((r) => r.json());

    dispatch({ type: 'SET_REPORT', payload: res.plan });
    dispatch({ type: 'NEXT' }); // → Step 5 (Report)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-xl font-semibold">Step 4 – Your #1 Automation Wish</h1>
      <textarea
        {...register('idea')}
        rows={6}
        placeholder="Describe a repetitive task you’d love AI to handle…"
        className="w-full border rounded p-2"
      />
      <button
        type="submit"
        className="rounded bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700"
      >
        Generate Roadmap
      </button>
    </form>
  );
}
