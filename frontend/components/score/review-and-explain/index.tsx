import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import {
  CustomResizablePanel,
  ResizableHandle,
  ResizablePanelGroup
} from '../../ui/resizable';
import PartRender from './part-render';

const ReviewAndExplainRender = async ({
  assessmentId,
  partIndex
}: {
  assessmentId: string;
  partIndex?: number;
}) => {
  const assessment = await db.assessment.findUnique({
    where: { id: assessmentId },
    include: { parts: { orderBy: { order: 'asc' } } }
  });
  if (!assessment) {
    return notFound();
  }
  const part = partIndex ? assessment.parts[partIndex] : assessment.parts[0];
  return (
    <div className="max-h-[400px] h-[400px] flex flex-col border-24 rounded-3xl border-t-0 border-secondary">
      <div className="font-bold text-xl bg-secondary p-2">
        Review And Explanation:
      </div>
      <Suspense fallback={<></>}>
        <PartRender part={part} totalParts={assessment.parts.length} />
      </Suspense>
    </div>
  );
};

export default ReviewAndExplainRender;
