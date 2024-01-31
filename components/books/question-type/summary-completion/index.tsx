"use client";
import Link from "next/link";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Fragment, useState } from "react";
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
}
export const SummaryCompletionRender = ({
  summaryCompletion,
}: SummaryCompletionRenderProps) => {
  const [isEdittingQuestion, setEdittingQuestion] = useState(false);
  if (summaryCompletion === undefined || summaryCompletion === null) {
    return null;
  }
  const words = summaryCompletion.paragraphWithBlanks.split(" ");
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
              <InputGap placeholder="Enter a word" />
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
