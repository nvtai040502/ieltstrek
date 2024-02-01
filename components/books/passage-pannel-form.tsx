"use client"
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { undefined, z } from "zod";
import { PassageSchema } from "@/lib/validations/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CardWrapper } from "../auth/card-wrapper";
import { createPassage } from "@/actions/books/passages";
export function PassagePannelForm ({partId}: {partId: number}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof PassageSchema>>({
    resolver: zodResolver(PassageSchema),
    defaultValues: {
      title: "",
      description: "",
      imageHeader: "",
      content: "",
      
    },
  });
  const router= useRouter()
  const onSubmit = (values: z.infer<typeof PassageSchema>) => {
    startTransition(async () => {
      const passage = await createPassage({
        title: values.title,
        content: values.content,
        description: values.description,
        imageHeader: values.imageHeader,
        partId
      });

      if (passage) {
        toast("Passage created successfully");
        form.reset()
      } else {
        toast("Failed to create Test");
      }
    })

    
  };
  return (
    
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
                  <FormLabel>Version</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Cambridge Academy 16"
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
                  <FormLabel>Version</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="hello"
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
      
  )
}