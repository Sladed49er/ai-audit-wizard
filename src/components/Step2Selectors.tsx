'use client';
import { useForm } from 'react-hook-form';
import { useAuditState } from '@/context/AuditContext';
import { getIndustrySoftware, getIndustryPain } from '@/lib/getData';

type FormData = { software: string[]; painPoints: string[] };

export default function Step2Selectors() {
  const { state, dispatch, goBack, reset } = useAuditState();
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (d: FormData) => {
    dispatch({ type: 'SET_SELECTORS', payload: d });
    dispatch({ type: 'NEXT' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-semibold">Select software used</h2>
      {getIndustrySoftware(state.user!.industry).map((s) => (
        <label key={s} className="block">
          <input type="checkbox" value={s} {...register('software')} /> {s}
        </label>
      ))}

      <h2 className="text-lg font-semibold mt-4">Select biggest pain-points</h2>
      {getIndustryPain(state.user!.industry).map((p) => (
        <label key={p} className="block">
          <input type="checkbox" value={p} {...register('painPoints')} /> {p}
        </label>
      ))}

      <div className="mt-6 flex justify-between">
        <button type="button" onClick={goBack}
          className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300">
          ← Back
        </button>

        <button type="button" onClick={reset}
          className="rounded bg-red-100 px-4 py-2 text-red-700 hover:bg-red-200">
          Reset form
        </button>

        <button type="submit"
          className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
          Next →
        </button>
      </div>
    </form>
  );
}
