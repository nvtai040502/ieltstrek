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
import { createAssessment, createAssessmentTemplate } from "@/actions/books/assessment";
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
  const onSubmit = async (values: z.infer<typeof AssessmentSchema>) => {
    try {
      startTransition(async () => {
        // Create the assessment
        const assessment = await createAssessment({
          imageCover: values.imageCover,
          bookName: values.bookName,
          name: values.name,
        });
  
        if (assessment) {
          if (assessment.sectionType === "READING") {
            const successfully = await createAssessmentTemplate({
              assessmentId: assessment.id,
            });
  
            if (successfully) {
              // If everything is successful, navigate to the assessment page and show success toast
              router.push(`/assessments/${assessment.id}`);
              toast.success("Successfully created assessment!");
            } else {
              // If creating parts fails, show an error toast
              toast.error("Failed to create parts for the assessment");
            }
          }
        } else {
          // If creating assessment fails, show an error toast
          toast.error("Failed to create Assessment");
        }
      });
    } catch (error) {
      // Catch any unexpected errors and show an error toast
      toast.error(`An unexpected error occurred: ${error}`);
      console.error("Unexpected error in onSubmit:", error);
    }
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