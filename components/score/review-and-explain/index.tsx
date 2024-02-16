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
  const partId = partIndex
    ? assessment.parts[partIndex].id
    : assessment.parts[0].id;
  return (
    <div className="max-h-[400px] h-[400px] flex flex-col ">
      <div className="font-bold text-xl">Review And Explanation</div>
      <Suspense fallback={<></>}>
        <PartRender partId={partId} totalParts={assessment.parts.length} />
      </Suspense>
    </div>
  );
};

export default ReviewAndExplainRender;
