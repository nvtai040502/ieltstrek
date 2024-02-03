"use client";
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
import { QuestionGroup, QuestionType } from "@prisma/client";
import { QuestionGroupSchema } from "@/lib/validations/books";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AutosizeTextarea } from "@/components/ui/autosize-text-area";
import { UseFormReturn } from "react-hook-form";

export function QuestionGroupForm({
  isPending,
  form,
  onSubmit,
}: {
  isPending: boolean;
  form: UseFormReturn<z.infer<typeof QuestionGroupSchema>>;
  onSubmit: (values: z.infer<typeof QuestionGroupSchema>) => void;
}) {
  return (
    <div className="px-4">
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
                      <SelectItem value={QuestionType.MULTIPLE_CHOICE}>
                        Multiple Choice
                      </SelectItem>
                      <SelectItem value={QuestionType.SUMMARY_COMPLETION}>
                        Summary Completion
                      </SelectItem>
                      <SelectItem value={QuestionType.IDENTIFYING_INFOMATION}>
                        Identifying Infomation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
    </div>
  );
}
