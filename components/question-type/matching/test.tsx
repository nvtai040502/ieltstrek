'use client';

import { DragEvent, useEffect, useState } from 'react';
import MatchingParagraphRender from './paragraph-render';
import { ActionButton } from '@/components/test-exam/action-button';
import { cn } from '@/lib/utils';
import { QuestionGroupExtended } from '@/types/test-exam';
import { QuestionType } from '@prisma/client';

export const TestMatchingRender = ({
  questionGroup
}: {
  questionGroup: QuestionGroupExtended;
}) => {
  const matching = questionGroup.matching;
  const [content, setContent] = useState<string[]>([]);

  useEffect(() => {
    if (matching && matching.matchingChoiceGroup) {
      setContent(
        matching.matchingChoiceGroup.matchingChoiceList.map(
          (item) => item.content
        )
      );
    }
  }, [matching]);

  if (!matching || !matching.matchingChoiceGroup) {
    return null;
  }

  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    content: string
  ) => {
    event.dataTransfer?.setData('text/plain', JSON.stringify({ content }));
  };
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    console.log('drag over');
  };

  const handleDragEnd = () => {};

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
            (matchingChoice, i) => (
              <div
                key={matchingChoice.id}
                draggable={true}
                onDragStart={(event) =>
                  handleDragStart(event, matchingChoice.content)
                }
                className={cn('bg-red-500 ', content[i] ? '' : 'p-4')}
              >
                {content[i]}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};
