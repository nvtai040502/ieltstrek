import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { formatTime } from '@/lib/utils';
import PartRenderKey from './part-render-key';

const ScoreHeaderRender = async ({
  assessmentId
}: {
  assessmentId: string;
}) => {
  const assessment = await db.assessment.findUnique({
    where: { id: assessmentId },
    include: { result: true, parts: { select: { id: true } } }
  });
  if (!assessment || !assessment.result) {
    return notFound();
  }
  return (
    // TODO: Make design better
    <div className="">
      {/* Exam Card */}
      <div>
        <p>{assessment.name}</p>
      </div>
      {/* Score Render */}
      <div className="mt-8 bg-blue-300">
        <p className="text-center font-bold text-xl">Your score is</p>
        <div className="flex items-center justify-between">
          <p>
            Correct Answers {assessment.result.totalCorrectAnswers}/
            {assessment.totalQuestions}
          </p>
          <p>{assessment.result.score}</p>
          <p>
            Time Spent {formatTime(assessment.result.timeSpent)}{' '}
            {`(${formatTime(assessment.duration)})`}{' '}
          </p>
        </div>
      </div>
      {/* Answer Keys */}
      <div className="border mt-10">
        <p className="font-bold ">Answer Keys</p>
        <Suspense fallback={<></>}>
          {assessment.parts.map((part) => (
            <PartRenderKey partId={part.id} key={part.id} />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default ScoreHeaderRender;
