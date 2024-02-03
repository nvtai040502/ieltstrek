"use client";
import Link from "next/link";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Fragment, RefObject, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentWithScrollArea,
} from "@/components/ui/dialog";
import { SummaryCompletionExtended } from "@/types/db";
import { Input, InputGap } from "@/components/ui/input";
import { UpdateButton } from "../../update-button";
import { UpdateSummaryCompletionForm } from "./update-form";
import { ExamContext } from "@/global/exam-context";

interface SummaryCompletionRenderProps {
  summaryCompletion?: SummaryCompletionExtended | null;
}
export const SummaryCompletionRender = ({
  summaryCompletion,
}: SummaryCompletionRenderProps) => {
  const { questionRefs, setUserAnswers, userAnswers, setCurrentQuestionIndex } =
    useContext(ExamContext);
  const [isEdittingQuestion, setEdittingQuestion] = useState(false);
  if (summaryCompletion === undefined || summaryCompletion === null) {
    return null;
  }
  const words = summaryCompletion.paragraphWithBlanks.split(" ");
  let count = 0;
  return (
    <div className="flex flex-wrap">
      <Dialog open={isEdittingQuestion} onOpenChange={setEdittingQuestion}>
        <DialogContentWithScrollArea>
          <UpdateSummaryCompletionForm
            summaryCompletion={summaryCompletion}
            setIsEditting={setEdittingQuestion}
          />
        </DialogContentWithScrollArea>
      </Dialog>
      <div className="flex flex-wrap items-center gap-y-1">
        {words.map((word, index) => (
          <Fragment key={index}>
            {word === "___" ? (
              (() => {
                const questionNumber =
                  summaryCompletion.summaryCompletionItems[count].question
                    .questionNumber;
                count += 1;
                return (
                  <>
                    <InputGap
                      key={index}
                      onFocus={() => {
                        setCurrentQuestionIndex(questionNumber - 1);
                      }}
                      defaultValue={userAnswers[questionNumber] || ""}
                      placeholder="Enter a word"
                      onChange={(event) => {
                        setUserAnswers((prevAnswers) => ({
                          ...prevAnswers,
                          [questionNumber]: event.target.value,
                        }));
                      }}
                      ref={
                        questionRefs[
                          questionNumber - 1
                        ] as RefObject<HTMLInputElement>
                      }
                    />
                  </>
                );
              })()
            ) : (
              <span>{word}</span>
            )}
            {index < words.length - 1 && <span>&nbsp;</span>}{" "}
            {/* Add space between words */}
          </Fragment>
        ))}
        <UpdateButton setIsUpdating={() => setEdittingQuestion(true)} />
      </div>
    </div>
  );
};
