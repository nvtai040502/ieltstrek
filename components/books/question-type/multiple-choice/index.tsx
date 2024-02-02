"use client";
import { Button } from "@/components/ui/button";
import { MultipleChoiceExtended } from "@/types/db";
import { MultipleChoiceRender } from "./render";

interface MultipleChoiceArrayRenderProps {
  multipleChoiceArray: MultipleChoiceExtended[];
  handleQuestionSelectAnswer: (questionId: string, value: string) => void;
  divRefs: React.RefObject<HTMLDivElement>[]
  currentDivIndex: number
  // handleMouseDown:() => void
  // handleKeyDown:(event: React.KeyboardEvent<HTMLDivElement>, index: number) => void
}
export const MultipleChoiceArrayRender = ({
  multipleChoiceArray,
  handleQuestionSelectAnswer,
  divRefs,
  currentDivIndex,
  // handleMouseDown,
  // handleKeyDown
}: MultipleChoiceArrayRenderProps) => {
  return (
    <>
      {multipleChoiceArray.map((multipleChoice) => {
        return (
          <MultipleChoiceRender
            handleQuestionSelectAnswer={handleQuestionSelectAnswer}
            multipleChoice={multipleChoice}
            key={multipleChoice.id}
            divRefs={divRefs}
            currentDivIndex={currentDivIndex}
            // handleMouseDown={handleMouseDown}
            // handleKeyDown={handleKeyDown}
          />
        );
      })}
    </>
  );
};
