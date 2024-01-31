"use client"
import { Button } from "@/components/ui/button";
import { MultipleChoiceExtended } from "@/types/db";
import { MultipleChoiceRender } from "./render";

interface MultipleChoiceArrayRenderProps {
  multipleChoiceArray: MultipleChoiceExtended[]
};
export const MultipleChoiceArrayRender = ({
  multipleChoiceArray
}: MultipleChoiceArrayRenderProps) => {
  return(
    <>
    {multipleChoiceArray.map((multipleChoice) => {
      return (
        <MultipleChoiceRender multipleChoice={multipleChoice} key={multipleChoice.id}/>
      )
    })}
    </>
  )
};