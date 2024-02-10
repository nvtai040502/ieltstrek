"use client";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPassage, updatePassage } from "@/actions/books/passage";
import { PassageSchema } from "@/lib/validations/books";
import { AutosizeTextarea } from "../../ui/autosize-text-area";
import { useEditHook } from "@/global/use-edit-hook";
import { Dialog, DialogContentWithScrollArea } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PassageType } from "@prisma/client";

export function CreatePassageForm() {
  const [isPending, startTransition] = useTransition();
  const { data, type, isOpen, onClose } = useEditHook();
  const isModalOpen = isOpen && type === "createPassage";
  const part = data?.part;
  const form = useForm<z.infer<typeof PassageSchema>>({
    resolver: zodResolver(PassageSchema),
    defaultValues: {
      title: "",
    },
  });
  const router = useRouter();
  if (!part || !isModalOpen) {
    return null;
  }
  const onSubmit = (values: z.infer<typeof PassageSchema>) => {
    startTransition(async () => {
      const passage = await createPassage({
        title: values.title,
        partId: part.id,
        type: values.type,
      });
      if (passage) {
        toast.success("Successfully create passage!");
        form.reset();
        router.refresh();
      } else {
        toast("Failed to create passage");
      }
      onClose();
    });
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContentWithScrollArea>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Passage Title (You can change it Later)
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
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Passage Type (Important)</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {[
                          PassageType.PASSAGE_SIMPLE,
                          PassageType.PASSAGE_MULTI_HEADING,
                        ].map((answer) => (
                          <FormItem
                            key={answer}
                            className="flex items-center px-2 space-x-2 space-y-0 w-full hover:bg-secondary"
                          >
                            <FormControl>
                              <RadioGroupItem value={answer} />
                            </FormControl>
                            <FormLabel className=" w-full cursor-pointer py-2 ">
                              {answer}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button
                disabled={isPending}
                type="reset"
                variant="ghost"
                onClick={onClose}
              >
                Back
              </Button>
              <Button
                disabled={isPending}
                // variant="ghost"
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContentWithScrollArea>
    </Dialog>
  );
}
