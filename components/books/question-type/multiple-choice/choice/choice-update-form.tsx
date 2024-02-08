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
import { Button } from "@/components/ui/button";
import { Choice } from "@prisma/client";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContentWithScrollArea } from "@/components/ui/dialog";
import { useEditHook } from "@/global/use-edit-hook";
import { updateChoice } from "@/actions/books/choice";
import { ChoiceSchema } from "@/lib/validations/question-type";

export function UpdateChoiceForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, isOpen, type, data } = useEditHook();
  const isModalOpen = isOpen && type === "editChoice";
  const choice = data?.choice;

  const form = useForm<z.infer<typeof ChoiceSchema>>({
    resolver: zodResolver(ChoiceSchema),
    defaultValues: {
      content: "",
    },
  });
  useEffect(() => {
    if (choice) {
      form.setValue("content", choice.content);
    }
  }, [form, choice]);
  const router = useRouter();
  if (!isModalOpen || !choice) {
    return null;
  }
  const onSubmit = (values: z.infer<typeof ChoiceSchema>) => {
    console.log(values);
    startTransition(async () => {
      const choiceUpdated = await updateChoice({
        content: values.content,
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
