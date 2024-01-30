"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { QuestionGroupSchema } from "@/lib/validations/books";
import { createScorableItems } from "@/actions/books/scorable-item";
import { createQuestionGroup } from "@/actions/books/questionGroup";
import { QuestionGroupForm } from "./form";

export function CreateQuestionGroupForm ({
  partId, 
  setIsCreating
}: {
  partId: string, 
  setIsCreating: (isCreating: boolean) => void
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof QuestionGroupSchema>>({
    resolver: zodResolver(QuestionGroupSchema),
    defaultValues: {
      type: "MULTIPLE_CHOICE",
    },
  });
  const router= useRouter()

  const onSubmit = (values: z.infer<typeof QuestionGroupSchema>) => {
    startTransition(async () => {
        const questionGroup = await createQuestionGroup({
          title: values.title,
          description: values.description,
          type: values.type,
          startQuestionNumber: values.startQuestionNumber,
          endQuestionNumber: values.endQuestionNumber,
          partId
        });
        if (questionGroup) {
          const amountScorableItemNeedToCreate = questionGroup.endQuestionNumber - questionGroup.startQuestionNumber + 1
          const successfully = await createScorableItems({
            questionId: questionGroup.id,
            questionType: questionGroup.type,
            amountScorableItemNeedToCreate
          })
          if(successfully) {
            form.reset()
            router.refresh()
            toast.success("Successfully created questionGroup!")
          }
      }
       else {
        toast("Failed to create questionGroup");
      }
    })
    setIsCreating(false)
    
  };
  return (
    <QuestionGroupForm isPending={isPending} form={form} onSubmit={onSubmit}/>
  )
}