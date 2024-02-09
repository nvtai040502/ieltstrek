"use client";

import { MatchingHeadingExtended } from "@/types/db";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

interface MatchingHeadingRenderProps {
  matchingHeading?: MatchingHeadingExtended | null;
}
export const MatchingHeadingRender = ({
  matchingHeading,
}: MatchingHeadingRenderProps) => {
  if (!matchingHeading) {
    return null;
  }

  return (
    <>
      <Droppable droppableId="matching-heading" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {matchingHeading.matchingHeadingItemArray.map((item) => (
              <Draggable
                draggableId={`item ${item.id}`}
                index={item.id}
                key={item.id}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className=" border-4 p-4"
                  >
                    <div {...provided.dragHandleProps}>{item.content}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};
