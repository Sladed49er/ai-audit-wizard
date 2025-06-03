// File: src/pages/index.tsx

'use client';

import { useAuditState } from '@/context/AuditContext';
import Report from '@/components/Report';

export default function HomePage() {
  const { report } = useAuditState();

  if (!report) {
    return (
      <p className="text-center mt-24 text-lg text-gray-500">
        Generating report&hellip;
      </p>
    );
  }

  return (
    <main className="mx-auto max-w-5xl space-y-12 p-4">
      <Report data={report} />
    </main>
  );
}
