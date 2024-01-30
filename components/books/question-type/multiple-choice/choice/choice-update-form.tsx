"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChoiceSchema, PassageSchema } from "@/lib/validations/books";
import { Button } from "@/components/ui/button";
import { Choice, Question, ScorableItem } from "@prisma/client";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { updateChoice } from "@/actions/books/multiple-choice";

export function UpdateChoiceForm ({
  choice,
  setIsEditting
}: {
  setIsEditting: (isEditting: boolean) => void,
  choice: Choice
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof ChoiceSchema>>({
    resolver: zodResolver(ChoiceSchema),
    defaultValues: {
      content: choice.content || "",
      isCorrect: choice.isCorrect || false,
      explanation: choice.explanation || ""
    },
  });
  const router= useRouter()

  const onSubmit = (values: z.infer<typeof ChoiceSchema>) => {
    startTransition(async () => {
        const choiceUpdated = await updateChoice({
          content: values.content,
          explanation: values.explanation,
          isCorrect: values.isCorrect,
          id: choice.id
        });
        if (choiceUpdated) {
          toast.success("Successfully updated choice!")
          form.reset()
          router.refresh()
      }
       else {
        toast.error("Failed to update choice");
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choice Content</FormLabel>
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
              name="isCorrect"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Is Choice Correct
                    </FormLabel>
                    
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Explanation</FormLabel>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Hello"
                    />
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
            update 
          </Button>
        </form>
      </Form>
    </div>
  )
}