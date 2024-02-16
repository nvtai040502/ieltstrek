'use client';

import { useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useEditHook } from '@/global/use-edit-hook';
import { MODE } from '@/config/constants';
import { createUrl } from '@/lib/utils';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

function OpenAssessmentModal() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { isOpen, data, type, onClose } = useEditHook();
  const isModalOpen = isOpen && type === 'openAssessment';
  const assessment = data?.assessment;
  if (!assessment || !isModalOpen) {
    return null;
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="h-screen lg:max-w-3xl md:max-w-xl overflow-auto">
        <DialogHeader>
          <DialogTitle className="item-center flex justify-center text-3xl">
            Choose a mode
          </DialogTitle>
        </DialogHeader>
        <section className="">
          <div className="container px-5 mx-auto">
            <div className="flex flex-wrap text-center items-center justify-center">
              <div className="sm:w-1/2 px-4 ">
                <h2 className="title-font text-2xl font-medium ">
                  Simulation Test Mode
                </h2>
                <Button
                  disabled={isPending}
                  onClick={() => {
                    startTransition(() => {
                      const newSearchParams = new URLSearchParams();
                      newSearchParams.set('mode', MODE.exam);
                      const pathname = `/assessments/${assessment.id}`;
                      router.push(createUrl(pathname, newSearchParams));
                      onClose();
                    });
                  }}
                >
                  Start Now
                </Button>
              </div>
              <div className="sm:w-1/2 px-4">
                <h2 className="title-font text-2xl font-medium ">Edit Mode</h2>
                <Button
                  disabled={isPending}
                  onClick={() => {
                    startTransition(() => {
                      const newSearchParams = new URLSearchParams();
                      newSearchParams.set('mode', MODE.edit);
                      const pathname = `/assessments/${assessment.id}`;
                      router.push(createUrl(pathname, newSearchParams));
                      onClose();
                    });
                  }}
                >
                  Start Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default OpenAssessmentModal;
