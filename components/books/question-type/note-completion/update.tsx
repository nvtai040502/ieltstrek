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
import {
  Fragment,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NoteCompletionSchema } from "@/lib/validations/books";
import { updateNoteCompletion } from "@/actions/books/note-completion";
import { Dialog, DialogContentWithScrollArea } from "@/components/ui/dialog";
import { EditContext } from "@/global/edit-context";
import { useEditHook } from "@/global/use-edit-hook";
import { Editor } from "@/components/text-editor/editor";

export function UpdateNoteCompletionForm() {
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, data } = useContext(EditContext);
  const { onClose } = useEditHook();
  const isModalOpen = isOpen && type === "editNoteCompletion";
  const noteCompletion = data?.noteCompletion;
  const form = useForm<z.infer<typeof NoteCompletionSchema>>({
    resolver: zodResolver(NoteCompletionSchema),
    defaultValues: {
      title: "",
      paragraph: "",
    },
  });
  useEffect(() => {
    if (noteCompletion) {
      form.setValue("title", noteCompletion.title);
      // form.setValue(
      //   "groupItemAmount",
      //   noteCompletion.noteCompletionGroupItemArray.length
      // );
    }
  }, [form, noteCompletion]);

  const router = useRouter();
  if (isModalOpen && !noteCompletion) {
    console.log("Missing NoteCompletion Data");
    return null;
  }

  const onSubmit = (values: z.infer<typeof NoteCompletionSchema>) => {
    // startTransition(async () => {
    //   if (!noteCompletion) {
    //     return;
    //   }
    //   const successfully = await updateNoteCompletion({
    //     title: values.title,
    //     id: noteCompletion.id,
    //     groupItemAmount: values.groupItemAmount,
    //   });
    //   if (successfully) {
    //     toast.success("Successfully updated multipleChoice!");
    //     form.reset();
    //     router.refresh();
    //   } else {
    //     toast("Failed to update multipleChoice");
    //   }
    //   onClose();
    // });
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
                name="paragraph"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Paragraph</FormLabel> */}
                    <FormControl>
                      <Editor onChange={(e) => console.log(e)} value={field.value} />
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
