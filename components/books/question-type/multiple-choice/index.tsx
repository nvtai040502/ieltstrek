"use client";
import { Button } from "@/components/ui/button";
import { MultipleChoiceExtended } from "@/types/db";
import { MultipleChoiceRender } from "./render";

interface MultipleChoiceArrayRenderProps {
  multipleChoiceArray: MultipleChoiceExtended[];
  handleQuestionSelectAnswer: (questionId: string, value: string) => void;
  currentDivIndex: number
}
export const MultipleChoiceArrayRender = ({
  multipleChoiceArray,
  handleQuestionSelectAnswer,
  currentDivIndex,
}: MultipleChoiceArrayRenderProps) => {
  return (
    <>
      {multipleChoiceArray.map((multipleChoice) => {
        return (
          <MultipleChoiceRender
            handleQuestionSelectAnswer={handleQuestionSelectAnswer}
            multipleChoice={multipleChoice}
            key={multipleChoice.id}
            currentDivIndex={currentDivIndex}
          />
        );
      })}
    </>
  );
};
