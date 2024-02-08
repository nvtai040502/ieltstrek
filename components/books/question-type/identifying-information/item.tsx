"use client";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IdentifyingInformationItemExtended } from "@/types/db";
import { cn } from "@/lib/utils";
import { ExamContext } from "@/global/exam-context";
import { IdentifyingInformationAnswer } from "@prisma/client";
import { useEditHook } from "@/global/use-edit-hook";
import { ActionButton } from "../../action-button";

interface ItemRenderProps {
  item: IdentifyingInformationItemExtended;
}

export const ItemRender = ({ item }: ItemRenderProps) => {
  const {
    questionRefs,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setUserAnswers,
    userAnswers,
  } = useContext(ExamContext);
  const { onOpen } = useEditHook();

  if (!item) {
    return null;
  }

  const handleAnswerSelected = (answerSelected: string) => {
    setCurrentQuestionIndex(item.question.questionNumber - 1);
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [item.question.questionNumber]: answerSelected,
    }));
  };
  return (
    <div
      className="space-y-2"
      ref={questionRefs[item.question.questionNumber - 1]}
      tabIndex={0}
    >
      <div className="flex items-center gap-2 ">
        <p
          className={cn(
            "px-2 py-1",
            currentQuestionIndex === item.question.questionNumber - 1
              ? "border border-foreground"
              : "",
          )}
        >
          {item.question.questionNumber}
        </p>
        <p>{item.title}</p>
        <ActionButton
          actionType="update"
          editType="editIdentifyingInformationItem"
          data={{ identifyingInformationItem: item }}
        />
      </div>

      <RadioGroup
        onValueChange={handleAnswerSelected}
        defaultValue={
          (userAnswers[item.question.questionNumber] as string) || ""
        }
      >
        {[
          IdentifyingInformationAnswer.TRUE,
          IdentifyingInformationAnswer.FALSE,
          IdentifyingInformationAnswer.NOT_GIVEN,
        ].map((answer) => (
          <div
            key={answer}
            className="flex items-center space-x-2 px-4 w-full hover:bg-secondary"
          >
            <RadioGroupItem value={answer} id={`radio-${item.id}-${answer}`} />
            <Label
              htmlFor={`radio-${item.id}-${answer}`}
              className="py-4 w-full cursor-pointer"
            >
              {answer}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
