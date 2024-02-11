"use client";

import { ExamContext } from "@/global/exam-context";
import { MatchingHeadingExtended } from "@/types/db";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { QuestionType } from "@prisma/client";
import { useContext, useEffect } from "react";
import { ActionButton } from "../../action-button";
import { MatchingSentenceExtended } from "@/types/question-type";

interface MatchingSentenceRenderProps {
  matchingSentence?: MatchingSentenceExtended | null;
}
export const MatchingSentenceRender = ({
  matchingSentence,
}: MatchingSentenceRenderProps) => {
  // const { listHeading, setListHeading } = useContext(ExamContext);
  useEffect(() => {
    if (matchingSentence) {
      console.log("🚀 ~ useEffect ~ matchingSentence:", matchingSentence);
      // const firstMatchingHeadingContent =
      //   matchingSentence.matchingHeadingItemArray.map((item) => item.content);
      // setListHeading(firstMatchingHeadingContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // if (!matchingSentence || !listHeading) {
  //   return null;
  // }
  return (
    <>
      {/* <div className="flex justify-between items-center">
        <p className="font-bold">{matchingSentence.title}</p>
        <ActionButton
          editType="editMatchingHeading"
          actionType="update"
          data={{ matchingHeading: matchingSentence }}
        />
      </div>
      <Droppable
        type={QuestionType.MATCHING_HEADING}
        droppableId="matching-heading"
        direction="vertical"
        isDropDisabled
      >
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {listHeading.map((content, i) => (
              <Draggable draggableId={`item ${i}`} index={i} key={i}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className=" border-4 p-4"
                  >
                    <div {...provided.dragHandleProps}>{content}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable> */}
    </>
  );
};
