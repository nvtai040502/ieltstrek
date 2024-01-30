"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ScorableItemWithShortAnswerSchema } from "@/lib/validations/books";
import { Button } from "@/components/ui/button";
import { createScorableItem, updateScorableItem, updateScorableItemWithShortAnswer } from "@/actions/books/scorable-item";
import { ScorableItemExtended } from "@/types/db";

export function UpdateShortAnswerForm ({
  scorableItem,
  setIsEditting
}: {
  setIsEditting: (isEditting: boolean) => void,
  scorableItem: ScorableItemExtended
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof ScorableItemWithShortAnswerSchema>>({
    resolver: zodResolver(ScorableItemWithShortAnswerSchema),
    defaultValues: {
      scorableItemContent: scorableItem.content || "",
      correctAnswer: scorableItem.shortAnswer?.correctAnswer || "",
      explanation: scorableItem.shortAnswer?.explanation || ""
    },
  });
  const router= useRouter()

  const onSubmit = (values: z.infer<typeof ScorableItemWithShortAnswerSchema>) => {
    startTransition(async () => {
        const scorableItemUpdated = await updateScorableItemWithShortAnswer({
          scorableItemContent: values.scorableItemContent,
          explanation: values.explanation,
          correctAnswer: values.correctAnswer,
          scorableItemId: scorableItem.id
        });
        if (scorableItemUpdated) {
          toast.success("Successfully updated short anser!")
          form.reset()
          router.refresh()
      }
       else {
        toast.error("Failed to update short anser");
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
              name="scorableItemContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scorable Item Content</FormLabel>
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
              name="correctAnswer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correct Answer is</FormLabel>
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