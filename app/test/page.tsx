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
      if (prevIndex < divRefs.length - 1) {
        divRefs[prevIndex + 1].current?.focus();
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };

  const handlePrevDiv = () => {
    setCurrentDivIndex((prevIndex) => {
      if (prevIndex > 0) {
        divRefs[prevIndex - 1].current?.focus();
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  const handleDivFocus = (index: number) => {
    // Reset the flag for the next focus change
    isMouseClickRef.current = false;
    if (index <= divRefs.length - 1){
      setCurrentDivIndex(index);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    // Check if the Tab key is pressed
    if (event.key === 'Tab') {
      handleDivFocus(index);
    }
  };

  const handleMouseDown = () => {
    isMouseClickRef.current = true;
  };

  return (
    <div>
      {divRefs.map((divRef, index) => (
        <div
          key={index}
          ref={divRef}
          tabIndex={0}
          onKeyDown={(event) => handleKeyDown(event, index+1)}
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