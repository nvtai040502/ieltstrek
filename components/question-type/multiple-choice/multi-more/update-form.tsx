'use client';

import { useEffect, useTransition } from 'react';
import { updateMultiMore } from '@/actions/question-type/multiple-choice/multi-more';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useEditHook } from '@/global/use-edit-hook';
import { catchError } from '@/lib/utils';
import { MultiMoreSchema } from '@/lib/validations/question-type';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContentWithScrollArea } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function UpdateMultiMoreForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, isOpen, type, data } = useEditHook();
  const isModalOpen = isOpen && type === 'editMultiMore';
  const multiMore = data?.multiMore;
  const form = useForm<z.infer<typeof MultiMoreSchema>>({
    resolver: zodResolver(MultiMoreSchema),
    defaultValues: {
      title: ''
    }
  });
  useEffect(() => {
    if (multiMore) {
      const correctChoiceIdList = multiMore.choices
        .filter((choice) => choice.isCorrect)
        .map((choice) => choice.id);

      form.setValue('title', multiMore.title);
      form.setValue('choiceIdList', correctChoiceIdList);
    }
  }, [form, multiMore]);
  if (!multiMore || !isModalOpen) {
    return null;
  }
  const onSubmit = (values: z.infer<typeof MultiMoreSchema>) => {
    startTransition(async () => {
      try {
        await updateMultiMore({
          formData: values,
          id: multiMore.id
        });

        toast.success('Updated');
        onClose();
      } catch (err) {
        catchError(err);
      }
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
                name="choiceIdList"
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
                        name="choiceIdList"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={choice.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(choice.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          choice.id
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== choice.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
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
