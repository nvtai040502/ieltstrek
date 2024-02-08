"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PassageSchema } from "@/lib/validations/books";
import { Button } from "@/components/ui/button";
import { updateMultipleChoice } from "@/actions/books/multiple-choice";
import { MultipleChoice } from "@prisma/client";
import { Dialog, DialogContentWithScrollArea } from "@/components/ui/dialog";
import { useEditHook } from "@/global/use-edit-hook";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MultiMoreSchema } from "@/lib/validations/question-type";
import { updateMultiMore } from "@/actions/books/multi-more";
import { Checkbox } from "@/components/ui/checkbox";

export function UpdateMultiMoreForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, isOpen, type, data } = useEditHook();
  const isModalOpen = isOpen && type === "editMultiMore";
  const multiMore = data?.multiMore;
  const form = useForm<z.infer<typeof MultiMoreSchema>>({
    resolver: zodResolver(MultiMoreSchema),
    defaultValues: {
      title: "",
      expectedAnswers: [""],
    },
  });
  const router = useRouter();
  useEffect(() => {
    if (multiMore) {
      form.setValue("title", multiMore.title);
      form.setValue("expectedAnswers", multiMore.expectedAnswers);
    }
  }, [form, multiMore]);
  if (!multiMore || !isModalOpen) {
    return null;
  }
  const onSubmit = (values: z.infer<typeof MultiMoreSchema>) => {
    startTransition(async () => {
      const multiMoreUpdated = await updateMultiMore({
        title: values.title,
        id: multiMore.id,
        expectedAnswers: values.expectedAnswers,
      });
      if (multiMoreUpdated) {
        toast.success("Successfully updated multipleChoice!");
        form.reset();
        router.refresh();
      } else {
        toast("Failed to update multipleChoice");
      }
      onClose();
    });
  };
  return (
    <Dialog onOpenChange={onClose} open={isModalOpen}>
      <DialogContentWithScrollArea>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Multiple Choice Title</FormLabel>
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
              <FormField
                control={form.control}
                name="expectedAnswers"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Sidebar</FormLabel>
                      <FormDescription>
                        Select the items you want to display in the sidebar.
                      </FormDescription>
                    </div>
                    {multiMore.choices.map((choice) => (
                      <FormField
                        key={choice.id}
                        control={form.control}
                        name="expectedAnswers"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={choice.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  defaultChecked={multiMore.expectedAnswers.includes(
                                    choice.content,
                                  )}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          choice.content,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== choice.content,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {choice.content}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
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
