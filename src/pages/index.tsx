// File: src/pages/index.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Step1 from '@/components/wizard/Step1';
import Step2 from '@/components/wizard/Step2';
import Step3 from '@/components/wizard/Step3';
import Report from '@/components/Report';

import { schema, type FormData } from '@/components/wizard/types';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

export default function Page() {
  const [step, setStep] = useState(0);
  const [reportData, setReportData] = useState(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [step]);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      agencyName: '',
      contactName: '',
      website: '',
      contactEmail: '',
      staffCount: 0,
      officeSuite: 'o365',
      officeSuiteOther: '',
      ams: [],
      amsOther: '',
      rater: [],
      raterOther: '',
      itSolution: 'msp',
      itProvider: '',
      isp: '',
      ispSecondary: '',
      voip: 'none',
      voipOther: '',
      vdi: 'none',
      vdiOther: '',
      hardwareAge: '1-2',
      assetPlan: 'unknown',
      passwordManager: 'none',
      passwordManagerOther: '',
      edr: 'crowdstrike',
      edrOther: '',
      perpetuationPlan: 'maintain',
      timeline: '',
      files: undefined,
    },
  });

  const step1Ready =
    form.watch('agencyName') &&
    form.watch('contactName') &&
    form.watch('website') &&
    form.watch('contactEmail') &&
    form.watch('staffCount') > 0;

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  async function onSubmit(data: FormData) {
    const body = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (k === 'files' && v instanceof FileList) {
        Array.from(v).forEach((f) => body.append('files', f));
      } else {
        body.append(k, JSON.stringify(v));
      }
    });

    const res = await fetch('/api/generateReports', { method: 'POST', body });
    const parsed = await res.json();
    try {
      const parsedData = JSON.parse(parsed);
      setReportData(parsedData);
    } catch {
      alert('Report generation failed.');
    }
  }

  if (reportData) {
    return (
      <main className="mx-auto max-w-5xl p-4">
        <Report data={reportData} />
      </main>
    );
  }

  return (
    <Dialog open>
      <DialogContent
        ref={contentRef}
        className="max-w-xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>
            {['Agency basics', 'Systems & compliance', 'Connectivity'][step]}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 0 && <Step1 form={form} />}
            {step === 1 && <Step2 form={form} />}
            {step === 2 && <Step3 form={form} />}

            <div className="mt-6 flex justify-between">
              {step > 0 ? (
                <Button type="button" variant="secondary" onClick={back}>
                  Back
                </Button>
              ) : (
                <span />
              )}

              {step < 2 ? (
                <Button type="button" onClick={next} disabled={!step1Ready}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Submitting…' : 'Finish'}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
