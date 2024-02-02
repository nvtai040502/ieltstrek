"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Fragment, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SummaryCompletionSchema } from "@/lib/validations/books";
import { SummaryCompletion } from "@prisma/client";
import { AutosizeTextarea } from "@/components/ui/autosize-text-area";
import { SummaryCompletionExtended } from "@/types/db";
import { updateSummaryCompletionItem } from "@/actions/books/summary-completion";

export function UpdateSummaryCompletionForm({
  summaryCompletion,
  setIsEditting,
}: {
  setIsEditting: (isEditting: boolean) => void;
  summaryCompletion: SummaryCompletionExtended;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SummaryCompletionSchema>>({
    resolver: zodResolver(SummaryCompletionSchema),
    defaultValues: {
      paragraphWithBlanks: summaryCompletion.paragraphWithBlanks || "",
      expectedAnswers: summaryCompletion.summaryCompletionItems.map(
        (item) => item.expectedAnswer || ""
      ),
    },
  });
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof SummaryCompletionSchema>) => {
    startTransition(async () => {
      try {
        const updatePromises = summaryCompletion.summaryCompletionItems.map(
          async (item) => {
            await updateSummaryCompletionItem({
              id: item.id,
              expectedAnswer: values.expectedAnswers[item.question.questionNumber-1],
            });
          }
        );
  
        await Promise.all(updatePromises);
  
        toast.success("Successfully updated summaryCompletion!");
        router.refresh()
      } catch (error) {
        console.error("Failed to update summaryCompletion:", error);
        toast.error("Failed to update summaryCompletion");
      }
    });
  
    setIsEditting(false);
  };
  return (
    <div className="px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="paragraphWithBlanks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {"Paraph (use `___` to prepreset blank)"}
                  </FormLabel>
                  <FormControl>
                    <AutosizeTextarea
                      {...field}
                      disabled={isPending}
                      placeholder="You should you '___' to represent for blank"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {summaryCompletion.summaryCompletionItems.map((summaryCompletionItem) => (
              <Fragment key={summaryCompletionItem.id}>
                <FormField
                  control={form.control}
                  name={`expectedAnswers.${summaryCompletionItem.question.questionNumber-1}`} 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {`Expected Answer ${summaryCompletionItem.question.questionNumber}`}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter expected answer"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Fragment>
            ))}
          </div>

          <Button disabled={isPending} type="submit" className="w-full">
            update
          </Button>
        </form>
      </Form>
    </div>
  );
}
