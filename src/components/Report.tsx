'use client';
import { useRef } from 'react';
import { useAuditState } from '@/context/AuditContext';
import { useReactToPrint } from 'react-to-print';

export default function Report() {
  const [state] = useAuditState();
  const ref = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({ content: () => ref.current });

  if (!state.reportHtml) return <p>Generating report…</p>;

  const sendEmail = async () => {
    await fetch('/api/sendReport', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: state.user?.email,
        html: state.reportHtml,
      }),
    });
    alert('Roadmap emailed!');
  };

  return (
    <>
      <div ref={ref} dangerouslySetInnerHTML={{ __html: state.reportHtml }} />
      <div className="mt-6 flex gap-3">
        <button onClick={print} className="rounded bg-red-600 px-4 py-2 text-white">
          🖨️ Print / Save PDF
        </button>
        <button onClick={sendEmail} className="rounded bg-emerald-600 px-4 py-2 text-white">
          📧 Email Me
        </button>
      </div>
    </>
  );
}
