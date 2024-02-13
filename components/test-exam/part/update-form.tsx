'use client';

import { useEffect, useTransition } from 'react';
import { updatePassageMultiHeading } from '@/actions/books/passage';
import { updatePart } from '@/actions/test-exam/part';
import { AutosizeTextarea } from '@/components/ui/autosize-text-area';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogContentWithScrollArea
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEditHook } from '@/global/use-edit-hook';
import { catchError } from '@/lib/utils';
import { PartSchema } from '@/lib/validations/text-exam';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export function UpdatePartForm() {
  const [isPending, startTransition] = useTransition();
  const { data, type, isOpen, onClose } = useEditHook();
  const isModalOpen = isOpen && type === 'editPart';
  const part = data?.part;
  const form = useForm<z.infer<typeof PartSchema>>({
    resolver: zodResolver(PartSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  });
  useEffect(() => {
    if (!part) return;
    form.setValue('title', part.title);
    form.setValue('description', part.description);
  }, [part, form]);
  if (!part || !isModalOpen) {
    return null;
  }
  const onSubmit = (values: z.infer<typeof PartSchema>) => {
    startTransition(async () => {
      try {
        await updatePart({
          title: values.title,
          description: values.description,
          id: part.id
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
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passage Title</FormLabel>
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passage content</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Type content passage here."
                        className="h-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button disabled={isPending} variant="ghost" onClick={onClose}>
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
      </DialogContent>
    </Dialog>
  );
}
