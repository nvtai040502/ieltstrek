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
import { CardWrapper } from "../../auth/card-wrapper";
import { AssessmentSchema } from "@/lib/validations/books";
import { createAssessment } from "@/actions/books/assessment";
import { createParts } from "@/actions/books/parts";

export function CreateAssessmentForm () {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof AssessmentSchema>>({
    resolver: zodResolver(AssessmentSchema),
    defaultValues: {
      name: "",
      bookName: "",
      imageCover: "",
    },
  });
  const router= useRouter()
  const onSubmit = (values: z.infer<typeof AssessmentSchema>) => {
    startTransition(async () => {
      const assessment = await createAssessment({
        imageCover: values.imageCover,
        bookName: values.bookName,
        name: values.name
      });

      if (assessment) {
        if (assessment.sectionType === "READING") {
          const successfully = await createParts({assessmentId: assessment.id, numberOfPartsToCreate: 3})
          if (successfully) {
            toast.success("Successfully created assessment!")
            router.push(`/assessments/${assessment.id}`)
          }
        }
      } else {
        toast("Failed to create Assessment");
      }
    })

    
  };
  return (
    <CardWrapper
      headerLabel="Create Assessment"
    >
    <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assessment Name</FormLabel>
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
                name="bookName"
                render={({ field }) => (
                  <FormItem>
                  <FormLabel>Book name optional</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="1"
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
      </CardWrapper>
  )
}