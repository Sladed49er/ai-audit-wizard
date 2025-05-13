/* ------------------------------------------------------------------
   src/components/Step2Selectors.tsx
   Step 2 – choose software + pain points with <MultiCheckbox>.
   ------------------------------------------------------------------ */

'use client';

import { SubmitHandler, useForm }        from 'react-hook-form';
import { zodResolver }                   from '@hookform/resolvers/zod';
import { z }                             from 'zod';
import { useAuditState,
         useAuditDispatch }              from '@/context/AuditContext';
import { MultiCheckbox }                 from '@/components/ui/MultiCheckbox';

/* dummy lists – replace with API data if you have it */
const SOFTWARE = ['Vertafore QQCatalyst','EZLynx','NowCerts','AMS360','HawkSoft'] as const;
const PAINS    = ['Manual onboarding processes','Disjointed communication tools'] as const;

/* schema & form type */
const schema = z.object({
  software: z.array(z.string()).nonempty('Pick at least one item'),
  painPoints: z.array(z.string()).nonempty('Pick at least one item'),
});
type FormData = z.infer<typeof schema>;

export default function Step2Selectors() {
  const  state    = useAuditState();
  const  dispatch = useAuditDispatch();

  /* form */
  const { register, handleSubmit, formState:{ errors } } = useForm<FormData>({
    resolver:      zodResolver(schema),
    defaultValues: (state.selectors ?? {}) as Partial<FormData>,
  });

  const onSubmit: SubmitHandler<FormData> = data => {
    dispatch({ type:'SET_SELECTORS', payload:data });
    dispatch({ type:'NEXT' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-xl font-semibold">Step 2 — Select software & pain-points</h1>

      <MultiCheckbox label="Software in use" name="software" items={SOFTWARE} register={register} />
      {errors.software && <p className="error">{errors.software.message}</p>}

      <MultiCheckbox label="Pain points" name="painPoints" items={PAINS} register={register} />
      {errors.painPoints && <p className="error">{errors.painPoints.message}</p>}

      <button type="submit" className="btn">Next</button>
    </form>
  );
}
