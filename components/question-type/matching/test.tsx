'use client';

import { DragEvent } from 'react';
import MatchingParagraphRender from './paragraph-render';
import { ActionButton } from '@/components/test-exam/action-button';
import { QuestionGroupExtended } from '@/types/test-exam';
import { QuestionType } from '@prisma/client';

export const TestMatchingRender = ({
  questionGroup
}: {
  questionGroup: QuestionGroupExtended;
}) => {
  const matching = questionGroup.matching;
  if (!matching || !matching.matchingChoiceGroup) {
    return null;
  }

  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    matchingChoiceId: string
  ) => {
    event.dataTransfer?.setData('text/plain', matchingChoiceId);
  };
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };
  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    const matchingChoiceId = event.dataTransfer?.getData('text/plain');
    const sourceMatchingChoice =
      matching.matchingChoiceGroup.matchingChoiceList.find(
        (choice) => choice.id === matchingChoiceId
      );
    console.log('Destination:', event.target);
  };
  return (
    <>
      <ActionButton
        actionType="update"
        editType="editMatchingSentence"
        data={{ questionGroup }}
      />
      <div onDragEnd={() => {}}>
        <MatchingParagraphRender matching={matching} />
        <div className="flex justify-between items-center">
          <p className="font-bold">{matching.matchingChoiceGroup.title}</p>
          <ActionButton
            editType="editListMatchingChoices"
            actionType="update"
            data={{ listMatchingChoices: matching.matchingChoiceGroup }}
          />
        </div>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="flex flex-col gap-4"
        >
          {matching.matchingChoiceGroup.matchingChoiceList.map(
            (matchingChoice) => (
              <div
                key={matchingChoice.id}
                draggable={true}
                onDragStart={(event) =>
                  handleDragStart(event, matchingChoice.id)
                }
                className="bg-red-500"
              >
                {matchingChoice.content}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};
