"use client";

import { NoteCompletionExtended, QuestionGroupExtended } from "@/types/db";
import RichTextReadOnly from "./rich-text-readonly";
import { ActionButton } from "../../action-button";
import { MatchingSentenceExtended } from "@/types/question-type";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { QuestionType } from "@prisma/client";

interface MatchingSentenceRenderProps {
  questionGroup: QuestionGroupExtended;
}
export const MatchingSentenceRender = ({
  questionGroup,
}: MatchingSentenceRenderProps) => {
  const matchingSentence = questionGroup.matchingSentence;
  if (!matchingSentence || !matchingSentence.listMatchingChoices) {
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
        {/* <RichTextReadOnly matchingSentence={matchingSentence} /> */}
        <div className="flex justify-between items-center">
          <p className="font-bold">
            {matchingSentence.listMatchingChoices.title}
          </p>
          <ActionButton
            editType="editListMatchingChoices"
            actionType="update"
            data={{ listMatchingChoices: matchingSentence.listMatchingChoices }}
          />
        </div>
        <Droppable
          type={QuestionType.MATCHING_SENTENCE}
          droppableId="matching-sentence"
          direction="vertical"
          isDropDisabled
        >
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {matchingSentence.listMatchingChoices!.matchingChoices.map(
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
                ),
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
