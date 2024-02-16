import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import QuestionRenderKey from './question-render-key';

const PartRenderKey = async ({ partId }: { partId: string }) => {
  const part = await db.part.findUnique({
    where: { id: partId },
    include: { questions: { select: { id: true } } }
  });
  if (!part) {
    return notFound();
  }
  return (
    <>
      <div className="text-lg font-bold">Part {part.order + 1}</div>
      <Suspense fallback={<></>}>
        <div className="grid grid-cols-2 gap-2">
          {part.questions.map((question) => (
            <QuestionRenderKey questionId={question.id} key={question.id} />
          ))}
        </div>
      </Suspense>
    </>
  );
};

export default PartRenderKey;
