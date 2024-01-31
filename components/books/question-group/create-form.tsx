"use client"
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
          
          const successfully = await createQuestions({
            questionGroupId: questionGroup.id,
            questionType: questionGroup.type,
            startQuestionNumber: questionGroup.startQuestionNumber,
            endQuestionNumber: questionGroup.endQuestionNumber
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