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
import { useEditHook } from "@/global/use-edit-hook";
import { catchError } from "@/lib/utils";
import { MatchingHeadingSchema } from "@/lib/validations/question-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function UpdateMatchingHeadingForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, isOpen, type, data } = useEditHook();
  const isModalOpen = isOpen && type === "editMatchingHeading";
  const matchingHeading = data?.matchingHeading;

  const form = useForm<z.infer<typeof MatchingHeadingSchema>>({
    resolver: zodResolver(MatchingHeadingSchema),
    defaultValues: {
      title: "",
      headingItems: [],
    },
  });
  useEffect(() => {
    if (matchingHeading) {
      form.setValue("title", matchingHeading.title);
      form.setValue(
        "headingItems",
        matchingHeading.matchingHeadingItemArray.map((item) => item.content),
      );
    }
  }, [form, matchingHeading]);
  if (!isModalOpen || !matchingHeading) {
    return null;
  }
  const onSubmit = (values: z.infer<typeof MatchingHeadingSchema>) => {
    startTransition(async () => {
      try {
        await updateMatchingHeading({
          title: values.title,
          headingItems: values.headingItems,
          id: matchingHeading.id,
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
              {matchingHeading.matchingHeadingItemArray.map((item, i) => (
                <FormField
                  control={form.control}
                  key={item.id}
                  name={`headingItems.${i}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          value={field.value || ""}
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
