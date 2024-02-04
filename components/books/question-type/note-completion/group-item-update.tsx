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
import { useContext, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NoteCompletionGroupItemSchema } from "@/lib/validations/books";
import { Dialog, DialogContentWithScrollArea } from "@/components/ui/dialog";
import { EditContext } from "@/global/edit-context";
import { useEditHook } from "@/global/use-edit-hook";

export function UpdateNoteCompletionGroupItemForm() {
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, data } = useContext(EditContext);
  const [sentences, setSentences] = useState<string[]>([]);
  const { onClose } = useEditHook();
  const isModalOpen = isOpen && type === "editNoteCompletionGroupItem";
  const groupItem = data?.noteCompletionGroupItem;
  const form = useForm<z.infer<typeof NoteCompletionGroupItemSchema>>({
    resolver: zodResolver(NoteCompletionGroupItemSchema),
    defaultValues: {
      title: "",
      sentences: [],
      expectedAnswers: [],
    },
  });
  useEffect(() => {
    if (groupItem) {
      form.setValue("title", groupItem.title || "");
      form.setValue(
        "sentences",
        groupItem.noteCompletionItems.map((item) => item.sentence)
      );
      form.setValue(
        "expectedAnswers",
        groupItem.blanks.map((blank) => blank.expectedAnswer)
      );
      setSentences(() =>
        groupItem.noteCompletionItems.map((item) => item.sentence)
      );
    }
  }, [form, groupItem]);

  const router = useRouter();
  if (isModalOpen && !groupItem) {
    console.log("Missing NoteCompletion Data");
    return null;
  }
  if (!groupItem) return null;
  const onSubmit = (values: z.infer<typeof NoteCompletionGroupItemSchema>) => {
    console.log(values);
    // startTransition(async () => {
    //   if (!groupItem) {
    //     return;
    //   }
    // const successfully = await updateNoteCompletion({
    //   title: values.title,
    //   id: noteCompletion.id,
    //   groupItemAmount: values.groupItemAmount,
    // });
    // if (successfully) {
    //   toast.success("Successfully updated multipleChoice!");
    //   form.reset();
    //   router.refresh();
    // } else {
    //   toast("Failed to update multipleChoice");
    // }
    // onClose();
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
              <div>
                {
                  "Content: You will use `___` to represent blank, and it will auto create expected answer for you to write the correct answer for that blank"
                }
              </div>
              {sentences.map((_, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`sentences[${index}]` as "sentences"}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                onClick={() => {
                  setSentences((prevSentences) => [...prevSentences, ""]);
                }}
                className="w-full"
                type="button"
              >
                Add Sentence
              </Button>
              <Button
                onClick={() => {
                  setSentences((prevSentences) => [
                    ...prevSentences.slice(0, -1),
                  ]);
                }}
                className="w-full"
                type="button"
                disabled={groupItem.noteCompletionItems.length === 0}
              >
                Delete Last Sentence
              </Button>
            </div>
            <div>Expected Answers</div>
            {groupItem.blanks.map((_, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`expectedAnswers[${index}]` as "expectedAnswers"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button disabled={isPending} type="submit" className="w-full">
              update
            </Button>
          </form>
        </Form>
      </DialogContentWithScrollArea>
    </Dialog>
  );
}
