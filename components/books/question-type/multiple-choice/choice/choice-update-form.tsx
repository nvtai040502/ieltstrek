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
import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChoiceSchema, PassageSchema } from "@/lib/validations/books";
import { Button } from "@/components/ui/button";
import { Choice } from "@prisma/client";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { updateChoice } from "@/actions/books/multiple-choice";
import { Dialog, DialogContentWithScrollArea } from "@/components/ui/dialog";
import { useEditHook } from "@/global/use-edit-hook";

export function UpdateChoiceForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, isOpen, type, data } = useEditHook();
  const isModalOpen = isOpen && type === "editChoice";
  const choice = data?.choice;

  const form = useForm<z.infer<typeof ChoiceSchema>>({
    resolver: zodResolver(ChoiceSchema),
    defaultValues: {
      content: "",
      isCorrect: false,
      explanation: "",
    },
  });
  useEffect(() => {
    if (choice) {
      form.setValue("content", choice.content);
      form.setValue("isCorrect", choice.isCorrect);
      form.setValue("explanation", choice.explanation || "");
    }
  }, [form, choice]);
  const router = useRouter();
  if (!isModalOpen && !choice) {
    return null;
  }
  const onSubmit = (values: z.infer<typeof ChoiceSchema>) => {
    if (!choice) {
      return;
    }
    startTransition(async () => {
      const choiceUpdated = await updateChoice({
        content: values.content,
        explanation: values.explanation,
        isCorrect: values.isCorrect,
        id: choice.id,
      });
      if (choiceUpdated) {
        toast.success("Successfully updated choice!");
        form.reset();
        router.refresh();
      } else {
        toast.error("Failed to update choice");
      }
      onClose();
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
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choice Content</FormLabel>
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
                name="isCorrect"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Is Choice Correct</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="explanation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Explanation</FormLabel>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Hello"
                    />
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
      </DialogContentWithScrollArea>
    </Dialog>
  );
}
