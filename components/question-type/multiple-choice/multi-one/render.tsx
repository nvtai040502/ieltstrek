'use client'

import { useContext, useState } from 'react'
import { ExamContext } from '@/global/exam-context'
import { MultiOneExtended } from '@/types/test-exam'
import { cn } from '@/lib/utils'
import { ActionButton } from '@/components/test-exam/action-button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export const MultiOneRender = ({
  multiOne,
}: {
  multiOne: MultiOneExtended
}) => {
  const {
    questionRefs,
    currentRef: currentQuestionIndex,
    setCurrentRef: setCurrentQuestionIndex,
    setUserAnswers,
    userAnswers,
  } = useContext(ExamContext)

  if (!multiOne) {
    return null
  }
  const handleAnswerSelected = (answerSelected: string) => {
    setCurrentQuestionIndex(multiOne.question.questionNumber - 1)
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [multiOne.question.questionNumber]: answerSelected,
    }))
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
            currentQuestionIndex === multiOne.question.questionNumber - 1
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
        onValueChange={handleAnswerSelected}
        defaultValue={
          (userAnswers[multiOne.question.questionNumber] as string) || ''
        }
      >
        {multiOne.choices.map((choice) => {
          return (
            <div key={choice.id}>
              <div
                className="flex items-center space-x-2 px-4 w-full hover:bg-secondary"
                key={choice.id}
              >
                <RadioGroupItem value={choice.content} id={String(choice.id)} />
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
          )
        })}
      </RadioGroup>
    </div>
  )
}
