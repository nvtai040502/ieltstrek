"use client";
import { PartExtended } from "@/types/db";
import { ActionButton } from "../action-button";
import { Draggable, Droppable } from "@hello-pangea/dnd";

export function PassageDragAndDropRender({ part }: { part: PartExtended }) {
  const passage = part.passage;
  return (
    <div>
      {passage ? (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div>
              <p className=" font-bold"> {passage.title} </p>
              <p className=" italic font-light">{passage.description}</p>
            </div>
            <ActionButton
              actionType="update"
              editType="editPassage"
              data={{ passage }}
            />
          </div>
          {passage.type === "PASSAGE_SIMPLE" && (
            <p className="whitespace-pre-line"> {passage.content} </p>
          )}

          {passage.type === "PASSAGE_MULTI_HEADING" && (
            <Droppable droppableId="passage-heading" direction="vertical">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {passage.passageMultiHeadingArray.map((item) => (
                    <Draggable
                      draggableId={`passageHeading ${item.id}`}
                      index={item.id}
                      key={item.id}
                    >
                      {(provided) => (
                        <div>
                          <div
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            className=" border-4 p-4"
                          >
                            <div {...provided.dragHandleProps}>
                              {item.title}
                            </div>
                          </div>
                          <p className=" whitespace-pre-line ">
                            {item.content}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>
      ) : (
        <>
          <ActionButton
            actionType="create"
            editType="createPassage"
            data={{ part }}
          />
        </>
      )}
    </div>
  );
}
