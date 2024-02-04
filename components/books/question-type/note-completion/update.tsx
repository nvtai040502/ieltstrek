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
import { Fragment, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NoteCompletionGroupItemSchema,
  NoteCompletionSchema,
} from "@/lib/validations/books";
import { AutosizeTextarea } from "@/components/ui/autosize-text-area";
import {
  NoteCompletionExtended,
  NoteCompletionGroupItemExtended,
} from "@/types/db";
import { updateSummaryCompletionItem } from "@/actions/books/summary-completion";
import { updateNoteCompletion } from "@/actions/books/note-completion";

export function UpdateNoteCompletionForm({
  noteCompletion,
  setIsEditing,
}: {
  setIsEditing: (isEditing: boolean) => void;
  noteCompletion: NoteCompletionExtended;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NoteCompletionSchema>>({
    resolver: zodResolver(NoteCompletionSchema),
    defaultValues: {
      title: noteCompletion.title,
      groupItemAmount: noteCompletion.noteCompletionGroupItemArray.length,
    },
  });
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof NoteCompletionSchema>) => {
    startTransition(async () => {
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
      setIsEditing(false);
    });
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
    </div>
  );
}
