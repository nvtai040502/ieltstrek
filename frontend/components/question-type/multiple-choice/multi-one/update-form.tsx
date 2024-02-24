'use client';

import { useEffect, useTransition } from 'react';
import { updateMultiOne } from '@/actions/question-type/multiple-choice/multi-one';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useEditHook } from '@/global/use-edit-hook';
import { catchError, cn } from '@/lib/utils';
import { MultiOneSchema } from '@/lib/validations/question-type';
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

export function MultiOneUpdateForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, isOpen, type, data } = useEditHook();
  const isModalOpen = isOpen && type === 'editMultiOne';
  const multiOne = data?.multiOne;
  const form = useForm<z.infer<typeof MultiOneSchema>>({
    resolver: zodResolver(MultiOneSchema),
    defaultValues: {
      title: ''
    }
  });
  useEffect(() => {
    if (multiOne) {
      form.setValue('title', multiOne.title);
    }
  }, [form, multiOne]);
  if (!multiOne || !isModalOpen) {
    return null;
  }
  const onSubmit = (values: z.infer<typeof MultiOneSchema>) => {
    startTransition(async () => {
      try {
        await updateMultiOne({
          formData: values,
          id: multiOne.id
        });

        toast.success('Updated');
        onClose();
      } catch (err) {
        catchError(err);
      }
    });
  };

  const correctChoice = multiOne.choices.find(
    (choice) => choice.isCorrect === true
  );

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
                name="choiceId"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Choices</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={correctChoice ? correctChoice.id : ''}
                        className="flex flex-col space-y-1"
                      >
                        {multiOne.choices.map((choice) => (
                          <FormItem
                            key={choice.id}
                            className={cn(
                              'flex items-center px-2 space-x-2 space-y-0 w-full ',
                              choice.isCorrect
                                ? 'bg-green-600 hover:opacity-85'
                                : 'hover:bg-secondary'
                            )}
                          >
                            <FormControl>
                              <RadioGroupItem value={choice.id} />
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
