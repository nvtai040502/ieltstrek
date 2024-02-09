"use client";
import { createIdentifyingInformation } from "@/actions/books/identifying-infomation";
import { createMultiMoreArray } from "@/actions/books/multi-more";
import { createMultiOneArray } from "@/actions/books/multi-one";
import { createNoteCompletion } from "@/actions/books/note-completion";
import { createQuestionGroup } from "@/actions/books/question-group";
import { createMatchingHeading } from "@/actions/books/question-type/matching-heading";
import { createTableComplete } from "@/actions/books/table-complete";
import { AutosizeTextarea } from "@/components/ui/autosize-text-area";
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
import { QuestionGroupSchema } from "@/lib/validations/question-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function CreateQuestionGroupForm() {
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, data, onClose } = useEditHook();

  const part = data?.part;

  const isModalOpen = isOpen && type === "createQuestionGroup";

  const form = useForm<z.infer<typeof QuestionGroupSchema>>({
    resolver: zodResolver(QuestionGroupSchema),
    defaultValues: {
      type: "MULTIPLE_CHOICE",
      title: "",
      startQuestionNumber: 1,
      endQuestionNumber: 2,
      description: "",
    },
  });
  const router = useRouter();
  if (!part || !isModalOpen) {
    return null;
  }
  const onSubmit = async (values: z.infer<typeof QuestionGroupSchema>) => {
    startTransition(async () => {
      try {
        const { questionGroup, success, error } = await createQuestionGroup({
          title: values.title || "",
          description: values.description,
          type: values.type,
          startQuestionNumber: values.startQuestionNumber,
          endQuestionNumber: values.endQuestionNumber,
          partId: part.id,
        });

        if (success && questionGroup) {
          let successfully = false;

          switch (questionGroup.type) {
            case "MULTIPLE_CHOICE":
              successfully = await createMultiOneArray({
                questionGroupId: questionGroup.id,
              });
              break;
            case "MATCHING_HEADING":
              successfully = await createMatchingHeading({
                questionGroupId: questionGroup.id,
              });
              break;
            case "TABLE_COMPLETION":
              successfully = await createTableComplete({
                questionGroupId: questionGroup.id,
                numberColumns: 4,
                numberRows: 4,
              });
              break;
            case "MULTIPLE_CHOICE_MORE_ANSWERS":
              successfully = await createMultiMoreArray({
                questionGroupId: questionGroup.id,
              });
              break;
            case "NOTE_COMPLETION":
              successfully = await createNoteCompletion({
                questionGroupId: questionGroup.id,
              });
              break;

            case "IDENTIFYING_INFORMATION":
              successfully = await createIdentifyingInformation({
                questionGroupId: questionGroup.id,
              });
              break;
            default:
              console.error(
                "Unsupported question group type:",
                questionGroup.type,
              );
          }

          if (successfully) {
            form.reset();
            router.refresh();
            toast.success(success);
          }
        } else {
          toast.error(error);
        }
      } catch (error) {
        console.error("Error creating question group:", error);
        toast.error("Failed to create question group.");
      } finally {
        onClose();
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
                    <FormLabel>Question Group Title</FormLabel>
                    <FormControl>
                      <AutosizeTextarea
                        {...field}
                        disabled={isPending}
                        placeholder="Hello"
                        className="h-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Group Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="write a number in here"
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
                  <FormItem>
                    <FormLabel>Question Group Type</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type for question" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(QuestionType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.replace(/_/g, " ")}{" "}
                            {/* Convert underscores to spaces */}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Additional form fields for Table Completion */}
              {form.getValues().type === QuestionType.TABLE_COMPLETION && (
                <>
                  <FormField
                    control={form.control}
                    name="numberColumns"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Columns</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter number of columns"
                            type="number"
                            min="1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numberRows"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Rows</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter number of rows"
                            type="number"
                            min="1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <div className="flex">
                <FormField
                  control={form.control}
                  name="startQuestionNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From Question</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="write a number in here"
                          type="number"
                          min="1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endQuestionNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To Question</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="write a number in here"
                          type="number"
                          min="2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button disabled={isPending} type="submit" className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </DialogContentWithScrollArea>
    </Dialog>
  );
}
