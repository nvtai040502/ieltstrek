"use client";
import { updateMatchingHeading } from "@/actions/books/question-type/matching-heading";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditHook } from "@/global/use-edit-hook";
import { catchError } from "@/lib/utils";
import { MatchingHeadingSchema } from "@/lib/validations/question-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function UpdateMatchingSentenceForm() {
  const [isPending, startTransition] = useTransition();
  const [selectedFakeArray, setSelectedFakeArray] = useState<
    { [key: string]: boolean }[]
  >([]);
  const { onClose, isOpen, type, data } = useEditHook();
  const isModalOpen = isOpen && type === "editMatchingSentence";
  const matchingSentence = data?.matchingSentence;

  const form = useForm<z.infer<typeof MatchingHeadingSchema>>({
    resolver: zodResolver(MatchingHeadingSchema),
    defaultValues: {
      title: "",
      headingItems: [],
    },
  });
  useEffect(() => {
    if (matchingSentence) {
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
  }, [form, matchingSentence]);
  if (!isModalOpen || !matchingSentence) {
    return null;
  }

  const onSubmit = (values: z.infer<typeof MatchingHeadingSchema>) => {
    startTransition(async () => {
      try {
        await updateMatchingHeading({
          title: values.title,
          headingItems: values.headingItems,
          id: matchingSentence.id,
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
              {matchingSentence.matchingSentenceItems.map(
                (matchingSentenceItem, i) => (
                  <FormField
                    key={matchingSentenceItem.id}
                    control={form.control}
                    name={`headingItems.${i}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question Group Type</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Hello"
                          />
                        </FormControl>

                        <Select disabled={isPending}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a type for question" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ),
              )}
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
