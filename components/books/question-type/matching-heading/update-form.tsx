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

export function UpdateMatchingHeadingForm() {
  const [isPending, startTransition] = useTransition();
  const [selectedFakeArray, setSelectedFakeArray] = useState<
    { [key: string]: boolean }[]
  >([]);
  const [customValue, setCustomValue] = useState("");
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
      matchingHeading.matchingHeadingItemArray.forEach((item, index) => {
        form.setValue(
          `headingItems.${index}`,
          item.passageMultiHeadingId !== null
            ? String(item.passageMultiHeadingId)
            : item.content,
        );
      });
      setSelectedFakeArray(() =>
        matchingHeading.matchingHeadingItemArray.map((item) =>
          item.passageMultiHeadingId === null
            ? { [String(item.id)]: true }
            : {},
        ),
      );
    }
  }, [form, matchingHeading]);
  if (!isModalOpen || !matchingHeading) {
    return null;
  }
  const onSubmit = (values: z.infer<typeof MatchingHeadingSchema>) => {
    // const selectedContent = values.headingItems.map((itemId: string) => {
    //   const item = matchingHeading.passageHeadingArray.find(
    //     (passageHeading) => String(passageHeading.id) === itemId,
    //   );
    //   return item ? item.content : itemId;
    // });
    console.log(values);
    // startTransition(async () => {
    //   try {
    //     await updateMatchingHeading({
    //       title: values.title,
    //       headingItems: values.headingItems,
    //       id: matchingHeading.id,
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
              {matchingHeading.matchingHeadingItemArray.map((item, i) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name={`headingItems.${i}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Group Type</FormLabel>

                      <Select
                        disabled={isPending}
                        onValueChange={(value) => {
                          if (value === "fake") {
                            setSelectedFakeArray((prev) => ({
                              ...prev,
                              [String(item.id)]: true,
                            }));
                          } else {
                            setSelectedFakeArray((prev) => ({
                              ...prev,
                              [String(item.id)]: false,
                            }));
                            field.onChange(value);
                          }
                        }}
                        defaultValue={
                          item.passageMultiHeadingId !== null
                            ? String(item.passageMultiHeadingId)
                            : "fake"
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type for question" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {matchingHeading.passageHeadingArray.map(
                            (passageHeading) => (
                              <SelectItem
                                key={passageHeading.id}
                                value={String(passageHeading.id)}
                              >
                                {passageHeading.content}
                              </SelectItem>
                            ),
                          )}
                          <SelectItem value="fake">Fake</SelectItem>
                        </SelectContent>
                      </Select>
                      {selectedFakeArray.length &&
                        selectedFakeArray.find(
                          (selectedItem) =>
                            selectedItem.hasOwnProperty(String(item.id)) &&
                            selectedItem[String(item.id)],
                        ) && (
                          <Input
                            defaultValue={field.value}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}

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
