"use client";
import Link from "next/link";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Fragment, RefObject, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentWithScrollArea,
} from "@/components/ui/dialog";
import { SummaryCompletionExtended } from "@/types/db";
import { Input, InputGap } from "@/components/ui/input";
import { UpdateButton } from "../../update-button";
import { UpdateSummaryCompletionForm } from "./update-form";

interface SummaryCompletionRenderProps {
  summaryCompletion?: SummaryCompletionExtended | null;
  divRefs: React.RefObject<HTMLDivElement>[];
  currentDivIndex: number;
}
export const SummaryCompletionRender = ({
  summaryCompletion,
  divRefs,
  currentDivIndex,
}: SummaryCompletionRenderProps) => {
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
                summaryCompletion.summaryCompletionItems[count]
                .questionNumber - 1;
                count += 1;
                return (
                  <>
                    {questionNumber}, {count}
                    <InputGap
                      key={index}
                      placeholder="Enter a word"
                      ref={divRefs[questionNumber] as RefObject<HTMLInputElement>}
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
