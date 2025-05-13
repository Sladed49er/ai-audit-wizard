/* ---------------------------------------------------------
   Step 1 – capture basic user details
---------------------------------------------------------- */
'use client';

import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver }            from '@hookform/resolvers/zod';

import industryData               from '@/data/industry-ui-enriched.json';
import { useAuditState,
         useAuditDispatch }       from '@/context/AuditContext';

type IndustryMap   = typeof industryData;
const INDUSTRIES   = Object.keys(industryData as IndustryMap);   // array of labels

/* form schema */
const schema = z.object({
  name    : z.string().min(2),
  email   : z.string().email(),
  company : z.string().min(2),
  industry: z.enum([...INDUSTRIES] as [string, ...string[]]),
});
type FormData = z.infer<typeof schema>;

export default function Step1UserInfo() {
  const state    = useAuditState();
  const dispatch = useAuditDispatch();

  const { register, handleSubmit, formState:{ errors } } = useForm<FormData>({
    resolver     : zodResolver(schema),
    defaultValues: {
      name    : state.name,
      email   : state.email,
      company : state.company,
      industry: state.industry as any,
    },
  });

  const onSubmit: SubmitHandler<FormData> = data => {
    dispatch({ type:'SET_USER', payload:data });
    dispatch({ type:'NEXT' });
  };

  return (
    <section className="space-y-6">
      <h1 className="text-xl font-semibold">Step 1 — Tell us about you</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <input
          {...register('name')}
          placeholder="Your name"
          className="w-full border rounded p-2"
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}

        <input
          {...register('email')}
          placeholder="Email address"
          className="w-full border rounded p-2"
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}

        <input
          {...register('company')}
          placeholder="Company name"
          className="w-full border rounded p-2"
        />
        {errors.company && <p className="text-sm text-red-600">{errors.company.message}</p>}

        <select
          {...register('industry')}
          className="w-full border rounded p-2 bg-white"
        >
          <option value="" disabled hidden>Select industry …</option>
          {INDUSTRIES.map(ind => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
        {errors.industry && <p className="text-sm text-red-600">{errors.industry.message}</p>}

        <button type="submit" className="btn-primary">Next</button>
      </form>
    </section>
  );
}
