/* --------------------------------------------------------------
   Step 2 – choose software & pain-points (+ inline “Other” fields)
   -------------------------------------------------------------- */
'use client';

import { z }                      from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver }            from '@hookform/resolvers/zod';

import rawIndustries              from '@/data/industry-ui-enriched.json';
import MultiCheckbox              from '@/components/ui/MultiCheckbox';
import {
  useAuditState,
  useAuditDispatch,
}                                 from '@/context/AuditContext';

/* ---------- typed industry data -------------------------------- */
interface IndustryDetails {
  software:     { name: string; integrates_with: string[] }[];
  pain_points?: { frictions: string[] };
}
const industryData = rawIndustries as Record<string, IndustryDetails>;

const listsFor = (industry: string) => {
  const rec = industryData[industry];
  if (!rec) return { software: [], pains: [] };
  return {
    software: rec.software.map((s) => s.name),
    pains:    rec.pain_points?.frictions ?? [],
  };
};

/* ---------- component ------------------------------------------ */
export default function Step2Selectors() {
  const state    = useAuditState();
  const dispatch = useAuditDispatch();

  const { software: SW, pains: PA } = listsFor(state.industry);

  /* zod schema accepts optional “other” text -------------------- */
  const schema = z.object({
    software        : z.array(z.enum([...SW] as [string, ...string[]])).nonempty(),
    painPoints      : z.array(z.enum([...PA] as [string, ...string[]])).nonempty(),
    otherSoftware   : z.string().optional().default(''),
    otherPainPoints : z.string().optional().default(''),
  });
  type Form = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: {
      software       : state.software,
      painPoints     : state.painPoints,
      otherSoftware  : '',
      otherPainPoints: '',
    } as Partial<Form>,
  });

  const onSubmit: SubmitHandler<Form> = (data) => {
    /* merge comma-separated “Other” items into the main arrays ---- */
    const othersSW = data.otherSoftware
      ? data.otherSoftware.split(',').map((s) => s.trim()).filter(Boolean)
      : [];
    const othersPP = data.otherPainPoints
      ? data.otherPainPoints.split(',').map((p) => p.trim()).filter(Boolean)
      : [];

    dispatch({
      type   : 'SET_SELECTORS',
      payload: {
        software  : [...data.software, ...othersSW],
        painPoints: [...data.painPoints, ...othersPP],
      },
    });
    dispatch({ type: 'NEXT' });
  };

  return (
    <section className="mx-auto max-w-3xl space-y-8 p-4">
      <h1 className="text-xl font-semibold text-center">
        Step 2 – Choose software &amp; challenges
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* --- Software -------------------------------------------------- */}
        <MultiCheckbox
          label="Core software"
          name="software"
          items={SW}
          register={register}
          cols={2}
        />
        {errors.software && (
          <p className="text-red-600 text-sm">Pick at least one system.</p>
        )}

        {/* “Other software” text line */}
        <input
          {...register('otherSoftware')}
          placeholder="Other software (comma-separated)"
          className="w-full rounded border px-2 py-1"
        />

        {/* --- Pain-points ---------------------------------------------- */}
        <MultiCheckbox
          label="Top pain points"
          name="painPoints"
          items={PA}
          register={register}
          cols={2}
        />
        {errors.painPoints && (
          <p className="text-red-600 text-sm">Pick at least one pain-point.</p>
        )}

        {/* “Other pain-points” text line */}
        <input
          {...register('otherPainPoints')}
          placeholder="Other challenges (comma-separated)"
          className="w-full rounded border px-2 py-1"
        />

        {/* --- nav ------------------------------------------------------- */}
        <button
          type="submit"
          className="mx-auto block rounded bg-sky-600 px-6 py-2 font-semibold text-white hover:bg-sky-700"
        >
          Next
        </button>
      </form>
    </section>
  );
}
