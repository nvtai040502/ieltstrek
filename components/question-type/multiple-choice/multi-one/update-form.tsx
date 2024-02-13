'use client';

import { useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateMultiOne } from '@/actions/books/multi-one';
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
import { useEditHook } from '@/global/use-edit-hook';
import { MultiOneSchema } from '@/lib/validations/question-type';
import { PassageSchema } from '@/lib/validations/text-exam';
import { zodResolver } from '@hookform/resolvers/zod';
import { MultipleChoice } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export function UpdateMultiOneForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, isOpen, type, data } = useEditHook();
  const isModalOpen = isOpen && type === 'editMultiOne';
  const multiOne = data?.multiOne;
  const form = useForm<z.infer<typeof MultiOneSchema>>({
    resolver: zodResolver(MultiOneSchema),
    defaultValues: {
      title: '',
      expectedAnswer: ''
    }
  });
  const router = useRouter();
  useEffect(() => {
    if (multiOne) {
      form.setValue('title', multiOne.title);
      form.setValue('expectedAnswer', multiOne.expectedAnswer);
    }
  }, [form, multiOne]);
  if (!multiOne || !isModalOpen) {
    return null;
  }
  const onSubmit = (values: z.infer<typeof MultiOneSchema>) => {
    startTransition(async () => {
      const multipleChoiceUpdated = await updateMultiOne({
        title: values.title,
        id: multiOne.id,
        expectedAnswer: values.expectedAnswer
      });
      if (multipleChoiceUpdated) {
        toast.success('Successfully updated multipleChoice!');
        form.reset();
        router.refresh();
      } else {
        toast('Failed to update multipleChoice');
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
                name="expectedAnswer"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Expected Answer</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={multiOne.expectedAnswer}
                        className="flex flex-col space-y-1"
                      >
                        {multiOne.choices.map((choice) => (
                          <FormItem
                            key={choice.id}
                            className="flex items-center px-2 space-x-2 space-y-0 w-full hover:bg-secondary"
                          >
                            <FormControl>
                              <RadioGroupItem value={String(choice.id)} />
                            </FormControl>
                            <FormLabel className=" w-full cursor-pointer py-2 ">
                              {choice.content}
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
