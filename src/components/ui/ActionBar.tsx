'use client';

import { useRef, useState } from 'react';
import CalendarModal from './CalendarModal';
import PdfModal from './PdfModal';

interface Props {
  pdfTargetRef: React.RefObject<HTMLDivElement>;
}

export default function ActionBar({ pdfTargetRef }: Props) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const generating = useRef(false);

  /* ---------- generate PDF and open modal ---------------- */
  const showPdf = async () => {
    if (!pdfTargetRef.current || generating.current) return;
    generating.current = true;

    const { default: html2pdf } = await import('html2pdf.js');

    const blobUrl: string = await html2pdf()
      .set({
        margin: 10,
        html2canvas: { scale: 2 },
        pagebreak: { mode: ['avoid-all'] },
      })
      .from(pdfTargetRef.current)
      .outputPdf('bloburl');         // <-- get blob URL instead of saving

    setPdfUrl(blobUrl);
    setPdfOpen(true);
    generating.current = false;
  };

  /* ------------------------ UI -------------------------- */
  return (
    <>
      <div className="flex justify-center gap-4">
        <button
          onClick={showPdf}
          className="rounded bg-sky-600 px-6 py-2 font-semibold text-white hover:bg-sky-700"
        >
          Preview / Save PDF
        </button>

        <button
          onClick={() => setCalendarOpen(true)}
          className="rounded border border-sky-600 px-6 py-2 font-semibold text-sky-600 hover:bg-sky-50"
        >
          Book a Call
        </button>
      </div>

      {/* modals */}
      <CalendarModal
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        link="https://calendarbridge.com/book/matt-slade"
      />

      <PdfModal
        open={pdfOpen}
        onClose={() => setPdfOpen(false)}
        pdfUrl={pdfUrl}
      />
    </>
  );
}
