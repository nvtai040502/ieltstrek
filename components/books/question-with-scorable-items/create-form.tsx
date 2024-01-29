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
import { PartExtended } from "@/types/db";
import { createQuestion } from "@/actions/books/questions";
import { QuestionSchema } from "@/lib/validations/books";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuestionType } from "@prisma/client";
import { createScorableItem, createScorableItems } from "@/actions/books/scorable-item";

export function CreateQuestionForm ({
  part, 
  setIsCreatingQuestion
}: {
  part: PartExtended, 
  setIsCreatingQuestion: (isCreatingQuestion: boolean) => void
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      content: "",
      headerForItems: "",
      type: "MULTIPLE_CHOICE",
      scorableItemsCount: 4
    },
  });
  const router= useRouter()

  const onSubmit = (values: z.infer<typeof QuestionSchema>) => {
    startTransition(async () => {
        const question = await createQuestion({
          content: values.content,
          headerForItems: values.headerForItems,
          type: values.type,
          scorableItemsCount: values.scorableItemsCount,
          partId: part.id
        });
        if (question) {
          const successfully = await createScorableItems({
            content: "example",
            questionId: question.id,
            questionType: question.type,
            amountScorableItemNeedToCreate: 4
          })
          if(successfully) {
            form.reset()
            router.refresh()
            toast.success("Successfully created question!")
          }
      }
       else {
        toast("Failed to create question");
      }
    })
    setIsCreatingQuestion(false)
    
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
          
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
          >
            Create 
          </Button>
        </form>
      </Form>
      </div>
  )
}