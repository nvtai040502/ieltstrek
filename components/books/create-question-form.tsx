"use client"
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CreateQuestionSchema, PassageSchema } from "@/lib/validations/books";
import { PartExtended } from "@/types/db";
import { createQuestion } from "@/actions/books/questions";

export function CreateQuestionForm ({
  part, 
}: {
  part: PartExtended, 
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof CreateQuestionSchema>>({
    resolver: zodResolver(CreateQuestionSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const router= useRouter()

  const onSubmit = (values: z.infer<typeof CreateQuestionSchema>) => {
    startTransition(async () => {
      
        const question = await createQuestion({
          title: values.title,
          description: values.description,
          partId: part.id
        });
        if (question) {
          toast.success("Successfully created question!")
          form.reset()
          router.refresh()
      }
       else {
        toast("Failed to create question");
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
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                  <FormLabel>Passage description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Read the text and answer questions"
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