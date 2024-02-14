'use client';

import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';

function App() {
  const [isDropped, setIsDropped] = useState(false);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? <Draggable>Drag me</Draggable> : null}
      <Droppable>
        {isDropped ? <Draggable>Drag me</Draggable> : 'Drop here'}
      </Droppable>
    </DndContext>
  );

  function handleDragEnd(event) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }
}
export default App;

function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable'
  });

  return <div ref={setNodeRef}>{props.children}</div>;
}
function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable'
  });

  return (
    <button ref={setNodeRef} {...listeners}>
      {props.children}
    </button>
  );
}
