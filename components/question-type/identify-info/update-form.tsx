'use client';

import { useContext, useEffect, useTransition } from 'react';
import { updateIdentifyInfo } from '@/actions/question-type/identify-info';
import { zodResolver } from '@hookform/resolvers/zod';
import { IdentifyChoice } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { EditContext } from '@/global/edit-context';
import { useEditHook } from '@/global/use-edit-hook';
import { catchError } from '@/lib/utils';
import { IdentifyInfoSchema } from '@/lib/validations/question-type';
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

export function IdentifyInfoUpdateForm() {
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, data } = useContext(EditContext);
  const { onClose } = useEditHook();
  const isModalOpen = isOpen && type === 'editIdentifyInfo';
  const identifyInfo = data?.identifyInfo;
  const form = useForm<z.infer<typeof IdentifyInfoSchema>>({
    resolver: zodResolver(IdentifyInfoSchema),
    defaultValues: {
      title: ''
    }
  });
  useEffect(() => {
    if (identifyInfo) {
      form.setValue('title', identifyInfo.title);
      form.setValue('choiceCorrect', identifyInfo.choiceCorrect);
    }
  }, [form, identifyInfo]);
  if (!identifyInfo || !isModalOpen) {
    return null;
  }
  const onSubmit = (values: z.infer<typeof IdentifyInfoSchema>) => {
    startTransition(async () => {
      try {
        await updateIdentifyInfo({
          formData: values,
          id: identifyInfo.id
        });

        toast.success('Updated');
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
                name="choiceCorrect"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Expected Answer</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {[
                          IdentifyChoice.TRUE,
                          IdentifyChoice.FALSE,
                          IdentifyChoice.NOT_GIVEN
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
