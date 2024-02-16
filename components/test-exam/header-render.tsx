'use client';

import { useContext } from 'react';
import { AlignJustify, Bell, Wifi } from 'lucide-react';
import { ExamContext } from '@/global/exam-context';
import { formatTime } from '@/lib/utils';
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';
import PublicAssessmentButton from './public-assessment-button';
import TimeRemainingRender from './time-remaining-render';

function TextExamHeaderRender() {
  const { mode } = useContext(ExamContext);
  return (
    <div className="px-4 py-2 flex items-center ">
      {mode === 'edit' && <PublicAssessmentButton />}
      <div className="gap-6 flex items-center">
        <Icons.logo className="h-6 w-6" aria-hidden="true" />
        <div className="">
          <p className=" font-bold">Title</p>
          <TimeRemainingRender />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end m">
        <nav className="flex items-center">
          <div className="p-4">
            <Wifi />
          </div>
          <Button variant="ghost">
            <Bell />
          </Button>
          <Button variant="ghost">
            <AlignJustify />
          </Button>
        </nav>
      </div>
    </div>
  );
}

export default TextExamHeaderRender;
