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
import { QuestionType } from "@prisma/client";
import { createSummaryCompletion } from "@/actions/books/summary-completion";
import { PartExtended } from "@/types/db";
import { error } from "console";
import { createIdentifyingInformation } from "@/actions/books/identifying-infomation";
import { createNoteCompletion } from "@/actions/books/note-completion";
import { createMultiMoreArray } from "@/actions/books/multi-more";
import { createMultiOneArray } from "@/actions/books/multi-one";
import { createTableComplete } from "@/actions/books/table-complete";

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
      title: "",
      startQuestionNumber: 1,
      endQuestionNumber: 2,
      description: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof QuestionGroupSchema>) => {
    startTransition(async () => {
      try {
        const { questionGroup, success, error } = await createQuestionGroup({
          title: values.title || "",
          description: values.description,
          type: values.type,
          startQuestionNumber: values.startQuestionNumber,
          endQuestionNumber: values.endQuestionNumber,
          partId: part.id,
        });

        if (success && questionGroup) {
          let successfully = false;

          switch (questionGroup.type) {
            case "MULTIPLE_CHOICE":
              successfully = await createMultiOneArray({
                questionGroupId: questionGroup.id,
              });
              break;
            case "TABLE_COMPLETION":
              successfully = await createTableComplete({
                questionGroupId: questionGroup.id,
                numberColumns: 4,
                numberRows: 4,
              });
              break;
            case "MULTIPLE_CHOICE_MORE_ANSWERS":
              successfully = await createMultiMoreArray({
                questionGroupId: questionGroup.id,
              });
              break;
            case "SUMMARY_COMPLETION":
              successfully = await createSummaryCompletion({
                questionGroupId: questionGroup.id,
                startQuestionNumber: questionGroup.startQuestionNumber,
                endQuestionNumber: questionGroup.endQuestionNumber,
                assessmentId: part.assessmentId,
                partId: part.id,
              });
              break;
            case "NOTE_COMPLETION":
              successfully = await createNoteCompletion({
                questionGroupId: questionGroup.id,
              });
              break;

            case "IDENTIFYING_INFORMATION":
              successfully = await createIdentifyingInformation({
                questionGroupId: questionGroup.id,
              });
              break;
            default:
              console.error(
                "Unsupported question group type:",
                questionGroup.type,
              );
          }

          if (successfully) {
            form.reset();
            router.refresh();
            toast.success(success);
          }
        } else {
          toast.error(error);
        }
      } catch (error) {
        console.error("Error creating question group:", error);
        toast.error("Failed to create question group.");
      } finally {
        setIsCreating(false);
      }
    });
  };

  return (
    <QuestionGroupForm isPending={isPending} form={form} onSubmit={onSubmit} />
  );
}
