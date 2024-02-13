'use client';

import { useContext, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createQuestionGroup } from '@/actions/test-exam/question-group';
import { AutosizeTextarea } from '@/components/ui/autosize-text-area';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContentWithScrollArea } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ExamContext } from '@/global/exam-context';
import { useEditHook } from '@/global/use-edit-hook';
import { catchError } from '@/lib/utils';
import { QuestionGroupSchema } from '@/lib/validations/question-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuestionType } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export function CreateQuestionGroupForm() {
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, onClose } = useEditHook();
  const { selectedPart, selectedAssessment } = useContext(ExamContext);

  const isModalOpen = isOpen && type === 'createQuestionGroup';

  const form = useForm<z.infer<typeof QuestionGroupSchema>>({
    resolver: zodResolver(QuestionGroupSchema),
    defaultValues: {
      title: '',
      // type: '',
      startQuestionNumber: 1,
      endQuestionNumber: 4,
      description: ''
    }
  });

  if (!selectedAssessment || !selectedPart || !isModalOpen) {
    return null;
  }

  const onSubmit = async (values: z.infer<typeof QuestionGroupSchema>) => {
    startTransition(async () => {
      try {
        await createQuestionGroup({
          formData: values,
          partId: selectedPart.id
        });

        toast.success('Created');
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
                    <Select disabled={isPending} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type for question" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="">
                        {Object.values(QuestionType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.replace(/_/g, ' ')}{' '}
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
