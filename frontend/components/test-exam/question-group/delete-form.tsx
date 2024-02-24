'use client';

import { useTransition } from 'react';
import { deleteQuestionGroup } from '@/actions/test-exam/question-group';
import { toast } from 'sonner';
import { useEditHook } from '@/global/use-edit-hook';
import { catchError } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

export function DeleteQuestionGroupForm() {
  const [isPending, startTransition] = useTransition();
  const { data, isOpen, type, onClose } = useEditHook();
  const isModalOpen = isOpen && type === 'deleteQuestionGroup';
  const questionGroup = data?.questionGroup;

  if (!isModalOpen || !questionGroup) {
    return null;
  }
  const onSubmit = async () => {
    startTransition(async () => {
      try {
        await deleteQuestionGroup({
          id: questionGroup.id
        });

        toast.success('Deleted');
        onClose();
      } catch (err) {
        catchError(err);
      }
    });
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={onSubmit}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
