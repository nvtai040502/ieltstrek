"use client";
import { Button } from "@/components/ui/button";
import { MultipleChoiceExtended } from "@/types/db";
import { MultiOneRender } from "./render";

interface MultipleChoiceArrayRenderProps {
  multipleChoiceArray: MultipleChoiceExtended[];
}
export const MultiOneArrayRender = ({
  multipleChoiceArray,
}: MultipleChoiceArrayRenderProps) => {
  return (
    <>
      {multipleChoiceArray.map((multipleChoice) => {
        return (
          <MultiOneRender
            multipleChoice={multipleChoice}
            key={multipleChoice.id}
          />
        );
      })}
    </>
  );
};
