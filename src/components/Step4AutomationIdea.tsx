/* --------------------------------------------------------------
   Step 4 – capture the user’s #1 AI / automation wish
   -------------------------------------------------------------- */
'use client';

import { useState }   from 'react';
import { z }          from 'zod';
import { useForm }    from 'react-hook-form';
import { zodResolver }from '@hookform/resolvers/zod';

import { useAuditDispatch } from '@/context/AuditContext';
import useGeneratePlan from '../hooks/useGeneratePlan';  // ← your existing hook

/* simple schema – at least 10 chars so people actually type  */
const schema = z.object({
  idea: z.string().min(10, 'Please give a little more detail.'),
});
type Form = z.infer<typeof schema>;

export default function Step4AutomationIdea() {
  const dispatch           = useAuditDispatch();
  const { plan, loading }  = useGeneratePlan();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Form) => {
    /* save to global state so the report can print it ------------- */
    dispatch({ type: 'SET_IDEA', payload: data.idea });
    setSubmitted(true);
    await plan({ idea: data.idea });       // call your hook
    dispatch({ type: 'NEXT' });            // go to Report step
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6 p-4">
      <h1 className="text-2xl font-semibold text-center">
        Step 4 – Your #1 Automation Wish
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 rounded-2xl border bg-white p-6 shadow-lg"
      >
        <textarea
          {...register('idea')}
          rows={6}
          placeholder="Describe a repetitive task you’d love AI to handle…"
          className="w-full resize-y rounded border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
        />
        {errors.idea && (
          <p className="text-sm text-red-600">{errors.idea.message}</p>
        )}

        <button
          type="submit"
          disabled={loading || submitted}
          className="mx-auto block rounded bg-sky-600 px-8 py-2 font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
        >
          {loading ? 'Thinking…' : 'Generate Roadmap'}
        </button>
      </form>
    </section>
  );
}
