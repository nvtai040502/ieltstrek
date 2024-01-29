"use client"
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Part, Question } from "@prisma/client";
import { updateQuestion } from "@/actions/books/questions";
import { QuestionSchema } from "@/lib/validations/books";

export function UpdateQuestionForm ({
  question,
  setIsEditting
}: {
  question: Question 
  setIsEditting: (isEditting: boolean) => void
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: question.title || "",
      description: question.decription || "",
      headerForScorableItems: question.headerForScorableItems || ""
    },
  });
  const router= useRouter()

  const onSubmit = (values: z.infer<typeof QuestionSchema>) => {
    startTransition(async () => {
      
        const questionUpdated = await updateQuestion({
          title: values.title,
          description: values.description,
          id: question.id
        });
        if (questionUpdated) {
          toast.success("Successfully updating question!")
          form.reset()
          router.refresh()
      }
      
       else {
        toast("Failed to update question");
      }
    })
    setIsEditting(false)
    
  };
  return (
    <div className="px-4">
    <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="flex flex-col gap-4">
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Question 1-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                  <FormLabel>Question description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Read the text and answer questions"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                )}
              />
              
          </div>
          <div>
              <Button
                disabled={isPending}
                variant="ghost"
                onClick={() => setIsEditting(false)}
              >
                Back 
              </Button>
              <Button
                disabled={isPending}
                // variant="ghost"
                type="submit"
              >
                Save 
              </Button>
            </div>
        </form>
      </Form>
      </div>
  )
}