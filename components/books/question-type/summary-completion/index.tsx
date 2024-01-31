"use client"
import Link from "next/link";

import { MultipleChoiceExtended, QuestionExtended } from "@/types/db";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UpdateButton } from "../../update-button";
import { UpdateSummaryCompletionForm } from "./update-form";

interface SummaryCompletionRenderProps {
  question: QuestionExtended
};
export const SummaryCompletionRender = ({
  question
}: SummaryCompletionRenderProps) => {
  const [isEdittingQuestion, setEdittingQuestion] = useState(false)
  if (question.summaryCompletion === undefined || question.summaryCompletion === null) {
    return null
  }
  return (
    <div>
      <Dialog open={isEdittingQuestion} onOpenChange={setEdittingQuestion}>
        <DialogContent>
          <UpdateSummaryCompletionForm summaryCompletion={question.summaryCompletion} setIsEditting={setEdittingQuestion} />
        </DialogContent>
      </Dialog>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <p>{question.questionNumber}</p>
          <p>{question.summaryCompletion.sentence}</p>
          <UpdateButton setIsUpdating={() => setEdittingQuestion(true)}/>

        </div>
      </div>
    </div>
    
  );
};