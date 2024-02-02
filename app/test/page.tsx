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

  const hasPrevDiv = (index: number) => index > 0;
  const hasNextDiv = (index: number) => index < divRefs.length - 1;

  const handleNextDiv = () =>
    setCurrentDivIndex((prevIndex) =>
      hasNextDiv(prevIndex) ? prevIndex + 1 : prevIndex
    );
  const handlePrevDiv = () =>
    setCurrentDivIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );

  const handleDivFocus = (index: number) => {
    isMouseClickRef.current = false;
    if (index <= divRefs.length - 1) setCurrentDivIndex(index);
  };

  const handleMoveToDiv = (index: number) => {
    divRefs[index].current?.focus();
    setCurrentDivIndex(index);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (event.key === "Tab") handleDivFocus(index);
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
        {Array.from({ length: divRefs.length }).map((_, i) => (
          <div
            key={i}
            role="button"
            className="hover:border hover:border-secondary-foreground"
            onClick={() => handleMoveToDiv(i)}
          >
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
        ))}
      </div>
    </div>
  );
};

export default TestPage;
