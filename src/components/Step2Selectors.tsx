'use client';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { useAuditState } from '@/context/AuditContext';
import MultiCheckbox from '@/components/MultiCheckbox';
import { getIndustrySoftware, getIndustryPain } from '@/lib/getData';

interface FormData {
  industry: string;
  software: string[];
  softwareOther?: string;
  painPoints: string[];
  painPointsOther?: string;
}

export default function Step2Selectors() {
  const [state, dispatch] = useAuditState();
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      industry: state.user!.industry,
      software: state.software,
      painPoints: state.painPoints,
    },
  });
  const industry = watch('industry');
  const softwareChoices = useMemo(() => getIndustrySoftware(industry), [industry]);
  const painChoices = useMemo(() => getIndustryPain(industry), [industry]);

  const onSubmit = (d: FormData) => {
    const software = [...d.software, ...(d.softwareOther?.split(',').map((s) => s.trim()) ?? [])].filter(Boolean);
    const painPoints = [...d.painPoints, ...(d.painPointsOther?.split(',').map((p) => p.trim()) ?? [])].filter(Boolean);
    dispatch({ type: 'SET_SELECTORS', payload: { software, painPoints } });
    dispatch({ type: 'NEXT' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold mb-4">Step 2 – Choose software & challenges</h1>
      <MultiCheckbox label="Core Software" name="software" options={softwareChoices} control={control} extraInput="Other software (comma-separated)" />
      <MultiCheckbox label="Top Pain Points" name="painPoints" options={painChoices} control={control} extraInput="Other challenges (comma-separated)" />
      <button type="submit" className="rounded bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700">Next</button>
    </form>
  );
}
