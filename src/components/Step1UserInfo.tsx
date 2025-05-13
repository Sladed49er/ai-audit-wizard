/* ------------------------------------------------------------------
   src/components/Step1UserInfo.tsx
   Step 1 – Collect user info, validate with Zod, store in context,
   then advance the wizard.
   ------------------------------------------------------------------ */

'use client';

import { useForm, SubmitHandler }       from 'react-hook-form';
import { zodResolver }                  from '@hookform/resolvers/zod';
import { z }                            from 'zod';
import { useAuditState, useAuditDispatch } from '@/context/AuditContext';

/* ───────── schema & type ──────────── */
const schema = z.object({
  name:     z.string().min(1, 'Name is required'),
  email:    z.string().email('Valid e-mail required'),
  company:  z.string().min(1, 'Company name is required'),
  industry: z.string().min(1, 'Industry is required'),
});
type FormData = z.infer<typeof schema>;

export default function Step1UserInfo() {
  /* wizard context */
  const  state    = useAuditState();
  const  dispatch = useAuditDispatch();

  /* form */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver:       zodResolver(schema),
    // state.user may be undefined → fall back to {}
    defaultValues:  (state.user ?? {}) as Partial<FormData>,
  });

  /* on submit = save + NEXT */
  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch({ type: 'SET_USER', payload: data });
    dispatch({ type: 'NEXT'     });
  };

  /* UI */
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-xl font-semibold">Step 1 — Tell us about you</h1>

      <input {...register('name')}     placeholder="Full name"     className="input" />
      {errors.name     && <p className="error">{errors.name.message}</p>}

      <input {...register('email')}    placeholder="Email address" className="input" />
      {errors.email    && <p className="error">{errors.email.message}</p>}

      <input {...register('company')}  placeholder="Company name"  className="input" />
      {errors.company  && <p className="error">{errors.company.message}</p>}

      <input {...register('industry')} placeholder="Industry"      className="input" />
      {errors.industry && <p className="error">{errors.industry.message}</p>}

      <button type="submit" className="btn">Next</button>
    </form>
  );
}
