'use client';

import { useContext, useEffect, useState } from 'react';
import { ExamContext } from '@/global/exam-context';
import { useExamHandler } from '@/global/use-exam-handler';
import { MultiMoreExtended } from '@/types/test-exam';
import { cn } from '@/lib/utils';
import { ActionButton } from '@/components/test-exam/action-button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export const MultiMoreRender = ({
  multiMore
}: {
  multiMore: MultiMoreExtended;
}) => {
  const { questionRefs, currentRef, userAnswers } = useContext(ExamContext);
  const [choiceIdList, setChoiceIdList] = useState<string[]>([]);
  const { handleAnswerChange: handleAnswerSelected } = useExamHandler();
  useEffect(() => {
    const answer = userAnswers.find(
      (answer) => answer.questionId === multiMore.questionId
    );
    if (answer && answer.type === 'MULTI_MORE') {
      setChoiceIdList(answer.choiceIdList);
    }
  }, [userAnswers, multiMore.questionId]);

  if (!multiMore) {
    return null;
  }
  const handleCheck = (checked: boolean, choiceId: string) => {
    const updatedChoiceIdList = checked
      ? [...choiceIdList, choiceId]
      : choiceIdList.filter((id) => id !== choiceId);
    handleAnswerSelected({
      questionId: multiMore.questionId,
      type: 'MULTI_MORE',
      choiceIdList: updatedChoiceIdList
    });
  };

  return (
    <div
      className="space-y-2"
      ref={questionRefs[multiMore.question.questionNumber - 1]}
      tabIndex={0}
    >
      <div className="flex items-center gap-2 ">
        <p
          className={cn(
            'px-2 py-1',
            currentRef === multiMore.question.questionNumber - 1
              ? 'border border-foreground'
              : ''
          )}
        >
          {multiMore.question.questionNumber}
        </p>
        <p>{multiMore.title}</p>
        <ActionButton
          actionType="update"
          editType="editMultiMore"
          data={{ multiMore }}
        />
      </div>

      {multiMore.choices.map((choice) => {
        return (
          <div key={choice.id}>
            <div className="flex items-center space-x-2 px-4 w-full hover:bg-secondary">
              <Checkbox
                checked={choiceIdList.includes(choice.id)}
                onCheckedChange={(checked: boolean) =>
                  handleCheck(checked, choice.id)
                }
                value={choice.id}
                id={choice.id}
              />
              <Label htmlFor={choice.id} className="py-4 w-full cursor-pointer">
                {choice.content}
              </Label>
              <ActionButton
                actionType="update"
                editType="editChoice"
                data={{
                  choiceData: {
                    type: 'MULTI_MORE',
                    multiMoreId: multiMore.id,
                    choice
                  }
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
