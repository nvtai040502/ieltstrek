"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useRef, useState } from "react";
const TestPage = () => {
  const numDivs = 20;
  const divRefs = Array.from({ length: numDivs }, () =>
    React.createRef<HTMLDivElement>()
  );
  const isMouseClickRef = useRef(false);
  const [currentDivIndex, setCurrentDivIndex] = useState(0);
  const hasPrevDiv = (index: number) => {
    return index > 0;
  };
  const hasNextDiv = (index: number) => {
    return index < divRefs.length - 1;
  };
  const handleNextDiv = () => {
    setCurrentDivIndex((prevIndex) => {
      if (hasNextDiv(prevIndex)) {
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
    if (index <= divRefs.length - 1) {
      setCurrentDivIndex(index);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    // Check if the Tab key is pressed
    if (event.key === "Tab") {
      handleDivFocus(index);
    }
  };

  const handleMouseDown = () => {
    isMouseClickRef.current = true;
  };

  return (
    <div>
      <ScrollArea className="h-[600px] rounded-md border">
        {divRefs.map((divRef, index) => (
          <div
            key={index}
            ref={divRef}
            tabIndex={0}
            // onKeyDown={(event) => handleKeyDown(event, index + 1)}
            // onMouseDown={handleMouseDown}
            className={cn("bg-red-500 p-40", {
              "bg-yellow-500": currentDivIndex === index,
            })}
          >
            {index + 1}
          </div>
        ))}
      </ScrollArea>

      <div className="fixed inset-0 h-20">
      <Button
        onClick={handlePrevDiv}
        disabled={!hasPrevDiv(currentDivIndex)}
        size="xl"
      >
        <ArrowLeft />
      </Button>
      <Button
        onClick={handleNextDiv}
        disabled={!hasNextDiv(currentDivIndex)}
        size="xl"
      >
        <ArrowRight />
      </Button>  
      </div>
      <div className="flex items-center">
        {Array.from({ length: divRefs.length }).map((_, i) => {
          return (
            <div key={i} className="">
              <p
                className={cn(
                  "p-4",
                  currentDivIndex === i
                    ? "border border-secondary-foreground"
                    : ""
                )}
              >
                {i + 1}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestPage;
