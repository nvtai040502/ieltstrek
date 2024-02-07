"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { QuestionGroup } from "@prisma/client";
import { QuestionGroupSchema } from "@/lib/validations/books";
import { updateQuestionGroup } from "@/actions/books/question-group";
import { QuestionGroupForm } from "./form";
import { PartExtended } from "@/types/db";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AutosizeTextarea } from "@/components/ui/autosize-text-area";
import { Button } from "@/components/ui/button";
import { useEditHook } from "@/global/use-edit-hook";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogContentWithScrollArea } from "@/components/ui/dialog";

export function UpdateQuestionGroupForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, isOpen, type, data } = useEditHook();
  const isModalOpen = isOpen && type === "editQuestionGroup";
  const questionGroup = data?.questionGroup;
  const form = useForm<z.infer<typeof QuestionGroupSchema>>({
    resolver: zodResolver(QuestionGroupSchema),
    defaultValues: {
      title: "",
      type: "MULTIPLE_CHOICE",
      startQuestionNumber: 1,
      endQuestionNumber: 2,
      description: "",
    },
  });
  const router = useRouter();
  useEffect(() => {
    if (questionGroup) {
      form.setValue("title", questionGroup.title);
      form.setValue("description", questionGroup.description || "");
      form.setValue("type", questionGroup.type);
      form.setValue("startQuestionNumber", questionGroup.startQuestionNumber);
      form.setValue("endQuestionNumber", questionGroup.endQuestionNumber);
    }
  }, [form, questionGroup]);
  if (!isModalOpen && !questionGroup) {
    return null;
  }
  const onSubmit = async (values: z.infer<typeof QuestionGroupSchema>) => {
    if (!questionGroup) {
      return;
    }
    startTransition(async () => {
      try {
        const { data, success, error } = await updateQuestionGroup({
          title: values.title || "",
          description: values.description,
          type: values.type,
          startQuestionNumber: values.startQuestionNumber,
          endQuestionNumber: values.endQuestionNumber,
          id: questionGroup.id,
        });

        if (success && data) {
          form.reset();
          router.refresh();
          toast.success("Successfully updated questionGroup!");
        } else {
          console.error("Error updating questionGroup:", error);
          toast.error(error);
        }
      } catch (error) {
        console.error("Error creating question group:", error);
        toast.error("Failed to create question group.");
      } finally {
        onClose();
      }
    });
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContentWithScrollArea>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Group Title</FormLabel>
                    <FormControl>
                      <AutosizeTextarea
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
                    <FormLabel>Question Group Description</FormLabel>
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

            <Button disabled={isPending} type="submit" className="w-full">
              Update
            </Button>
          </form>
        </Form>
      </DialogContentWithScrollArea>
    </Dialog>
  );
}
