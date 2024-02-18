'use client';

import { useContext, useEffect } from 'react';
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
  const {
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop
  } = useDnd();

  useEffect(() => {
    if (matching) {
      setMatchingChoiceList(matching.matchingChoiceList);
    }
  }, [matching, setMatchingChoiceList]);
  if (!matching) {
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
          <p className="font-bold">{matching.titleForQuestion}</p>
          <ActionButton
            editType="editMatchingChoiceList"
            actionType="update"
            data={{ questionGroup }}
          />
        </div>
        <div
          onDragOver={(event) => handleDragOver({ event, type: 'groupChoice' })}
          onDragLeave={handleDragLeave}
          onDrop={(event) =>
            handleDrop({
              event,
              type: 'groupChoice'
            })
          }
          className={cn(
            'flex flex-col gap-4',
            choiceGroupOver ? 'bg-secondary' : ''
          )}
        >
          {matchingChoiceList.map((matchingChoice) => (
            <div
              key={matchingChoice.id}
              draggable
              onDragStart={() =>
                handleDragStart(matching.questionGroupId, matchingChoice.id)
              }
              className={cn(
                ' bg-background border-2',
                matchingChoice.content ? '' : 'p-4 border-secondary'
              )}
            >
              {matchingChoice.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
