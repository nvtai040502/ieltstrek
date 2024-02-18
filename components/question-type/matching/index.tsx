'use client';

import { DragEvent, useContext, useEffect, useState } from 'react';
import { QuestionType } from '@prisma/client';
import { DndContext } from '@/global/dnd-context';
import { useDnd } from '@/global/use-dnd';
import { QuestionGroupExtended } from '@/types/test-exam';
import { cn } from '@/lib/utils';
import { ActionButton } from '@/components/test-exam/action-button';
import MatchingParagraphRender from './paragraph-render';

export const MatchingRender = ({
  questionGroup
}: {
  questionGroup: QuestionGroupExtended;
}) => {
  const matching = questionGroup.matching;
  const { setMatchingChoiceList, matchingChoiceList, choiceGroupOver } =
    useContext(DndContext);
  const { handleDragEnd, handleDragStart, handleDragOver, handleDragLeave } =
    useDnd();

  useEffect(() => {
    if (matching && matching.matchingChoiceGroup) {
      setMatchingChoiceList(matching.matchingChoiceGroup.matchingChoiceList);
    }
  }, [matching, setMatchingChoiceList]);
  if (!matching || !matching.matchingChoiceGroup) {
    return null;
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
          {/* <ActionButton
            editType="editListMatchingChoices"
            actionType="update"
            data={{ listMatchingChoices: matching.matchingChoiceGroup }}
          /> */}
        </div>
        <div
          onDragOver={(event) => handleDragOver({ event, type: 'groupChoice' })}
          onDragLeave={handleDragLeave}
          className={cn(
            'flex flex-col gap-4',
            choiceGroupOver ? 'bg-secondary' : ''
          )}
        >
          {matchingChoiceList.map((matchingChoice) => (
            <div
              key={matchingChoice.id}
              draggable={true}
              onDragStart={(event) =>
                handleDragStart(
                  matching.questionGroupId,
                  matchingChoice.id,
                  event
                )
              }
              className={cn('border-2', matchingChoice.content ? '' : 'p-4')}
            >
              {matchingChoice.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
