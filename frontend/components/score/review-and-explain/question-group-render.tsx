import { Suspense } from 'react';
import { db } from '@/lib/db';
import { CompletionRender } from './completion-render/render';
import { IdentifyInfoListRender } from './identify-info-render';
import { MultiOneListRender } from './multi-one-render';

async function QuestionGroupRender({ partId }: { partId: string }) {
  const questionGroupList = await db.questionGroup.findMany({
    where: { partId },
    orderBy: { startQuestionNumber: 'asc' }
  });
  return (
    <>
      {questionGroupList.map((questionGroup) => (
        <div key={questionGroup.id} className="flex flex-col gap-2">
          <p className="font-bold">
            Questions {questionGroup.startQuestionNumber}-
            {questionGroup.endQuestionNumber}
          </p>
          <p className=" whitespace-pre-line">{questionGroup.title}</p>
          <Suspense fallback={<></>}>
            {questionGroup.type === 'MULTIPLE_CHOICE_ONE_ANSWER' && (
              <MultiOneListRender questionGroupId={questionGroup.id} />
            )}
          </Suspense>
          <Suspense fallback={<></>}>
            {questionGroup.type === 'IDENTIFYING_INFORMATION' && (
              <IdentifyInfoListRender questionGroupId={questionGroup.id} />
            )}
          </Suspense>
          <Suspense fallback={<></>}>
            {questionGroup.type === 'COMPLETION' && (
              <CompletionRender questionGroupId={questionGroup.id} />
            )}
          </Suspense>
        </div>
      ))}
    </>
  );
}

export default QuestionGroupRender;
