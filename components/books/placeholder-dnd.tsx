import { Draggable, Droppable } from "@hello-pangea/dnd";
import { QuestionType } from "@prisma/client";

function PlaceHolderDragAndDrop({
  questionNumber,
}: {
  questionNumber: number;
}) {
  return (
    <>
      <Droppable
        type={QuestionType.MATCHING_SENTENCE}
        // ignoreContainerClipping={true}
        droppableId={String(questionNumber)}
      >
        {(provided, snapshot) => (
          <span
            ref={
              // questionRefs[item.question!.questionNumber - 1] &&
              provided.innerRef
            }
            {...provided.droppableProps}
            className="border border-secondary-foreground w-full p-4 block"
          >
            {/* <p></p> */}

            {provided.placeholder}
          </span>
        )}
      </Droppable>
    </>
  );
}

export default PlaceHolderDragAndDrop;
