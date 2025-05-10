'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuditState } from '@/context/AuditContext';
import { getIndustries } from '@/lib/getData';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(1),
  industry: z.string().min(1),
});
type FormData = z.infer<typeof schema>;

export default function Step1UserInfo() {
  const [state, dispatch] = useAuditState();
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: state.user ?? {},
  });
  const onSubmit = (data: FormData) => {
    dispatch({ type: 'SET_USER', payload: data });
    dispatch({ type: 'NEXT' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-xl font-semibold">Step 1 – Tell us about you</h1>
      <input {...register('name')} placeholder="Full name" className="w-full border p-2 rounded" />
      <input {...register('email')} placeholder="Email address" className="w-full border p-2 rounded" />
      <input {...register('company')} placeholder="Company name" className="w-full border p-2 rounded" />
      <select {...register('industry')} className="w-full border p-2 rounded">
        <option value="">Select your industry</option>
        {getIndustries().map((ind) => (
          <option key={ind} value={ind}>{ind}</option>
        ))}
      </select>
      {formState.errors && <p className="text-red-600 text-sm">Please fill all fields correctly.</p>}
      <button type="submit" className="rounded bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700">Next</button>
    </form>
  );
}
