"use client"
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

export function UpdateQuestionGroupForm ({
  questionGroup,
  setIsEditting
}: {
  questionGroup: QuestionGroup
  setIsEditting: (isEditting: boolean) => void
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof QuestionGroupSchema>>({
    resolver: zodResolver(QuestionGroupSchema),
    defaultValues: {
      title: questionGroup.title,
      type: questionGroup.type,
      startQuestionNumber: questionGroup.startQuestionNumber,
      endQuestionNumber: questionGroup.endQuestionNumber,
      description: questionGroup.description || "",
      titleForQuestions: questionGroup.titleForQuestions || ""
    },
  });
  const router= useRouter()

  const onSubmit = (values: z.infer<typeof QuestionGroupSchema>) => {
    startTransition(async () => {
      
        const questionGroupUpdated = await updateQuestionGroup({
          title: values.title,
          titleForQuestions: values.titleForQuestions,
          startQuestionNumber: values.startQuestionNumber,
          type: values.type,
          id: questionGroup.id,
          endQuestionNumber: questionGroup.endQuestionNumber
        });
        if (questionGroupUpdated) {
          toast.success("Successfully updating questionGroup!")
          form.reset()
          router.refresh()
      }
      
       else {
        toast("Failed to update questionGroup");
      }
    })
    setIsEditting(false)
    
  };
  return (
    <QuestionGroupForm isPending={isPending} form={form} onSubmit={onSubmit}/>
  )
}