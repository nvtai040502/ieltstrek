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

export function UpdateGroupItemForm({
  groupItem,
  noteCompletion,
  setIsEditing,
}: {
  setIsEditing: (isEditing: boolean) => void;
  groupItem: NoteCompletionGroupItemExtended;
  noteCompletion: NoteCompletionExtended;
}) {
  const [isPending, startTransition] = useTransition();
  
  const [sentenceAmount, setSentenceAmount] = useState<{[key: string]: number}>({})
  const form = useForm<z.infer<typeof NoteCompletionSchema>>({
    resolver: zodResolver(NoteCompletionSchema),
    defaultValues: {
      expectedAnswers: groupItem.noteCompletionItems.map(
        (item) => item.blank?.expectedAnswer || ""
      ),
      groupItems: noteCompletion.noteCompletionGroupItemArray.map((groupItem) => ({
        title: "",
        sentences: Array.from({ length: sentenceAmount[groupItem.id] }).map((_) => ""),
      })),
    },
  });
  const router = useRouter();
  
  // const handleAddSentence = () => {
  //   setSentences((prevSentences) => prevSentences + 1);
  //   // form.setValue(
  //   //   "sentences",
  //   //   Array.from({ length: sentences + 1 }).map(
  //   //     (_, i) => form.getValues(`sentences.${i}`) || ""
  //   //   )
  //   // );
  // };
  // const handleDeleteSentence = () => {
  //   setSentences((prevSentences) => Math.max(0, prevSentences - 1));
  //   // form.setValue(
  //   //   "sentences",
  //   //   Array.from({ length: Math.max(0, sentences - 1) }).map(
  //   //     (_, i) => form.getValues(`sentences.${i}`) || ""
  //   //   )
  //   // );
  // };

  const onSubmit = async (values: z.infer<typeof NoteCompletionSchema>) => {
    console.log(values);
  };
  return (
    <div className="px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            
            {noteCompletion.noteCompletionGroupItemArray.map((groupItem) => (
              <Fragment key={groupItem.id}>
                <FormField
                  control={form.control}
                  name={`groupItems.${groupItem.id}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Item Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="hello"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <div className="flex">
                  <Button type="button" onClick={handleAddSentence}>
                    Add Last sentence
                  </Button>
                  <Button
                    type="button"
                    disabled={sentences === 1}
                    onClick={handleDeleteSentence}
                  >
                    Delete Last sentence
                  </Button>
                </div> */}

                {/* {Array.from({ length: sentenceAmount[groupIndex] }).map((_, sentenceIndex) => (
                  <Fragment key={sentenceIndex}>
                    <FormField
                      control={form.control}
                      name={`groupItems.${groupIndex}.sentences.${sentenceIndex}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{`Sentence ${sentenceIndex + 1}`}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="content sentence"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Fragment>
                ))} */}
              </Fragment>
            ))}
            {/* {groupItem.noteCompletionItems.map(
              (item) =>
                item.blank && (
                  <Fragment key={item.id}>
                    <FormField
                      control={form.control}
                      name={`expectedAnswers.${
                        item.blank.question.questionNumber - 1
                      }`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {`Expected Answer ${item.blank?.question.questionNumber}`}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="Enter expected answer"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Fragment>
                )
            )} */}
          </div>

          <Button disabled={isPending} type="submit" className="w-full">
            update
          </Button>
        </form>
      </Form>
    </div>
  );
}
