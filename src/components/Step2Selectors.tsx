'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useAuditState } from '@/context/AuditContext';
import { getIndustrySoftware, getIndustryPain } from '@/lib/getData';

type FormData = {
  software: string[];
  softwareOther: string;
  painPoints: string[];
  painOther: string;
};

/* simple trim validator */
const schema = z.object({
  software: z.array(z.string()).optional(),
  softwareOther: z.string().optional(),
  painPoints: z.array(z.string()).optional(),
  painOther: z.string().optional(),
});

export default function Step2Selectors() {
  const { state, dispatch, goBack, reset } = useAuditState();
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      software: state.software,
      painPoints: state.painPoints,
    },
  });

  const onSubmit = (d: FormData) => {
    const allSoftware = [...(d.software ?? []), ...d.softwareOther.split(',').map(s => s.trim()).filter(Boolean)];
    const allPain = [...(d.painPoints ?? []), ...d.painOther.split(',').map(p => p.trim()).filter(Boolean)];

    dispatch({ type: 'SET_SELECTORS', payload: { software: allSoftware, painPoints: allPain } });
    dispatch({ type: 'NEXT' });
  };

  const industry = state.user?.industry ?? '';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-xl font-semibold">Step 2 – Pick your stack & pain-points</h1>

      {/* two-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ── Software column ── */}
        <div>
          <h2 className="font-medium mb-2">Software used (select all that apply)</h2>
          <div className="h-64 overflow-y-auto border rounded p-3 space-y-1">
            {getIndustrySoftware(industry).slice(0, 15).map(name => (
              <label key={name} className="flex items-center gap-2">
                <input type="checkbox" value={name} {...register('software')} /> {name}
              </label>
            ))}
          </div>
          <input
            {...register('softwareOther')}
            placeholder="Other software (comma-separated)"
            className="mt-2 w-full border rounded p-2"
          />
        </div>

        {/* ── Pain-points column ── */}
        <div>
          <h2 className="font-medium mb-2">Top challenges</h2>
          <div className="h-64 overflow-y-auto border rounded p-3 space-y-1">
            {getIndustryPain(industry).slice(0, 10).map(p => (
              <label key={p} className="flex items-center gap-2">
                <input type="checkbox" value={p} {...register('painPoints')} /> {p}
              </label>
            ))}
          </div>
          <input
            {...register('painOther')}
            placeholder="Other challenges (comma-separated)"
            className="mt-2 w-full border rounded p-2"
          />
        </div>
      </div>

      {/* nav buttons */}
      <div className="flex justify-between">
        <button type="button" onClick={goBack} className="rounded bg-gray-200 px-4 py-2">← Back</button>
        <button type="button" onClick={reset}  className="rounded bg-red-100 px-4 py-2 text-red-700">Reset form</button>
        <button type="submit" className="rounded bg-emerald-600 px-4 py-2 text-white">Next →</button>
      </div>
    </form>
  );
}
