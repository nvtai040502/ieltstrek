"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { MultiMoreExtended, MultiOneExtended } from "@/types/db";
import { cn } from "@/lib/utils";
import { ExamContext } from "@/global/exam-context";
import { UpdateButton } from "../../update-button";
import { Checkbox } from "@/components/ui/checkbox";

interface MultiMoreRenderProps {
  multiMore: MultiMoreExtended;
}
export const MultiMoreRender = ({ multiMore }: MultiMoreRenderProps) => {
  const {
    questionRefs,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setUserAnswers,
    userAnswers,
  } = useContext(ExamContext);

  if (!multiMore) {
    return null;
  }
  const handleAnswerSelected = (answerSelected: string) => {
    setCurrentQuestionIndex(multiMore.question.questionNumber - 1);
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [multiMore.question.questionNumber]: answerSelected,
    }));
  };
  return (
    <div
      className="space-y-2"
      ref={questionRefs[multiMore.question.questionNumber - 1]}
      tabIndex={0}
    >
      <div className="flex items-center gap-2 ">
        <p
          className={cn(
            "px-2 py-1",
            currentQuestionIndex === multiMore.question.questionNumber - 1
              ? "border border-foreground"
              : "",
          )}
        >
          {multiMore.question.questionNumber}
        </p>
        <p>{multiMore.title}</p>
        <UpdateButton type="editMultiMore" data={{ multiMore }} />
      </div>

      {multiMore.choices.map((choice) => {
        return (
          <div key={choice.id}>
            <div className="flex items-center space-x-2 px-4 w-full hover:bg-secondary">
              <Checkbox value={choice.content} id={String(choice.id)} />
              <Label
                htmlFor={String(choice.id)}
                className="py-4 w-full cursor-pointer"
              >
                {choice.content}
              </Label>
              <UpdateButton type="editChoice" data={{ choice }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
