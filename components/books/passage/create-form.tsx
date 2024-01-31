"use client"
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPassage, updatePassage } from "@/actions/books/passages";
import { PassageSchema } from "@/lib/validations/books";
import { AutosizeTextarea } from "../../ui/autosize-text-area";
import { PartExtended } from "@/types/db";
import { Passage } from "@prisma/client";

export function CreatePassageForm ({
  partId,
  setIsEditting
}: {
  partId: number
  setIsEditting: (isEditting: boolean) => void
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof PassageSchema>>({
    resolver: zodResolver(PassageSchema),
    defaultValues: {
      title: "",
      description: "",
      content: ""
    },
  });
  const router= useRouter()

  const onSubmit = (values: z.infer<typeof PassageSchema>) => {
    startTransition(async () => {
      const passage = await createPassage({
        title: values.title,
        description: values.description,
        content: values.content,
        partId
      });
      if (passage) {
        toast.success("Successfully create passage!")
        form.reset()
        router.refresh()
      } else {
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
          className="space-y-6 "
        >
          
          <div className="flex flex-col gap-4">
            
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
          <div>
              <Button
                disabled={isPending}
                variant="ghost"
                onClick={() => setIsEditting(false)}
              >
                Back 
              </Button>
              <Button
                disabled={isPending}
                // variant="ghost"
                type="submit"
              >
                Save 
              </Button>
            </div>
        </form>
      </Form>
    </div>
  )
}