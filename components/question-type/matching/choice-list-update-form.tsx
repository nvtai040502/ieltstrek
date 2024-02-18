'use client';

import { useEffect, useState, useTransition } from 'react';
import { updateMatchingChoiceList } from '@/actions/question-type/matching';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useEditHook } from '@/global/use-edit-hook';
import { catchError } from '@/lib/utils';
import { MatchingChoiceListSchema } from '@/lib/validations/question-type';
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

export function MatchingChoiceListUpdateForm() {
  const [isPending, startTransition] = useTransition();
  const [listMatchingChoicesDynamic, setListMatchingChoicesDynamic] = useState<
    string[]
  >([]);
  const { onClose, isOpen, type, data } = useEditHook();
  const isModalOpen = isOpen && type === 'editMatchingChoiceList';
  const questionGroup = data?.questionGroup;
  const matching = questionGroup?.matching;

  const form = useForm<z.infer<typeof MatchingChoiceListSchema>>({
    resolver: zodResolver(MatchingChoiceListSchema),
    defaultValues: {
      titleForQuestion: '',
      matchingChoiceList: []
    }
  });
  useEffect(() => {
    if (matching) {
      form.setValue('titleForQuestion', matching.titleForQuestion || '');
      setListMatchingChoicesDynamic(
        matching.matchingChoiceList.map((item) => item.content)
      );
    }
  }, [form, matching]);

  useEffect(() => {
    if (
      listMatchingChoicesDynamic.length <
      form.getValues().matchingChoiceList.length
    ) {
      form.resetField('matchingChoiceList');
    }
    listMatchingChoicesDynamic.forEach((content, index) => {
      form.setValue(`matchingChoiceList.${index}`, content);
    });
  }, [form, listMatchingChoicesDynamic]);
  if (!isModalOpen || !matching || !questionGroup) {
    return null;
  }
  const onSubmit = (values: z.infer<typeof MatchingChoiceListSchema>) => {
    console.log(values);
    startTransition(async () => {
      try {
        await updateMatchingChoiceList({
          formData: values,
          id: matching.id
        });
        toast.success('Updated');
        onClose();
      } catch (err) {
        catchError(err);
      }
    });
  };
  const handleAddChoice = () => {
    setListMatchingChoicesDynamic((prev) => [...prev, '']);
  };

  const handleDeleteChoice = (index: number) => {
    setListMatchingChoicesDynamic((prev) => {
      const updatedChoices = [...prev];
      updatedChoices.splice(index, 1);
      return updatedChoices;
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
                name="titleForQuestion"
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
              {listMatchingChoicesDynamic.map((_, i) => (
                <FormField
                  control={form.control}
                  key={i}
                  name={`matchingChoiceList.${i}`}
                  render={({ field }) => (
                    <FormItem>
                      {matching.matchingChoiceList[i] &&
                      matching.matchingChoiceList[i].question ? (
                        <FormLabel>{`Question ${matching.matchingChoiceList[i].question?.questionNumber}`}</FormLabel>
                      ) : (
                        <>
                          <FormLabel>Fake Choice</FormLabel>
                          <span>
                            <Button
                              size="sm"
                              type="button"
                              onClick={() => handleDeleteChoice(i)}
                              variant="outline"
                            >
                              Delete
                            </Button>
                          </span>
                        </>
                      )}

                      <FormControl>
                        <Input
                          value={field.value || ''}
                          onChange={(e) => {
                            setListMatchingChoicesDynamic((prev) => {
                              const updatedChoices = [...prev];
                              updatedChoices[i] = e.target.value;
                              return updatedChoices;
                            });
                            field.onChange(e);
                          }}
                          disabled={isPending}
                          placeholder="Hello"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <div className="flex">
              <Button
                disabled={isPending}
                onClick={handleAddChoice}
                type="button"
                className="w-full"
              >
                add Fake Choice
              </Button>
              <Button disabled={isPending} type="submit" className="w-full">
                update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContentWithScrollArea>
    </Dialog>
  );
}
