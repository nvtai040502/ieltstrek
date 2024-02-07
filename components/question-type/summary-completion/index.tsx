"use client";
import { Fragment, RefObject, useContext, useState } from "react";
import {
  Dialog,
  DialogContentWithScrollArea,
} from "@/components/ui/dialog";
import { SummaryCompletionExtended } from "@/types/db";
import { UpdateButton } from "../../books/update-button";
import { UpdateSummaryCompletionForm } from "./update-form";
import BlankRender from "../../books/blank-render";

interface SummaryCompletionRenderProps {
  summaryCompletion?: SummaryCompletionExtended | null;
}
export const SummaryCompletionRender = ({
  summaryCompletion,
}: SummaryCompletionRenderProps) => {
  const [isEditingQuestion, setEditingQuestion] = useState(false);
  if (summaryCompletion === undefined || summaryCompletion === null) {
    return null;
  }
  const words = summaryCompletion.paragraphWithBlanks.split(" ");
  let blankCount = 0;
  return (
    <div className="flex flex-wrap">
      <Dialog open={isEditingQuestion} onOpenChange={setEditingQuestion}>
        <DialogContentWithScrollArea>
          <UpdateSummaryCompletionForm
            summaryCompletion={summaryCompletion}
            setIsEditing={setEditingQuestion}
          />
        </DialogContentWithScrollArea>
      </Dialog>
      <div className="flex flex-wrap items-center gap-y-1">
        {words.map((word, index) => (
          <Fragment key={index}>
            {word === "___" ? (
              <BlankRender
                key={index}
                questionNumber={
                  summaryCompletion.summaryCompletionItems[blankCount++].question
                    .questionNumber
                }
              />
            ) : (
              <span>{word}</span>
            )}
            {index < words.length - 1 && <span>&nbsp;</span>}{" "}
            {/* Add space between words */}
          </Fragment>
        ))}
        <UpdateButton setIsUpdating={() => setEditingQuestion(true)} />
      </div>
    </div>
  );
};
