import { Suspense } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ImageIcon } from 'lucide-react';
import { db } from '@/lib/db';
import { cn, formatTime } from '@/lib/utils';
import { PlaceholderImage } from '../placeholder-image';
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
      <div className="flex flex-wrap bg-red-500 gap-4 sm:justify-start justify-center ">
        <div className="relative">
          {assessment.imageCover ? (
            <Image
              src={assessment.imageCover}
              width={64}
              height={64}
              alt={assessment.name}
            />
          ) : (
            <div className="w-64">
              <PlaceholderImage />
            </div>
          )}
        </div>
        <h1 className="font-bold text-xl">{assessment.name}</h1>
      </div>
      {/* Score Render */}
      <div className="mt-8">
        <p className="text-center font-bold text-3xl">Your score is:</p>
        <div className="flex sm:flex-row flex-col items-center gap-10 px-8 sm:py-8 py-4 sm:justify-between justify-center">
          <div className="rounded-full h-40 w-40 flex items-center justify-center border-4 border-success">
            <div className="flex flex-col items-center">
              <p>Correct</p>
              <p>Answers</p>
              <p>
                {assessment.result.totalCorrectAnswers}/
                {assessment.totalQuestions}
              </p>
            </div>
          </div>

          <div className="rounded-full h-40 w-40 flex items-center justify-center border-4 bg-success">
            <p className="font-bold text-3xl">{assessment.result.score}</p>
          </div>

          <div className="rounded-full h-40 w-40 flex items-center justify-center border-4 border-success">
            <div className="flex flex-col items-center">
              <p>Time Spent</p>
              <p className="font-bold text-xl">
                {formatTime(assessment.result.timeSpent)}
              </p>
              <p>({formatTime(assessment.duration)})</p>
            </div>
          </div>
        </div>
      </div>
      {/* Answer Keys */}
      <div className="border mt-10 flex flex-col gap-6">
        <p className="font-bold text-xl">Answer Keys</p>
        <Suspense fallback={<></>}>
          <div className="flex flex-col gap-4">
            {assessment.parts.map((part) => (
              <PartRenderKey partId={part.id} key={part.id} />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default ScoreHeaderRender;
