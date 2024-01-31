"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShortAnswerSchema } from "@/lib/validations/books";
import { SummaryCompletion } from "@prisma/client";
import { updateSummaryCompletion } from "@/actions/books/summary-completion";

export function UpdateSummaryCompletionForm ({
  summaryCompletion,
  setIsEditting
}: {
  setIsEditting: (isEditting: boolean) => void,
  summaryCompletion: SummaryCompletion
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof ShortAnswerSchema>>({
    resolver: zodResolver(ShortAnswerSchema),
    defaultValues: {
      sentence: summaryCompletion.sentence || "",
      blank: summaryCompletion.blank || "",
      explanation: summaryCompletion.explanation || ""
    },
  });
  const router= useRouter()

  const onSubmit = (values: z.infer<typeof ShortAnswerSchema>) => {
    startTransition(async () => {
        const summaryCompletionUpdated = await updateSummaryCompletion({
          sentence: values.sentence,
          explanation: values.explanation,
          blank: values.blank,
          id: summaryCompletion.id
        });
        if (summaryCompletionUpdated) {
          toast.success("Successfully updated summaryCompletion!")
          form.reset()
          router.refresh()
      }
       else {
        toast.error("Failed to update summaryCompletion");
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
              name="sentence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Answer Sentent</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="You should you '___' to represent for blank"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correct Answer</FormLabel>
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