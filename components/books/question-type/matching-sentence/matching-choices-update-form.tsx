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
import {
  ListMatchingChoicesSchema,
  MatchingHeadingSchema,
} from "@/lib/validations/question-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function UpdateListMatchingChoicesForm() {
  const [isPending, startTransition] = useTransition();
  const [listMatchingChoicesDynamic, setListMatchingChoicesDynamic] = useState<
    string[]
  >([]);
  const { onClose, isOpen, type, data } = useEditHook();
  const isModalOpen = isOpen && type === "editListMatchingChoices";
  const listMatchingChoices = data?.listMatchingChoices;

  const form = useForm<z.infer<typeof ListMatchingChoicesSchema>>({
    resolver: zodResolver(ListMatchingChoicesSchema),
    defaultValues: {
      title: "",
      matchingChoices: [],
    },
  });
  useEffect(() => {
    if (listMatchingChoices) {
      form.setValue("title", listMatchingChoices.title || "");
      setListMatchingChoicesDynamic(
        listMatchingChoices.matchingChoices.map((item) => item.content),
      );
    }
  }, [form, listMatchingChoices]);

  useEffect(() => {
    if (
      listMatchingChoicesDynamic.length <
      form.getValues().matchingChoices.length
    ) {
      form.resetField("matchingChoices");
    }
    listMatchingChoicesDynamic.forEach((content, index) => {
      form.setValue(`matchingChoices.${index}`, content);
    });
  }, [form, listMatchingChoicesDynamic]);
  if (!isModalOpen || !listMatchingChoices) {
    return null;
  }

  const onSubmit = (values: z.infer<typeof ListMatchingChoicesSchema>) => {
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
  const handleAddChoice = () => {
    setListMatchingChoicesDynamic((prev) => [...prev, ""]);
  };

  const handleDeleteChoice = (index: number) => {
    setListMatchingChoicesDynamic((prev) => {
      const updatedChoices = [...prev];
      updatedChoices.splice(index, 1);
      return updatedChoices;
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
              {listMatchingChoicesDynamic.map((_, i) => (
                <FormField
                  control={form.control}
                  key={i}
                  name={`matchingChoices.${i}`}
                  render={({ field }) => (
                    <FormItem>
                      {listMatchingChoices.matchingChoices[i] &&
                      listMatchingChoices.matchingChoices[i].question ? (
                        <FormLabel>{`Question ${listMatchingChoices.matchingChoices[i].question?.questionNumber}`}</FormLabel>
                      ) : (
                        <>
                          <FormLabel>Fake Choice</FormLabel>
                          <span>
                            <Button
                              size="sm"
                              type="button"
                              onClick={() => handleDeleteChoice(i)}
                              variant="outline"
                            >
                              Delete
                            </Button>
                          </span>
                        </>
                      )}

                      <FormControl>
                        <Input
                          value={field.value || ""}
                          onChange={(e) => {
                            setListMatchingChoicesDynamic((prev) => {
                              const updatedChoices = [...prev];
                              updatedChoices[i] = e.target.value;
                              return updatedChoices;
                            });
                            field.onChange(e);
                          }}
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
            <div className="flex">
              <Button
                disabled={isPending}
                onClick={handleAddChoice}
                type="button"
                className="w-full"
              >
                add Fake Choice
              </Button>
              <Button disabled={isPending} type="submit" className="w-full">
                update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContentWithScrollArea>
    </Dialog>
  );
}
