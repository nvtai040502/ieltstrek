import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MultipleChoiceExtended } from "@/types/db";

interface MultipleChoiceRenderProps {
  multipleChoice: MultipleChoiceExtended
};

export const MultipleChoiceRender = ({
  multipleChoice
}: MultipleChoiceRenderProps) => {
  return (
    multipleChoice.choices.map((choice) => (
      <div key={choice.id}>
        {choice.content}
      </div>
    ))
  );
};