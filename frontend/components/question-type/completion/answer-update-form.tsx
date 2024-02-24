'use client';

import { useEffect, useTransition } from 'react';
import { updateCompletionAnswers } from '@/actions/question-type/completion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useEditHook } from '@/global/use-edit-hook';
import { catchError } from '@/lib/utils';
import { CompletionAnswerSchema } from '@/lib/validations/question-type';
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

export function CompletionAnswerUpdateForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, isOpen, type, data } = useEditHook();
  const isModalOpen = isOpen && type === 'editCompletionAnswer';
  const questionGroup = data?.questionGroup;
  const completion = questionGroup?.completion;
  const form = useForm<z.infer<typeof CompletionAnswerSchema>>({
    resolver: zodResolver(CompletionAnswerSchema),
    defaultValues: {
      questions: [{ correctAnswer: '', explain: '' }]
    }
  });
  useEffect(() => {
    if (completion) {
      form.setValue(
        'questions',
        completion.questions.map((question) => ({
          correctAnswer: question.correctAnswer,
          explain: question.explain || ''
        }))
      );
    }
  }, [form, completion]);
  if (!questionGroup || !completion || !isModalOpen) {
    return null;
  }
  const onSubmit = (values: z.infer<typeof CompletionAnswerSchema>) => {
    startTransition(async () => {
      try {
        await updateCompletionAnswers({
          formData: values,
          id: completion.id
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
              {completion.questions.map((question, index) => (
                <div key={question.id}>
                  <div>Question {question.questionNumber}</div>
                  <FormField
                    key={`correctAnswer_${index}`}
                    control={form.control}
                    name={`questions.${index}.correctAnswer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correct Answer</FormLabel>
                        <FormControl>
                          <Input
                            value={field.value || ''}
                            onChange={field.onChange}
                            disabled={isPending}
                            placeholder="Hello"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    key={`explain_${index}`}
                    control={form.control}
                    name={`questions.${index}.explain`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Explain (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            value={field.value || ''}
                            onChange={field.onChange}
                            disabled={isPending}
                            placeholder="Hello"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <FormMessage />
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
