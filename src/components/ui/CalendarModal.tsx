'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface Props {
  open: boolean;
  onClose: () => void;
  link: string;
}

export default function CalendarModal({ open, onClose, link }: Props) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
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
            <Dialog.Panel className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white">
              <div className="flex items-center justify-between px-4 py-2 border-b">
                <Dialog.Title className="font-semibold">Book a Call</Dialog.Title>
                <button onClick={onClose} className="text-xl leading-none">&times;</button>
              </div>

              <iframe
                src={link}
                className="h-[80vh] w-full border-0"
                title="Calendar booking"
              />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
