"use client"
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Part, Question } from "@prisma/client";
import { createPassage, updatePassage } from "@/actions/books/passages";
import { PassageSchema, UpdateQuestionSchema } from "@/lib/validations/books";
import { AutosizeTextarea } from "../ui/autosize-text-area";
import { PartExtended } from "@/types/db";
import { updateQuestion } from "@/actions/books/questions";

export function EditQuestionForm ({
  question,
  setIsEditting
}: {
  question: Question 
  setIsEditting: (isEditting: boolean) => void
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof UpdateQuestionSchema>>({
    resolver: zodResolver(UpdateQuestionSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const router= useRouter()

  const onSubmit = (values: z.infer<typeof UpdateQuestionSchema>) => {
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
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passage Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Hello"
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
                  <FormLabel>Passage description</FormLabel>
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
          <Button
            disabled={isPending}
            onClick={() => setIsEditting(false)}
            className="w-full"
          >
            Remove 
          </Button>
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
          >
            Save 
          </Button>
        </form>
      </Form>
      </div>
  )
}