"use client";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const TestPage = () => {
  const specificHeadings = ["1", "2", "3"];
  const passageHeadings = ["heloo", "dddas"];

  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="matching-heading" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex bg-red-500"
          >
            {specificHeadings.map((heading: string, i) => (
              <Draggable draggableId={`heading ${i}`} index={i} key={i}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className=" border-4 p-4"
                  >
                    <div className="">
                      <div {...provided.dragHandleProps} className="">
                        {heading}
                      </div>
                    </div>
                    <Droppable
                      droppableId={`heading ${i}`}
                      type="card"
                      direction="horizontal"
                    >
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="grid lg:grid-cols-4 grid-cols-2 sm:grid-cols-3 gap-4"
                        >
                          {passageHeadings.map((menuItem, index) => (
                            <Draggable
                              draggableId={`headings ${index}`}
                              index={index}
                              key={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  role="button"
                                  className="group hover:bg-slate-200/90 dark:hover:bg-slate-600 hover:shadow-sm transition overflow-hidden border rounded-lg p-4 flex flex-col gap-4"
                                >
                                  <div className="">{menuItem}</div>
                                </div>
                              )}
                            </Draggable>
                          ))}

                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TestPage;
