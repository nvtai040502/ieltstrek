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
import { Part, Question, QuestionType } from "@prisma/client";
import { PartSchema, QuestionGroupSchema } from "@/lib/validations/books";
import { updateQuestion } from "@/actions/books/questionGroup";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updatePart } from "@/actions/books/parts";

export function UpdatePartForm ({
  part,
  setIsEditting
}: {
  part: Part 
  setIsEditting: (isEditting: boolean) => void
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof PartSchema>>({
    resolver: zodResolver(PartSchema),
    defaultValues: {
      title: part.title || "",
      description: part.description || "",
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
          toast.success("Successfully updating part!")
          form.reset()
          router.refresh()
      }
      
       else {
        toast("Failed to update part");
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
          <div className="flex flex-col gap-4">
            
          <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Part title</FormLabel>
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
                  <FormLabel>Part Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="write a number in here"
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
                type="reset"
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