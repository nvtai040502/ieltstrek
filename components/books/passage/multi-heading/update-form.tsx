"use client";
import {
  updatePassage,
  updatePassageMultiHeading,
} from "@/actions/books/passage";
import { AutosizeTextarea } from "@/components/ui/autosize-text-area";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContentWithScrollArea } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEditHook } from "@/global/use-edit-hook";
import { catchError } from "@/lib/utils";
import {
  PassageMultiHeadingSchema,
  PassageSchema,
} from "@/lib/validations/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function UpdatePassageMultiHeadingForm() {
  const [isPending, startTransition] = useTransition();
  const { data, type, isOpen, onClose } = useEditHook();
  const isModalOpen = isOpen && type === "editPassageMultiHeading";
  const multiHeading = data?.passageMultiHeading;
  const form = useForm<z.infer<typeof PassageMultiHeadingSchema>>({
    resolver: zodResolver(PassageMultiHeadingSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  useEffect(() => {
    if (multiHeading) {
      form.setValue("title", multiHeading.title);
      form.setValue("content", multiHeading.content);
    }
  }, [multiHeading, form]);
  if (!multiHeading || !isModalOpen) {
    return null;
  }
  const onSubmit = (values: z.infer<typeof PassageMultiHeadingSchema>) => {
    startTransition(async () => {
      try {
        await updatePassageMultiHeading({
          title: values.title,
          content: values.content,
          id: multiHeading.id,
        });
        toast.success("Updated");
        onClose();
      } catch (err) {
        catchError(err);
      }
    });
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContentWithScrollArea>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <div className="flex flex-col gap-4">
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

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passage content</FormLabel>
                    <FormControl>
                      <AutosizeTextarea
                        {...field}
                        disabled={isPending}
                        placeholder="Type content passage here."
                        className="h-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button disabled={isPending} variant="ghost" onClick={onClose}>
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
      </DialogContentWithScrollArea>
    </Dialog>
  );
}
