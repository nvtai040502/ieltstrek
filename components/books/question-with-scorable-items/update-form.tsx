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
import { Part, Question, QuestionType } from "@prisma/client";
import { QuestionSchema } from "@/lib/validations/books";
import { updateQuestion } from "@/actions/books/questions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      content: question.content || "",
      type: question.type || "MULTIPLE_CHOICE",
      scorableItemsCount: question.scorableItemsCount || 4,
      headerForItems: question.headerForItems || ""
    },
  });
  const router= useRouter()

  const onSubmit = (values: z.infer<typeof QuestionSchema>) => {
    startTransition(async () => {
      
        const questionUpdated = await updateQuestion({
          content: values.content,
          headerForItems: values.headerForItems,
          scorableItemsCount: values.scorableItemsCount,
          type: values.type,
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Content</FormLabel>
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
              name="scorableItemsCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Scorable Items</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="write a number in here"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type for question" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={QuestionType.MULTIPLE_CHOICE}>
                          Multiple Choice
                        </SelectItem>
                        <SelectItem value={QuestionType.SHORT_ANSWER}>
                          Short Answer
                        </SelectItem>
                      </SelectContent>
                    </Select>
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