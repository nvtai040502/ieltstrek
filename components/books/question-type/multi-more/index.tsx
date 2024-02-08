"use client";
import { Button } from "@/components/ui/button";
import { MultipleChoiceExtended } from "@/types/db";
import { MultiMoreAnswersRender } from "./render";

interface MultipleChoiceArrayRenderProps {
  multipleChoiceArray: MultipleChoiceExtended[];
}
export const MultiMoreArrayRender = ({
  multipleChoiceArray,
}: MultipleChoiceArrayRenderProps) => {
  console.log(multipleChoiceArray[0].expectedAnswers);
  return (
    <>
      {multipleChoiceArray.map((multipleChoice) => {
        return (
          <MultiMoreAnswersRender
            multipleChoice={multipleChoice}
            key={multipleChoice.id}
          />
        );
      })}
    </>
  );
};
