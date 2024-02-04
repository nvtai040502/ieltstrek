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
import { Fragment, useContext, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NoteCompletionSchema } from "@/lib/validations/books";
import { updateNoteCompletion } from "@/actions/books/note-completion";
import { Dialog, DialogContentWithScrollArea } from "@/components/ui/dialog";
import { EditContext } from "@/global/edit-context";

export function UpdateNoteCompletionForm() {
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, data, setIsOpen, setData, setType } =
    useContext(EditContext);
  const isModalOpen = isOpen && type === "editNoteCompletion";
  const noteCompletion = data?.noteCompletion;
  const form = useForm<z.infer<typeof NoteCompletionSchema>>({
    resolver: zodResolver(NoteCompletionSchema),
    defaultValues: {
      title: noteCompletion?.title || "",
      groupItemAmount: noteCompletion?.noteCompletionGroupItemArray.length || 0,
    },
  });
  const router = useRouter();
  if (!noteCompletion && isModalOpen) {
    console.log("Missing NoteCompletion Data");
    return null;
  }

  const onSubmit = (values: z.infer<typeof NoteCompletionSchema>) => {
    startTransition(async () => {
      if (noteCompletion) {
        const successfully = await updateNoteCompletion({
          title: values.title,
          id: noteCompletion.id,
          groupItemAmount: values.groupItemAmount,
        });
        if (successfully) {
          toast.success("Successfully updated multipleChoice!");
          form.reset();
          router.refresh();
        } else {
          toast("Failed to update multipleChoice");
        }
        setIsOpen(false);
        setType(null);
        setData(undefined);
      }
    });
  };
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => {
        setIsOpen(false);
        setType(null);
        setData(undefined);
      }}
    >
      <DialogContentWithScrollArea>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note Completion Title</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="groupItemAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>groupItemAmount</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="number"
                        min={1}
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
