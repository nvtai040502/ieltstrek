"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { PassageSchema } from "@/lib/validations/books";
import { PartExtended, QuestionExtended } from "@/types/db";
import { createQuestion } from "@/actions/books/questions";
import { Button } from "@/components/ui/button";
import { createScorableItem } from "@/actions/books/scorable-item";
import { Question } from "@prisma/client";

export function CreateScorableItemForm ({
  question, 
}: {
  question: QuestionExtended, 
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof CreateScorableItemSchema>>({
    resolver: zodResolver(CreateScorableItemSchema),
    defaultValues: {
      content: "",
    },
  });
  const router= useRouter()

  const onSubmit = (values: z.infer<typeof CreateScorableItemSchema>) => {
    startTransition(async () => {
      
        const scorableItem = await createScorableItem({
          content: values.content,
          questionId: question.id
        });
        if (scorableItem) {
          toast.success("Successfully created scorableItem!")
          form.reset()
          router.refresh()
      }
       else {
        toast("Failed to create scorableItem");
      }
    })
    
    
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