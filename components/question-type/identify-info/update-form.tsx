'use client';

import { Fragment, useContext, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateIdentifyingInformationItem } from '@/actions/books/identifying-infomation';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { EditContext } from '@/global/edit-context';
import { useEditHook } from '@/global/use-edit-hook';
import {
  IdentifyingInformationItemSchema,
  SummaryCompletionSchema
} from '@/lib/validations/text-exam';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IdentifyingInformationAnswer,
  SummaryCompletion
} from '@prisma/client';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export function UpdateIdentifyingInformationItemForm() {
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, data } = useContext(EditContext);
  const { onClose } = useEditHook();
  const isModalOpen = isOpen && type === 'editIdentifyingInformationItem';
  const item = data?.identifyingInformationItem;
  const form = useForm<z.infer<typeof IdentifyingInformationItemSchema>>({
    resolver: zodResolver(IdentifyingInformationItemSchema),
    defaultValues: {
      title: '',
      expectedAnswer: 'TRUE',
      explanation: ''
    }
  });
  const router = useRouter();
  useEffect(() => {
    if (item) {
      form.setValue('title', item.title);
      form.setValue('expectedAnswer', item.expectedAnswer);
      form.setValue('explanation', item.explanation || '');
    }
  }, [form, item]);
  const onSubmit = async (
    values: z.infer<typeof IdentifyingInformationItemSchema>
  ) => {
    startTransition(async () => {
      try {
        if (!item) {
          return;
        }
        const successfully = await updateIdentifyingInformationItem({
          id: item.id,
          expectedAnswer: values.expectedAnswer,
          explanation: values.explanation,
          title: values.title
        });
        if (successfully) {
          toast.success('Successfully updated summaryCompletion!');
          router.refresh();
        } else {
          toast.error('Some thing went Wrong');
        }
      } catch (error) {
        console.error('Failed to update summaryCompletion:', error);
        toast.error('Failed to update summaryCompletion');
      }
    });

    onClose();
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
              <FormField
                control={form.control}
                name="expectedAnswer"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Expected Answer</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {[
                          IdentifyingInformationAnswer.TRUE,
                          IdentifyingInformationAnswer.FALSE,
                          IdentifyingInformationAnswer.NOT_GIVEN
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

            <Button disabled={isPending} type="submit" className="w-full">
              update
            </Button>
          </form>
        </Form>
      </DialogContentWithScrollArea>
    </Dialog>
  );
}
