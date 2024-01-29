"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CreateQuestionSchema, PassageSchema, UpdateScorableItemSchema } from "@/lib/validations/books";
import { Button } from "@/components/ui/button";
import { createScorableItem, updateScorableItem } from "@/actions/books/scorable-item";
import { Question, ScorableItem } from "@prisma/client";

export function UpdateScorableItemForm ({
  scorableItem, 
  setIsEditting
}: {
  scorableItem: ScorableItem,
  setIsEditting: (isEditting: boolean) => void 
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof UpdateScorableItemSchema>>({
    resolver: zodResolver(UpdateScorableItemSchema),
    defaultValues: {
      content: "",
    },
  });
  const router= useRouter()

  const onSubmit = (values: z.infer<typeof UpdateScorableItemSchema>) => {
    startTransition(async () => {
      
        const scorableItemUpdated = await updateScorableItem({
          content: values.content,
          id: scorableItem.id
        });
        if (scorableItemUpdated) {
          toast.success("Successfully updated scorableItem!")
          form.reset()
          router.refresh()
      }
       else {
        toast("Failed to update scorableItem");
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