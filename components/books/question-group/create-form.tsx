"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { QuestionGroupSchema } from "@/lib/validations/books";
import { createQuestionGroup } from "@/actions/books/question-group";
import { QuestionGroupForm } from "./form";
import { createQuestions } from "@/actions/books/question";
import { createMultipleChoiceArray } from "@/actions/books/multiple-choice";
import { QuestionType } from "@prisma/client";
import { createSummaryCompletion } from "@/actions/books/summary-completion";
import { PartExtended } from "@/types/db";
import { error } from "console";

export function CreateQuestionGroupForm({
  part,
  setIsCreating,
}: {
  part: PartExtended;
  setIsCreating: (isCreating: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof QuestionGroupSchema>>({
    resolver: zodResolver(QuestionGroupSchema),
    defaultValues: {
      type: "MULTIPLE_CHOICE",
    },
  });
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof QuestionGroupSchema>) => {
    startTransition(async () => {
      const { questionGroup, success, error } = await createQuestionGroup({
        title: values.title,
        description: values.description,
        type: values.type,
        startQuestionNumber: values.startQuestionNumber,
        endQuestionNumber: values.endQuestionNumber,
        partId: part.id,
        assessmentId: part.assessmentId,
      });

      if (success && questionGroup) {
        let successfully = false;

        if (questionGroup.type === "MULTIPLE_CHOICE") {
          successfully = await createMultipleChoiceArray({
            questionGroupId: questionGroup.id,
            startQuestionNumber: questionGroup.startQuestionNumber,
            endQuestionNumber: questionGroup.endQuestionNumber,
            assessmentId: part.assessmentId,
          });
        } else if (questionGroup.type === "SUMMARY_COMPLETION") {
          successfully = await createSummaryCompletion({
            questionGroupId: questionGroup.id,
            startQuestionNumber: questionGroup.startQuestionNumber,
            endQuestionNumber: questionGroup.endQuestionNumber,
          });
        }

        if (successfully) {
          form.reset();
          router.refresh();
          toast.success(success);
        }
      } else {
        toast.error(error);
      }
      setIsCreating(false);
    });
  };

  return (
    <QuestionGroupForm isPending={isPending} form={form} onSubmit={onSubmit} />
  );
}
