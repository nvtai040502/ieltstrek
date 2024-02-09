"use client";
import { PartExtended } from "@/types/db";
import { ActionButton } from "../action-button";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";

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

          {passage.type === "PASSAGE_MULTI_HEADING" &&
            passage.passageMultiHeadingArray.map((item) => (
              <div key={item.id}>
                {item.questionId ? (
                  <Droppable
                    // isCombineEnabled
                    ignoreContainerClipping={true}
                    droppableId={`passageHeading ${item.id}`}
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
                        {!snapshot.isDraggingOver && (
                          <p className="bg-red-500 w-full p-4"></p>
                        )}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ) : (
                  <h2>{item.title}</h2>
                )}

                <p className=" whitespace-pre-line ">{item.content}</p>
              </div>
            ))}
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
