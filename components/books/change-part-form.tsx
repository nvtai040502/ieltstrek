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
import { CardWrapper } from "../auth/card-wrapper";
import { AssessmentSchema, PartSchema } from "@/lib/validations/books";
import { createAssessment } from "@/actions/books/assessment";
import { createAssessmentParts, updatePart } from "@/actions/books/parts";
import { createUrl } from "@/lib/utils";
import { Part } from "@prisma/client";

export function ChangePartForm ({part}: {part: Part}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof PartSchema>>({
    resolver: zodResolver(PartSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const router= useRouter()
  const onSubmit = (values: z.infer<typeof PartSchema>) => {
    startTransition(async () => {
      const partUpdated = await updatePart({
        title: values.title,
        description: values.description,
        id: part.id
      });

      if (partUpdated) {
          toast.success("Successfully updated Part!")
          form.reset()
          router.refresh()
      } else {
        toast("Failed to update Part");
      }
    })

    
  };
  return (
    <CardWrapper
      headerLabel="Change Part"
    >
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
                  <FormLabel>Part Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Part 1"
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
                  <FormLabel>Part description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Read the text and answer questions 1–13."
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
            Update 
          </Button>
        </form>
      </Form>
      </CardWrapper>
  )
}