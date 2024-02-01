"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { QuestionGroup } from "@prisma/client";
import { QuestionGroupSchema } from "@/lib/validations/books";
import { updateQuestionGroup } from "@/actions/books/question-group";
import { QuestionGroupForm } from "./form";
import { PartExtended } from "@/types/db";

export function UpdateQuestionGroupForm({
  questionGroup,
  part,
  setIsEditting,
}: {
  questionGroup: QuestionGroup;
  part: PartExtended;
  setIsEditting: (isEditting: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof QuestionGroupSchema>>({
    resolver: zodResolver(QuestionGroupSchema),
    defaultValues: {
      title: questionGroup.title,
      type: questionGroup.type,
      startQuestionNumber: questionGroup.startQuestionNumber,
      endQuestionNumber: questionGroup.endQuestionNumber,
      description: questionGroup.description || "",
    },
  });
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof QuestionGroupSchema>) => {
    startTransition(async () => {
      try {
        const { data, success, error } = await updateQuestionGroup({
          title: values.title,
          description: values.description,
          type: values.type,
          startQuestionNumber: values.startQuestionNumber,
          endQuestionNumber: values.endQuestionNumber,
          id: questionGroup.id,
        });

        if (success && data) {
          form.reset();
          router.refresh();
          toast.success("Successfully updated questionGroup!");
        } else {
          console.error("Error updating questionGroup:", error);
          toast.error(error);
        }
      } catch (error) {
        console.error("Error creating question group:", error);
        toast.error("Failed to create question group.");
      } finally {
        setIsEditting(false);
      }
    });
  };
  return (
    <QuestionGroupForm isPending={isPending} form={form} onSubmit={onSubmit} />
  );
}
