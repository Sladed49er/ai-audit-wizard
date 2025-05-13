/* ---------------------------------------------------------
   Step 1 – user info
---------------------------------------------------------- */
'use client';

import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver }            from '@hookform/resolvers/zod';
import { useAuditState,
         useAuditDispatch }       from '@/context/AuditContext';

/* ── form schema ───────────────────────────────────────── */
const schema = z.object({
  name     : z.string().min(2),
  email    : z.string().email(),
  company  : z.string().min(2),
  industry : z.string().min(2),
});
type FormData = z.infer<typeof schema>;

/* ── industry list – replace / fetch as needed ─────────── */
const INDUSTRIES = [
  'Insurance (Retail P&C)',
  'Insurance (Commercial)',
  'Brokerage',
  'Fin-Tech',
  'Other',
];

/* ── component ─────────────────────────────────────────── */
export default function Step1UserInfo() {
  const state    = useAuditState();      // plain object
  const dispatch = useAuditDispatch();

  const {
    register, handleSubmit, formState:{ errors },
  } = useForm<FormData>({
    resolver     : zodResolver(schema),
    defaultValues: (state.user ?? {}) as Partial<FormData>,
  });

  const onSubmit: SubmitHandler<FormData> = data => {
    dispatch({ type:'SET_USER', payload:data });
    dispatch({ type:'NEXT' });
  };

  return (
    <section className="space-y-6">
      <h1 className="text-xl font-semibold">Step 1 — Tell us about you</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-md"
      >
        {/* name */}
        <input
          {...register('name')}
          placeholder="Full name"
          className="w-full border rounded p-2"
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}

        {/* email */}
        <input
          {...register('email')}
          placeholder="Email address"
          className="w-full border rounded p-2"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}

        {/* company */}
        <input
          {...register('company')}
          placeholder="Company name"
          className="w-full border rounded p-2"
        />
        {errors.company && (
          <p className="text-sm text-red-600">{errors.company.message}</p>
        )}

        {/* industry */}
        <select
          {...register('industry')}
          className="w-full border rounded p-2 bg-white"
          defaultValue=""
        >
          <option value="" disabled hidden>Select industry …</option>
          {INDUSTRIES.map(ind => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
        {errors.industry && (
          <p className="text-sm text-red-600">{errors.industry.message}</p>
        )}

        <button type="submit" className="btn">Next</button>
      </form>
    </section>
  );
}
