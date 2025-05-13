/* ------------------------------------------------------------------
   Step 2 – choose software & pain-points
   ------------------------------------------------------------------ */
'use client';

import { z }                             from 'zod';
import { useForm, SubmitHandler }        from 'react-hook-form';
import { zodResolver }                   from '@hookform/resolvers/zod';

import industryData                      from '@/data/industry-ui-enriched.json';
import { useAuditState,
         useAuditDispatch }              from '@/context/AuditContext';
import  MultiCheckbox                  from '@/components/ui/MultiCheckbox';

/* util to derive lists from JSON */
type IndustryDetails = (typeof industryData)[keyof typeof industryData];

function listsFor(industry: string): {
  software: string[];
  pains:    string[];
} {
  const record  = (industryData as Record<string, IndustryDetails>)[industry];
  if (!record) return { software: [], pains: [] };

  return {
    software: record.software.map((s: { name: string }) => s.name),
    pains   : record.pain_points?.frictions ?? [],
  };
}

/* dynamic schema (must be inside component so z.enum gets correct length) */
export default function Step2Selectors() {
  const state    = useAuditState();
  const dispatch = useAuditDispatch();

  const { software: SW, pains: PA } = listsFor(state.industry);

  const schema = z.object({
    software   : z.array(z.enum([...SW] as [string, ...string[]]))
                  .nonempty('Pick at least one system'),
    painPoints : z.array(z.enum([...PA] as [string, ...string[]]))
                  .nonempty('Pick at least one pain-point'),
  });
  type FormData = z.infer<typeof schema>;

  const { register, handleSubmit, formState:{ errors } } = useForm<FormData>({
    resolver:      zodResolver(schema),
    defaultValues: {
      software   : state.software,
      painPoints : state.painPoints,
    } as Partial<FormData>,
  });

  const onSubmit: SubmitHandler<FormData> = data => {
    dispatch({ type:'SET_SELECTORS', payload:data });
    dispatch({ type:'NEXT' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-xl font-semibold">Step 2 — Select software & pain-points</h1>

      <MultiCheckbox
        label="Software in use"
        name="software"
        items={SW}
        register={register}
      />
      {errors.software && <p className="error">{errors.software.message}</p>}

      <MultiCheckbox
        label="Pain points"
        name="painPoints"
        items={PA}
        register={register}
      />
      {errors.painPoints && <p className="error">{errors.painPoints.message}</p>}

      <button type="submit" className="btn-primary">Next</button>
    </form>
  );
}
