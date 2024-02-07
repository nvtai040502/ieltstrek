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
import { MultipleChoiceSchema, PassageSchema } from "@/lib/validations/books";
import { Button } from "@/components/ui/button";
import { updateMultipleChoice } from "@/actions/books/multiple-choice";
import { MultipleChoice } from "@prisma/client";
import { Dialog, DialogContentWithScrollArea } from "@/components/ui/dialog";
import { useEditHook } from "@/global/use-edit-hook";

export function UpdateMultipleChoiceForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, isOpen, type, data } = useEditHook();
  const isModalOpen = isOpen && type === "editMultipleChoice";
  const multipleChoice = data?.multipleChoice;
  const form = useForm<z.infer<typeof MultipleChoiceSchema>>({
    resolver: zodResolver(MultipleChoiceSchema),
    defaultValues: {
      title: "",
    },
  });
  const router = useRouter();
  useEffect(() => {
    if (multipleChoice) {
      form.setValue("title", multipleChoice.title);
    }
  }, [form, multipleChoice]);
  if (!isModalOpen && !multipleChoice) {
    return null;
  }
  const onSubmit = (values: z.infer<typeof MultipleChoiceSchema>) => {
    if (!multipleChoice) {
      return;
    }
    startTransition(async () => {
      const multipleChoiceUpdated = await updateMultipleChoice({
        title: values.title,
        id: multipleChoice.id,
      });
      if (multipleChoiceUpdated) {
        toast.success("Successfully updated multipleChoice!");
        form.reset();
        router.refresh();
      } else {
        toast("Failed to update multipleChoice");
      }
      onClose();
    });
  };
  return (
    <Dialog onOpenChange={onClose} open={isModalOpen}>
      <DialogContentWithScrollArea>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
