"use client";
import { Button } from "@/components/ui/button";
import { MultipleChoiceExtended } from "@/types/db";

interface MultipleChoiceArrayRenderProps {
  multipleChoiceArray: MultipleChoiceExtended[];
}
export const MultiMoreAnswersRender = ({
  multipleChoiceArray,
}: MultipleChoiceArrayRenderProps) => {
  console.log(multipleChoiceArray[0].expectedAnswers);
  return (
    <>
      {/* {multipleChoiceArray.map((multipleChoice) => {
        return (
          <MultipleChoiceRender
            multipleChoice={multipleChoice}
            key={multipleChoice.id}
          />
        );
      })} */}
    </>
  );
};
