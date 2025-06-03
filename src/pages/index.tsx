// pages/index.tsx  (or /src/pages/index.tsx for older Next.js layouts)
'use client';

import { useAuditState }   from '@/context/AuditContext';
import Report              from '@/components/Report/Report';   // ← new path
import Spinner             from '@/components/ui/Spinner';      // tiny helper

export default function Home() {
  const { report } = useAuditState();

  /* 1️⃣  While we’re still waiting for /api/generatePlan
   *     show a very light loader.
   */
  if (!report) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Spinner className="mr-2 size-4" />
        <span className="text-gray-600">Generating report…</span>
      </div>
    );
  }

  /* 2️⃣  We have data – render the full printable report */
  return (
    <main className="mx-auto max-w-4xl p-6">
      <Report data={report} />
    </main>
  );
}
