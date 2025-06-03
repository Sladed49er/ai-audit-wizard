'use client';

import { useState } from 'react';
import Step1 from '@/components/Step1UserInfo';
import Step2 from '@/components/Step2Selectors';
import Step3 from '@/components/Step3Integrations';
import Step4 from '@/components/Step4AutomationIdea';
import Report, { ReportData } from '@/components/Report';

export default function IndexPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);

  const updateData = (newData: any) => {
    setFormData((prev: any) => ({ ...prev, ...newData }));
  };

  const submit = async () => {
    setLoading(true);
    const res = await fetch('/api/generateReports', {
      method: 'POST',
      body: JSON.stringify({
        selectors: {
          industry: formData.industry,
          software: formData.software,
          painPoints: formData.painPoints,
        },
        userInfo: {
          business: formData.business,
        },
      }),
    });

    const json = await res.json();
    try {
      const parsed = JSON.parse(json);
      setReport(parsed);
    } catch {
      console.error('Failed to parse response');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg text-gray-600">
        Generating report…
      </div>
    );
  }

  if (report) return <Report data={report} />;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {step === 1 && (
        <Step1
          data={formData}
          setData={updateData}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <Step2
          data={formData}
          setData={updateData}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step3
          data={formData}
          setData={updateData}
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <Step4
          data={formData}
          setData={updateData}
          onSubmit={submit}
          onBack={() => setStep(3)}
        />
      )}
    </div>
  );
}
