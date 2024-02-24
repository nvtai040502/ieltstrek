'use client';

import { useTransition } from 'react';
import { Button } from '../../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../ui/form';
import { Input } from '../../ui/input';
import { createAssessment } from '@/actions/test-exam/assessment';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useEditHook } from '@/global/use-edit-hook';
import { catchError } from '@/lib/utils';
import { AssessmentSchema } from '@/lib/validations/text-exam';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export function CreateAssessmentForm() {
  const [isPending, startTransition] = useTransition();
  const { type, isOpen, onClose } = useEditHook();
  const isModalOpen = isOpen && type === 'createAssessment';
  const form = useForm<z.infer<typeof AssessmentSchema>>({
    resolver: zodResolver(AssessmentSchema),
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof AssessmentSchema>) => {
    startTransition(async () => {
      try {
        await createAssessment({
          formData: values
        });
        toast.success('Created');
        onClose();
      } catch (err) {
        catchError(err);
      }
    });
  };
  if (!isModalOpen) {
    return null;
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assessment Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Cambridge Academy 16"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={isPending} type="submit" className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
