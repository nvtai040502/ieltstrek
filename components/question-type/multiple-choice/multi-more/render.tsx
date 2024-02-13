'use client';

import { useContext, useState } from 'react';
import { ActionButton } from '@/components/test-exam/action-button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ExamContext } from '@/global/exam-context';
import { cn } from '@/lib/utils';
import { MultiMoreExtended } from '@/types/test-exam';
import { Choice } from '@prisma/client';

export const MultiMoreRender = ({
  multiMore
}: {
  multiMore: MultiMoreExtended;
}) => {
  const {
    questionRefs,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setUserAnswers,
    userAnswers
  } = useContext(ExamContext);

  if (!multiMore) {
    return null;
  }
  const handleAnswerSelected = ({
    checked,
    choice
  }: {
    checked: boolean;
    choice: Choice;
  }) => {
    setCurrentQuestionIndex(multiMore.question.questionNumber - 1);
    setUserAnswers((prevAnswers) => {
      const prevContent = prevAnswers[multiMore.question.questionNumber] || [];
      const updatedAnswers = Array.isArray(prevContent)
        ? prevContent // Use prevContent directly if it's already an array
        : [prevContent]; // Otherwise, convert prevContent to an array

      const newAnswers = checked
        ? [...updatedAnswers, choice.content]
        : updatedAnswers.filter((value) => value !== choice.content);

      return {
        ...prevAnswers,
        [multiMore.question.questionNumber]: newAnswers
      };
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
            currentQuestionIndex === multiMore.question.questionNumber - 1
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
                defaultChecked={
                  userAnswers[multiMore.question.questionNumber]
                    ? userAnswers[multiMore.question.questionNumber].includes(
                        choice.content
                      )
                    : false
                }
                onCheckedChange={(checked: boolean) =>
                  handleAnswerSelected({ checked, choice })
                }
                value={choice.content}
                id={String(choice.id)}
              />
              <Label
                htmlFor={String(choice.id)}
                className="py-4 w-full cursor-pointer"
              >
                {choice.content}
              </Label>
              <ActionButton
                actionType="update"
                editType="editChoice"
                data={{ choice }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
