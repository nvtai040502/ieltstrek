'use client';

import { useContext, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { QuestionType } from '@prisma/client';
import { ExamContext } from '@/global/exam-context';

interface MatchingHeadingRenderProps {
  // matchingHeading?: MatchingHeadingExtended | null;
}
export const MatchingHeadingRender = (
  {
    // matchingHeading,
  }: MatchingHeadingRenderProps
) => {
  // const { listHeading, setListHeading } = useContext(ExamContext);
  // useEffect(() => {
  //   if (matchingHeading) {
  //     const firstMatchingHeadingContent =
  //       matchingHeading.matchingHeadingItemArray.map((item) => item.content);
  //     setListHeading(firstMatchingHeadingContent);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // if (!matchingHeading || !listHeading) {
  //   return null;
  // }

  return (
    <>
      {/* <div className="flex justify-between items-center">
        <p className="font-bold">{matchingHeading.title}</p>
        <ActionButton
          editType="editMatchingHeading"
          actionType="update"
          data={{ matchingHeading }}
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
