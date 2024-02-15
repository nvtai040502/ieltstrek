'use client';

import { useContext, useEffect, useState } from 'react';
import { IdentifyChoice } from '@prisma/client';
import { AnswerType, ExamContext } from '@/global/exam-context';
import { useExamHandler } from '@/global/use-exam-handler';
import { IdentifyInfoExtended } from '@/types/test-exam';
import { cn } from '@/lib/utils';
import { ActionButton } from '@/components/test-exam/action-button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const IdentifyInfoRender = ({
  identifyInfo
}: {
  identifyInfo: IdentifyInfoExtended;
}) => {
  const { questionRefs, currentRef, userAnswers } = useContext(ExamContext);
  const [answer, setAnswer] = useState<AnswerType | undefined>(undefined);
  const { handleAnswerSelected } = useExamHandler();
  useEffect(() => {
    const answer = userAnswers.find(
      (answer) => answer.questionId === identifyInfo.questionId
    );
    setAnswer(answer);
  }, [userAnswers, identifyInfo.questionId]);
  return (
    <div
      className="space-y-2"
      ref={questionRefs[identifyInfo.question.questionNumber - 1]}
      tabIndex={0}
    >
      <div className="flex items-center gap-2 ">
        <p
          className={cn(
            'px-2 py-1',
            currentRef === identifyInfo.question.questionNumber - 1
              ? 'border border-foreground'
              : ''
          )}
        >
          {identifyInfo.question.questionNumber}
        </p>
        <p>{identifyInfo.title}</p>
        <ActionButton
          actionType="update"
          editType="editIdentifyInfo"
          data={{ identifyInfo }}
        />
      </div>

      <RadioGroup
        onValueChange={(value: IdentifyChoice) =>
          handleAnswerSelected({
            questionId: identifyInfo.questionId,
            type: 'IDENTIFY_INFO',
            content: value
          })
        }
        value={answer && answer.type === 'IDENTIFY_INFO' ? answer.content : ''}
      >
        {[
          IdentifyChoice.TRUE,
          IdentifyChoice.FALSE,
          IdentifyChoice.NOT_GIVEN
        ].map((answer) => (
          <div
            key={answer}
            className="flex items-center space-x-2 px-4 w-full hover:bg-secondary"
          >
            <RadioGroupItem
              value={answer}
              id={`${identifyInfo.id}-${answer}`}
            />
            <Label
              htmlFor={`${identifyInfo.id}-${answer}`}
              className="py-4 w-full cursor-pointer"
            >
              {answer}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
