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
import { updateSummaryCompletion } from "@/actions/books/summary-completion";

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

  const onSubmit = (values: z.infer<typeof SummaryCompletionSchema>) => {
    startTransition(async () => {
      const summaryCompletionUpdated = await updateSummaryCompletion({
        paragraphWithBlanks: values.paragraphWithBlanks,
        expectedAnswers: values.expectedAnswers,
        id: summaryCompletion.id
      });
      if (summaryCompletionUpdated) {
        form.reset()
        router.refresh()
        toast.success("Successfully updated summaryCompletion!")
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
            {summaryCompletion.summaryCompletionItems.map((summaryCompletionItem, index) => (
              <Fragment key={summaryCompletionItem.id}>
                <FormField
                  control={form.control}
                  name={`expectedAnswers.${index}`} 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {`Expected Answer ${index + 1}`}
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
