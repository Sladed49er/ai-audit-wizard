'use client';
import { useState } from 'react';
import Step1 from '@/components/Step1UserInfo';
import Step2 from '@/components/Step2Selectors';
import Step3 from '@/components/Step3Integrations';
import Step4 from '@/components/Step4AutomationIdea';
import Report, { ReportData } from '@/components/Report';

export default function IndexPage() {
  const [step, setStep]           = useState(1);
  const [formData, setFormData]   = useState<any>({});
  const [report, setReport]       = useState<ReportData | null>(null);
  const [loading, setLoading]     = useState(false);

  const merge = (d: any) => setFormData((p:any)=>({ ...p, ...d }));

  async function submit() {
    setLoading(true);
    const res   = await fetch('/api/generateReports', {
      method: 'POST',
      body: JSON.stringify({
        selectors: {
          industry   : formData.industry,
          software   : formData.software,
          painPoints : formData.painPoints,
        },
        userInfo: { business: formData.business },
      }),
    });
    const raw   = await res.json();
    try { setReport(JSON.parse(raw)); }
    catch { alert('Report generation failed'); }
    setLoading(false);
  }

  if (loading)   return <p className="mt-24 text-center">Generating report…</p>;
  if (report)    return <Report data={report} />;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {step === 1 && <Step1 data={formData} setData={merge} onNext={()=>setStep(2)} />}
      {step === 2 && <Step2 data={formData} setData={merge} onNext={()=>setStep(3)} onBack={()=>setStep(1)} />}
      {step === 3 && <Step3 data={formData} setData={merge} onNext={()=>setStep(4)} onBack={()=>setStep(2)} />}
      {step === 4 && <Step4 data={formData} setData={merge} onSubmit={submit}  onBack={()=>setStep(3)} />}
    </div>
  );
}
