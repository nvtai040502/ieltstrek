"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { MultiOneExtended } from "@/types/db";
import { cn } from "@/lib/utils";
import { ExamContext } from "@/global/exam-context";
import { UpdateButton } from "@/components/books/update-button";

interface MultipleChoiceRenderProps {
  multiOne: MultiOneExtended;
}
export const MultiOneRender = ({ multiOne }: MultipleChoiceRenderProps) => {
  const {
    questionRefs,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setUserAnswers,
    userAnswers,
  } = useContext(ExamContext);

  if (!multiOne) {
    return null;
  }
  const handleAnswerSelected = (answerSelected: string) => {
    setCurrentQuestionIndex(multiOne.question.questionNumber - 1);
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [multiOne.question.questionNumber]: answerSelected,
    }));
  };
  return (
    <div
      className="space-y-2"
      ref={questionRefs[multiOne.question.questionNumber - 1]}
      tabIndex={0}
    >
      <div className="flex items-center gap-2 ">
        <p
          className={cn(
            "px-2 py-1",
            currentQuestionIndex === multiOne.question.questionNumber - 1
              ? "border border-foreground"
              : "",
          )}
        >
          {multiOne.question.questionNumber}
        </p>
        <p>{multiOne.title}</p>
        <UpdateButton type="editMultiOne" data={{ multiOne }} />
      </div>
      <RadioGroup
        onValueChange={handleAnswerSelected}
        defaultValue={
          (userAnswers[multiOne.question.questionNumber] as string) || ""
        }
      >
        {multiOne.choices.map((choice) => {
          return (
            <div key={choice.id}>
              <div
                className="flex items-center space-x-2 px-4 w-full hover:bg-secondary"
                key={choice.id}
              >
                <RadioGroupItem value={choice.content} id={String(choice.id)} />
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
      </RadioGroup>
    </div>
  );
};
