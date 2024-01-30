"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { MultipleChoiceSchema, PassageSchema } from "@/lib/validations/books";
import { Button } from "@/components/ui/button";
import { createScorableItem } from "@/actions/books/scorable-item";
import { MultipleChoice, Question, ScorableItem } from "@prisma/client";
import { updateMultipleChoice } from "@/actions/books/multiple-choice";

export function UpdateMultipleChoiceForm ({
  multipleChoice, 
  setIsEditting
}: {
  multipleChoice: MultipleChoice,
  setIsEditting: (isEditting: boolean) => void 
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof MultipleChoiceSchema>>({
    resolver: zodResolver(MultipleChoiceSchema),
    defaultValues: {
      title: multipleChoice.title || "",
    },
  });
  const router= useRouter()

  const onSubmit = (values: z.infer<typeof MultipleChoiceSchema>) => {
    startTransition(async () => {
      
        const multipleChoiceUpdated = await updateMultipleChoice({
          title: values.title,
          id: multipleChoice.id
        });
        if (multipleChoiceUpdated) {
          toast.success("Successfully updated multipleChoice!")
          form.reset()
          router.refresh()
      }
       else {
        toast("Failed to update multipleChoice");
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