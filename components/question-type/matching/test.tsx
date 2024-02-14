'use client'

import { DragEvent, useContext, useEffect, useState } from 'react'
import { QuestionType } from '@prisma/client'
import { DndContext } from '@/global/dnd-context'
import { useDnd } from '@/global/use-dnd'
import { QuestionGroupExtended } from '@/types/test-exam'
import { cn } from '@/lib/utils'
import { ActionButton } from '@/components/test-exam/action-button'
import MatchingParagraphRender from './paragraph-render'

export const TestMatchingRender = ({
  questionGroup,
}: {
  questionGroup: QuestionGroupExtended
}) => {
  const matching = questionGroup.matching
  const { handleDragEnd, handleDragStart, handleDragOver } = useDnd()

  if (!matching || !matching.matchingChoiceGroup) {
    return null
  }

  return (
    <>
      <ActionButton
        actionType="update"
        editType="editMatchingSentence"
        data={{ questionGroup }}
      />
      <div onDragEnd={handleDragEnd}>
        <MatchingParagraphRender matching={matching} />
        <div className="flex justify-between items-center">
          <p className="font-bold">{matching.matchingChoiceGroup.title}</p>
          <ActionButton
            editType="editListMatchingChoices"
            actionType="update"
            data={{ listMatchingChoices: matching.matchingChoiceGroup }}
          />
        </div>
        <div onDragOver={handleDragOver} className="flex flex-col gap-4">
          {matching.matchingChoiceGroup.matchingChoiceList.map(
            (matchingChoice) => (
              <div
                key={matchingChoice.id}
                draggable={true}
                onDragStart={() =>
                  handleDragStart(matching.questionGroupId, matchingChoice.id)
                }
                className={cn('bg-red-500 ')}
              >
                {matchingChoice.content}
              </div>
            )
          )}
        </div>
      </div>
    </>
  )
}
