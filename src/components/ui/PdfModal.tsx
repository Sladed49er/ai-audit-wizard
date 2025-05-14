'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface Props {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;          // Blob URL generated at runtime
}

export default function PdfModal({ open, onClose, pdfUrl }: Props) {
  const download = () => {
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'ai-audit-report.pdf';
    a.click();
  };

  const print = () => {
    const iframe = document.getElementById('pdf-preview') as HTMLIFrameElement;
    iframe?.contentWindow?.print();
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        {/* panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white">
              {/* header */}
              <div className="flex items-center justify-between border-b px-4 py-2">
                <Dialog.Title className="font-semibold">
                  AI Audit Report – Preview
                </Dialog.Title>

                <div className="flex gap-2">
                  <button
                    onClick={print}
                    className="rounded bg-sky-600 px-3 py-1 text-sm font-medium text-white hover:bg-sky-700"
                  >
                    Print
                  </button>
                  <button
                    onClick={download}
                    className="rounded border border-sky-600 px-3 py-1 text-sm font-medium text-sky-600 hover:bg-sky-50"
                  >
                    Download
                  </button>
                  <button
                    onClick={onClose}
                    className="ml-4 text-xl leading-none"
                  >
                    &times;
                  </button>
                </div>
              </div>

              {/* PDF iframe */}
              <iframe
                id="pdf-preview"
                src={pdfUrl}
                className="h-full w-full border-0"
                title="PDF preview"
              />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
