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
import { updateNoteCompletionGroupItem } from "@/actions/books/note-completion";

export function UpdateNoteCompletionGroupItemForm() {
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, data } = useContext(EditContext);
  const [sentences, setSentences] = useState<string[]>([]);
  const [totalBlanks, setTotalBlanks] = useState<number>(0);
  const { onClose } = useEditHook();
  const isModalOpen = isOpen && type === "editNoteCompletionGroupItem";
  const groupItem = data?.noteCompletionGroupItem;
  const form = useForm<z.infer<typeof NoteCompletionGroupItemSchema>>({
    resolver: zodResolver(NoteCompletionGroupItemSchema),
    defaultValues: {
      title: "",
      sentences: [""],
      expectedAnswers: [""],
    },
  });
  useEffect(() => {
    if (groupItem) {
      const itemSentences = groupItem.noteCompletionItems.map(
        (item) => item.sentence
      );
      form.setValue("title", groupItem.title || "");
      form.setValue("sentences", itemSentences);
      form.setValue(
        "expectedAnswers",
        groupItem.blanks.map((blank) => blank.expectedAnswer)
      );
      setSentences(itemSentences);
      setTotalBlanks(groupItem.blanks.length);
    }
  }, [form, groupItem]);

  const router = useRouter();

  const handleSentenceChange = (index: number, value: string) => {
    const updatedSentences = [...sentences];
    updatedSentences[index] = value;

    setSentences(updatedSentences);
    form.setValue(`sentences.${index}`, value); 

    setTotalBlanks(
      updatedSentences.reduce(
        (count, sentence) => count + (sentence.split(" ___ ").length - 1),
        0
      )
    );
  };
  
  
  const onSubmit = (values: z.infer<typeof NoteCompletionGroupItemSchema>) => {
    startTransition(async () => {
      if (!groupItem) return;
    const successfully = await updateNoteCompletionGroupItem({
      title: values.title,
      id: groupItem.id,
      sentences: values.sentences,
      expectedAnswers: values.expectedAnswers
    });
    if (successfully) {
      toast.success("Successfully updated multipleChoice!");
      form.reset();
      router.refresh();
    } else {
      toast("Failed to update multipleChoice");
    }
    onClose();
    });
  };
  if (isModalOpen && !groupItem) {
    console.log("Missing NoteCompletion Data");
    return null;
  }
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
                  key={`sentence-${index}`}
                  control={form.control}
                  name={`sentences.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          onChange={(e) =>
                            handleSentenceChange(index, e.target.value)
                          }
                        />
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
                disabled={sentences.length === 0}
              >
                Delete Last Sentence
              </Button>
            </div>
            <div>Expected Answers</div>
            {Array.from({ length: totalBlanks }).map((_, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`expectedAnswers.${index}`}
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
