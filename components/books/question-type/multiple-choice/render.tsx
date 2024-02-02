"use client";
import Link from "next/link";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UpdateChoiceForm } from "./choice/choice-update-form";
import { Button } from "@/components/ui/button";
import { UpdateMultipleChoiceForm } from "./update-form";
import { UpdateButton } from "../../update-button";
import { MultipleChoiceExtended } from "@/types/db";
import { cn } from "@/lib/utils";

interface MultipleChoiceRenderProps {
  multipleChoice: MultipleChoiceExtended;
  handleQuestionSelectAnswer: (questionId: string, value: string) => void;
  divRefs: React.RefObject<HTMLDivElement>[];
  currentDivIndex: number;
  // handleMouseDown:() => void
  // handleKeyDown:(event: React.KeyboardEvent<HTMLDivElement>, index: number) => void

}
export const MultipleChoiceRender = ({
  multipleChoice,
  handleQuestionSelectAnswer,
  divRefs,
  currentDivIndex,
  // handleMouseDown,
  // handleKeyDown
}: MultipleChoiceRenderProps) => {
  const [edittingChoices, setEdittingChoices] = useState<{
    [key: string]: boolean;
  }>({});
  const [isEdittingMultipleChoice, setEdittingMultipleChoice] = useState(false);

  if (multipleChoice === undefined || multipleChoice === null) {
    return null;
  }
  return (
    <div>
      <Dialog
        open={isEdittingMultipleChoice}
        onOpenChange={setEdittingMultipleChoice}
      >
        <DialogContent>
          <UpdateMultipleChoiceForm
            multipleChoice={multipleChoice}
            setIsEditting={setEdittingMultipleChoice}
          />
        </DialogContent>
      </Dialog>
      <div
        className="space-y-2"
        ref={divRefs[multipleChoice.questionNumber - 1]}
        tabIndex={0}
        // onKeyDown={(event) => handleKeyDown(event, multipleChoice.questionNumber)}
        // onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 ">
          <p
            className={cn(
              "px-2 py-1",
              currentDivIndex === multipleChoice.questionNumber - 1
                ? "border border-foreground"
                : ""
            )}
          >
            {multipleChoice.questionNumber}
          </p>
          <p>{multipleChoice.title}</p>
          <UpdateButton setIsUpdating={() => setEdittingMultipleChoice(true)} />
        </div>
        <RadioGroup
          onValueChange={(answerSelected) => {
            handleQuestionSelectAnswer(
              String(multipleChoice.id),
              answerSelected
            );
          }}
        >
          {multipleChoice.choices.map((choice) => {
            const isEdittingChoice = edittingChoices[choice.id];
            return (
              <div key={choice.id}>
                <Dialog
                  open={isEdittingChoice}
                  onOpenChange={() =>
                    setEdittingChoices({ [choice.id]: false })
                  }
                >
                  <DialogContent>
                    <UpdateChoiceForm
                      choice={choice}
                      setIsEditting={() =>
                        setEdittingChoices({ [choice.id]: false })
                      }
                    />
                  </DialogContent>
                </Dialog>
                <div
                  className="flex items-center space-x-2 px-4 w-full hover:bg-secondary"
                  key={choice.id}
                >
                  <RadioGroupItem
                    value={choice.content}
                    id={String(choice.id)}
                  />
                  <Label
                    htmlFor={String(choice.id)}
                    className="py-4 w-full cursor-pointer"
                  >
                    {choice.content}
                  </Label>
                  <UpdateButton
                    setIsUpdating={() =>
                      setEdittingChoices({ [choice.id]: true })
                    }
                  />
                </div>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};
