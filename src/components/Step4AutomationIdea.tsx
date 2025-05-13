'use client';

import { useState }       from 'react';
import { useForm }        from 'react-hook-form';
import { z }              from 'zod';
import { zodResolver }    from '@hookform/resolvers/zod';

import { useAuditDispatch } from '@/context/AuditContext';
import useGenerateRoadmap   from '@/hooks/useGenerateRoadmap';

const schema = z.object({
  idea: z.string().min(10, 'Please give a little more detail.'),
});
type Form = z.infer<typeof schema>;

export default function Step4AutomationIdea() {
  const dispatch                  = useAuditDispatch();
  const { generate, loading }     = useGenerateRoadmap();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async ({ idea }: Form) => {
    dispatch({ type: 'SET_IDEA', payload: idea });
    setSubmitted(true);
    await generate();
    dispatch({ type: 'NEXT' });
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6 p-4">
      <h1 className="text-2xl font-semibold text-center">
        Step&nbsp;4 – Your&nbsp;#1 Automation Wish
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
