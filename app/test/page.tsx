"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";

const TestPage = () => {
  const numDivs = 10;
  const divRefs = Array.from({ length: numDivs }, () => React.createRef<HTMLDivElement>());
  const isMouseClickRef = useRef(false);
  const [currentDivIndex, setCurrentDivIndex] = useState(0);

  const handleNextDiv = () => {
    setCurrentDivIndex((prevIndex) => {
      const nextIndex = prevIndex < numDivs - 1 ? prevIndex + 1 : prevIndex;
      divRefs[nextIndex].current?.focus();
      return nextIndex;
    });
  };

  const handlePrevDiv = () => {
    setCurrentDivIndex((prevIndex) => {
      const prevIndexClamped = prevIndex > 0 ? prevIndex - 1 : prevIndex;
      divRefs[prevIndexClamped].current?.focus();
      return prevIndexClamped;
    });
  };

  const handleDivFocus = (index: number) => {
    // Check if the focus change is due to a mouse click
    if (isMouseClickRef.current) {
      // Reset the flag for the next focus change
      isMouseClickRef.current = false;
      return;
    }

    setCurrentDivIndex(index);
  };
  const handleMouseDown = () => {
    // Set the flag to indicate a mouse click
    isMouseClickRef.current = true;
  };
  return (
    <div>
      {divRefs.map((divRef, index) => (
        <div
          key={index}
          ref={divRef}
          tabIndex={0}
          onFocus={() => handleDivFocus(index)} 
          onMouseDown={handleMouseDown}
          className={cn("bg-red-500 p-40", {
            "bg-yellow-500": currentDivIndex === index,
          })}
        >
          {index + 1}
        </div>
      ))}
      <Button onClick={handleNextDiv}>Next Div</Button>
      <Button onClick={handlePrevDiv}>Prev Div</Button>
    </div>
  );
};

export default TestPage;
