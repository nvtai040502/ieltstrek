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
import { QuestionGroupSchema } from "@/lib/validations/books";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuestionType } from "@prisma/client";
import { createScorableItem, createScorableItems } from "@/actions/books/scorable-item";
import { createQuestionGroup } from "@/actions/books/questionGroup";
import { AutosizeTextarea } from "@/components/ui/autosize-text-area";

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
                  <FormLabel>Question Group Title</FormLabel>
                  <FormControl>
                    <AutosizeTextarea
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
                  <FormLabel>Question Group Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="write a number in here"
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
                    <FormLabel>Question Group Type</FormLabel>
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
              <div className="flex">
              <FormField
              control={form.control}
              name="startQuestionNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From Question</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="write a number in here"
                      type="number"
                      min="1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endQuestionNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To Question</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="write a number in here"
                      type="number"
                      min="2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              </div>
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