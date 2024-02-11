"use client";

import { ExamContext } from "@/global/exam-context";
import { MatchingHeadingExtended } from "@/types/db";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { QuestionType } from "@prisma/client";
import { useContext, useEffect } from "react";
import { ActionButton } from "../../action-button";
import { MatchingSentenceExtended } from "@/types/question-type";
import { cn } from "@/lib/utils";

interface MatchingSentenceRenderProps {
  matchingSentence?: MatchingSentenceExtended | null;
}
export const MatchingSentenceRender = ({
  matchingSentence,
}: MatchingSentenceRenderProps) => {
  // const { listHeading, setListHeading } = useContext(ExamContext);
  useEffect(() => {
    if (matchingSentence) {
      // const firstMatchingHeadingContent =
      //   matchingSentence.matchingHeadingItemArray.map((item) => item.content);
      // setListHeading(firstMatchingHeadingContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // if (!matchingSentence || !listHeading) {
  //   return null;
  // }
  if (!matchingSentence) {
    return null;
  }
  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="font-bold">{matchingSentence.title}</div>
      {matchingSentence.matchingSentenceItems.map((matchingSentenceItem) => (
        <div key={matchingSentenceItem.id} className="flex flex-wrap">
          <p>{matchingSentenceItem.content}</p>
          {matchingSentenceItem.blank && (
            <Droppable
              droppableId={String(
                matchingSentenceItem.blank.question.questionNumber,
              )}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={cn(
                    "",
                    snapshot.isDraggingOver ? "bg-red-500" : "",
                  )}
                  {...provided.droppableProps}
                >
                  <p className="bg-red-500 w-40 p-4"></p>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>
      ))}
      <Droppable droppableId="matching-sentence">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {matchingSentence.matchingSentenceItems.map(
              (matchingSentenceItem) =>
                matchingSentenceItem.blank && (
                  <Draggable
                    draggableId={String(matchingSentenceItem.id)}
                    index={matchingSentenceItem.id}
                    key={matchingSentenceItem.id}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className=" border-4 p-4"
                      >
                        <div {...provided.dragHandleProps}>
                          {matchingSentenceItem.blank!.expectedAnswer}
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
  );
};
