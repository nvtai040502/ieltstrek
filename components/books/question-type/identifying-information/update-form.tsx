"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Fragment, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  IdentifyingInformationItemSchema,
  SummaryCompletionSchema,
} from "@/lib/validations/books";
import {
  IdentifyingInformation,
  IdentifyingInformationAnswer,
  SummaryCompletion,
} from "@prisma/client";
import { AutosizeTextarea } from "@/components/ui/autosize-text-area";
import {
  IdentifyingInformationExtended,
  IdentifyingInformationItemExtended,
  SummaryCompletionExtended,
} from "@/types/db";
import { updateSummaryCompletionItem } from "@/actions/books/summary-completion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateIdentifyingInformationItem } from "@/actions/books/identifying-infomation";

export function UpdateIdentifyingInformationForm({
  identifyingInformationItem,
  setIsEditing,
}: {
  setIsEditing: (isEditing: boolean) => void;
  identifyingInformationItem: IdentifyingInformationItemExtended;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof IdentifyingInformationItemSchema>>({
    resolver: zodResolver(IdentifyingInformationItemSchema),
    defaultValues: {
      title: identifyingInformationItem.title,
      expectedAnswer: identifyingInformationItem.expectedAnswer,
      explanation: identifyingInformationItem.explanation || "",
    },
  });
  const router = useRouter();

  const onSubmit = async (
    values: z.infer<typeof IdentifyingInformationItemSchema>
  ) => {
    startTransition(async () => {
      try {
        const successfully = await updateIdentifyingInformationItem({
          id: identifyingInformationItem.id,
          expectedAnswer: values.expectedAnswer,
          explanation: values.explanation,
          title: values.title
        });
        if (successfully) {
          toast.success("Successfully updated summaryCompletion!");
          router.refresh();
        } else {
          toast.error("Some thing went Wrong");
        }
      } catch (error) {
        console.error("Failed to update summaryCompletion:", error);
        toast.error("Failed to update summaryCompletion");
      }
    });

    setIsEditing(false);
  };
  return (
    <div className="px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
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
              name="expectedAnswer"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Expected Answer</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {[
                        IdentifyingInformationAnswer.TRUE,
                        IdentifyingInformationAnswer.FALSE,
                        IdentifyingInformationAnswer.NOT_GIVEN,
                      ].map((answer) => (
                        <FormItem
                          key={answer}
                          className="flex items-center px-2 space-x-2 space-y-0 w-full hover:bg-secondary"
                        >
                          <FormControl>
                            <RadioGroupItem value={answer} />
                          </FormControl>
                          <FormLabel className=" w-full cursor-pointer py-2 ">
                            {answer}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isPending} type="submit" className="w-full">
            update
          </Button>
        </form>
      </Form>
    </div>
  );
}
