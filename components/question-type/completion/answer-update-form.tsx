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

export function CompletionAnswerUpdateForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, isOpen, type, data } = useEditHook();
  const isModalOpen = isOpen && type === 'editCompletionAnswer';
  const completion = data?.completion;
  const form = useForm<z.infer<typeof MultiOneSchema>>({
    resolver: zodResolver(MultiOneSchema),
    defaultValues: {
      title: ''
    }
  });
  useEffect(() => {
    if (completion) {
      // form.setValue('title', completion.title);
    }
  }, [form, completion]);
  if (!completion || !isModalOpen) {
    return null;
  }
  const onSubmit = (values: z.infer<typeof MultiOneSchema>) => {
    // startTransition(async () => {
    //   try {
    //     await updateMultiOne({
    //       formData: values,
    //       id: completion.id
    //     });
    //     toast.success('Updated');
    //     onClose();
    //   } catch (err) {
    //     catchError(err);
    //   }
    // });
  };

  // const correctChoice = completion.choices.find(
  //   (choice) => choice.isCorrect === true
  // );

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
