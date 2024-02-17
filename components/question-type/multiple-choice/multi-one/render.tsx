'use client';

import { useContext, useEffect, useState } from 'react';
import { AnswerType, ExamContext } from '@/global/exam-context';
import { useExamHandler } from '@/global/use-exam-handler';
import { MultiOneExtended } from '@/types/test-exam';
import { cn } from '@/lib/utils';
import { ActionButton } from '@/components/test-exam/action-button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const MultiOneRender = ({
  multiOne
}: {
  multiOne: MultiOneExtended;
}) => {
  const { questionRefs, currentRef, userAnswers } = useContext(ExamContext);
  const [answer, setAnswer] = useState<AnswerType | undefined>(undefined);
  const { handleAnswerChange: handleAnswerSelected } = useExamHandler();
  useEffect(() => {
    const answer = userAnswers.find(
      (answer) => answer.questionId === multiOne.questionId
    );
    setAnswer(answer);
  }, [userAnswers, multiOne.questionId]);
  if (!multiOne) {
    return null;
  }

  return (
    <div
      className="space-y-2"
      ref={questionRefs[multiOne.question.questionNumber - 1]}
      tabIndex={0}
    >
      <div className="flex items-center gap-2 ">
        <p
          className={cn(
            'px-2 py-1',
            currentRef === multiOne.question.questionNumber - 1
              ? 'border border-foreground'
              : ''
          )}
        >
          {multiOne.question.questionNumber}
        </p>
        <p>{multiOne.title}</p>
        <ActionButton
          actionType="update"
          editType="editMultiOne"
          data={{ multiOne }}
        />
      </div>
      <RadioGroup
        onValueChange={(choiceId) =>
          handleAnswerSelected({
            questionId: multiOne.questionId,
            type: 'MULTIPLE_CHOICE_ONE_ANSWER',
            choiceId
          })
        }
        value={
          answer && answer.type === 'MULTIPLE_CHOICE_ONE_ANSWER'
            ? answer.choiceId
            : ''
        }
      >
        {multiOne.choices.map((choice) => {
          return (
            <div key={choice.id}>
              <div
                className="flex items-center space-x-2 px-4 w-full hover:bg-secondary"
                key={choice.id}
              >
                <RadioGroupItem value={choice.id} id={choice.id} />
                <Label
                  htmlFor={choice.id}
                  className="py-4 w-full cursor-pointer"
                >
                  {choice.content}
                </Label>
                <ActionButton
                  actionType="update"
                  editType="editChoice"
                  data={{
                    choiceData: {
                      type: 'MULTI_ONE',
                      choice,
                      multiOneId: multiOne.id
                    }
                  }}
                />
              </div>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};
