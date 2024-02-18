'use client';

import React from 'react';

function App() {
  const dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData('text/plain', target.id);
    setTimeout(() => {
      target.innerHTML = ''; // Clear the content
    }, 0);
  };

  const dragEnd = (e) => {
    const target = e.target;
    target.innerHTML = 'hello'; // Restore the content when dragging ends
  };
  return (
    <div>
      <div
        id="draggable"
        draggable
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        className=" bg-background p-4 border border-black"
      >
        hello
      </div>
      <div>dddddddHello</div>
    </div>
  );
}

export default App;
