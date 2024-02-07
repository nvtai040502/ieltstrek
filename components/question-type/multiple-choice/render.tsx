"use client";
import Link from "next/link";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UpdateChoiceForm } from "./choice/choice-update-form";
import { Button } from "@/components/ui/button";
import { UpdateMultipleChoiceForm } from "./update-form";
import { UpdateButton } from "../../books/update-button";
import { MultipleChoiceExtended } from "@/types/db";
import { cn } from "@/lib/utils";
import { ExamContext } from "@/global/exam-context";

interface MultipleChoiceRenderProps {
  multipleChoice: MultipleChoiceExtended;
}
export const MultipleChoiceRender = ({
  multipleChoice,
}: MultipleChoiceRenderProps) => {
  const {
    questionRefs,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setUserAnswers,
    userAnswers,
  } = useContext(ExamContext);
  
  const [isEditingMultipleChoice, setEditingMultipleChoice] = useState(false);

  if (!multipleChoice) {
    return null;
  }
  const handleAnswerSelected = (answerSelected: string) => {
    setCurrentQuestionIndex(multipleChoice.question.questionNumber - 1);
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [multipleChoice.question.questionNumber]: answerSelected,
    }));
  };
  return (
    <div>
      <Dialog
        open={isEditingMultipleChoice}
        onOpenChange={setEditingMultipleChoice}
      >
        <DialogContent>
          <UpdateMultipleChoiceForm
            multipleChoice={multipleChoice}
            setIsEditting={setEditingMultipleChoice}
          />
        </DialogContent>
      </Dialog>
      <div
        className="space-y-2"
        ref={questionRefs[multipleChoice.question.questionNumber - 1]}
        tabIndex={0}
        // onKeyDown={(event) => handleKeyDown(event, multipleChoice.questionNumber)}
        // onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 ">
          <p
            className={cn(
              "px-2 py-1",
              currentQuestionIndex ===
                multipleChoice.question.questionNumber - 1
                ? "border border-foreground"
                : ""
            )}
          >
            {multipleChoice.question.questionNumber}
          </p>
          <p>{multipleChoice.title}</p>
          {/* <UpdateButton setIsUpdating={() => setEditingMultipleChoice(true)} /> */}
        </div>
        <RadioGroup
          onValueChange={handleAnswerSelected}
          defaultValue={
            userAnswers[multipleChoice.question.questionNumber] || ""
          }
        >
          {multipleChoice.choices.map((choice) => {
           
            return (
              <div key={choice.id}>
                
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
                    type="editChoice"
                    data={{choice}}  
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
