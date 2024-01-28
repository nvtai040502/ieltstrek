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
import { Part } from "@prisma/client";
import { createPassage, updatePassage } from "@/actions/books/passages";
import { PassageSchema } from "@/lib/validations/books";
import { AutosizeTextarea } from "../ui/autosize-text-area";
import { PartWithPassage } from "@/types/db";

export function EditPassageForm ({
  part, 
  setIsEditting
}: {
  part: PartWithPassage, 
  setIsEditting: (isEditting: boolean) => void
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof PassageSchema>>({
    resolver: zodResolver(PassageSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const router= useRouter()

  const onSubmit = (values: z.infer<typeof PassageSchema>) => {
    startTransition(async () => {
      if (part.passage) {
        const passage = await updatePassage({
          title: values.title,
          description: values.description,
          content: values.content,
          id: part.passage.id
        });
        if (passage) {
          toast.success("Successfully created Passage!")
          form.reset()
          router.refresh()
      }
      }
      

       else {
        toast("Failed to create passage");
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
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                  <FormLabel>Passage content</FormLabel>
                  <FormControl>
                    <AutosizeTextarea
                      {...field}
                      disabled={isPending}
                      placeholder="Type content passage here." 
                      className="h-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                )}
              />
          </div>
          <Button
            disabled={isPending}
            onClick={() => setIsEditting(false)}
            className="w-full"
          >
            Remove 
          </Button>
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
          >
            Save 
          </Button>
        </form>
      </Form>
      </div>
  )
}