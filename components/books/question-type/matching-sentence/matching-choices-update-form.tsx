"use client";

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
import { MatchingHeadingSchema } from "@/lib/validations/question-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function UpdateListMatchingChoicesForm() {
  const [isPending, startTransition] = useTransition();

  const { onClose, isOpen, type, data } = useEditHook();
  const isModalOpen = isOpen && type === "editListMatchingChoices";
  const listMatchingChoices = data?.listMatchingChoices;

  const form = useForm<z.infer<typeof MatchingHeadingSchema>>({
    resolver: zodResolver(MatchingHeadingSchema),
    defaultValues: {
      title: "",
      headingItems: [],
    },
  });
  useEffect(() => {
    if (listMatchingChoices) {
      // form.setValue("title", matchingSentence.title);
      // matchingSentence.matchingHeadingItemArray.forEach((item, index) => {
      //   form.setValue(
      //     `headingItems.${index}`,
      //     item.passageMultiHeadingId !== null
      //       ? String(item.passageMultiHeadingId)
      //       : item.content,
      //   );
      // });
      // setSelectedFakeArray(() =>
      //   matchingSentence.matchingHeadingItemArray.map((item) =>
      //     item.passageMultiHeadingId === null
      //       ? { [String(item.id)]: true }
      //       : { [String(item.id)]: false },
      //   ),
      // );
    }
  }, [form, listMatchingChoices]);
  if (!isModalOpen || !listMatchingChoices) {
    return null;
  }

  const onSubmit = (values: z.infer<typeof MatchingHeadingSchema>) => {
    console.log(values);
    // startTransition(async () => {
    //   try {
    //     await updateMatchingHeading({
    //       title: values.title,
    //       headingItems: values.headingItems,
    //       id: listMatchingChoices.id,
    //     });
    //     toast.success("Updated");
    //     onClose();
    //   } catch (err) {
    //     catchError(err);
    //   }
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
                    <FormLabel>Title</FormLabel>
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
              {listMatchingChoices.matchingChoices.map((matchingChoice, i) => (
                <FormField
                  control={form.control}
                  key={matchingChoice.id}
                  name={`headingItems.${i}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {matchingChoice.question
                          ? `Question: ${matchingChoice.question.questionNumber}`
                          : "Fake choice"}
                      </FormLabel>
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
              ))}
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
