'use client';

import MatchingSentenceParagraphRender from './paragraph-render';
import { ActionButton } from '@/components/test-exam/action-button';
import { QuestionGroupExtended } from '@/types/test-exam';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { QuestionType } from '@prisma/client';

export const MatchingRender = ({
  questionGroup
}: {
  questionGroup: QuestionGroupExtended;
}) => {
  const matching = questionGroup.matching;
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
      <DragDropContext onDragEnd={() => {}}>
        <MatchingSentenceParagraphRender matchingSentence={matching} />
        <div className="flex justify-between items-center">
          <p className="font-bold">{matching.matchingChoiceGroup.title}</p>
          <ActionButton
            editType="editListMatchingChoices"
            actionType="update"
            data={{ listMatchingChoices: matching.matchingChoiceGroup }}
          />
        </div>
        <Droppable
          type={QuestionType.MATCHING}
          droppableId="matching-sentence"
          direction="vertical"
          isDropDisabled
        >
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {matching.matchingChoiceGroup.matchingChoiceList.map(
                (matchingChoice, i) => (
                  <Draggable
                    draggableId={String(matchingChoice.id)}
                    index={i}
                    key={i}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className=" border-4 p-4"
                      >
                        <div {...provided.dragHandleProps}>
                          {matchingChoice.content}
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
