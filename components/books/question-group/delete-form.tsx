'use client';

import { useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteQuestionGroup } from '@/actions/test-exam/question-group';
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
import { useEditHook } from '@/global/use-edit-hook';
import { toast } from 'sonner';

export function DeleteQuestionGroupForm() {
  const [isPending, startTransition] = useTransition();
  const { data, isOpen, type, onClose } = useEditHook();
  const isModalOpen = isOpen && type === 'deleteQuestionGroup';
  const questionGroup = data?.questionGroup;

  const router = useRouter();

  if (!isModalOpen && !questionGroup) {
    return null;
  }
  const onSubmit = async () => {
    if (!questionGroup) {
      return;
    }
    try {
      startTransition(async () => {
        const { success, error } = await deleteQuestionGroup({
          id: questionGroup.id
        });

        if (success) {
          router.refresh();
          toast.success('Successfully deleted questionGroup!');
        } else {
          toast.error(error);
        }
      });
    } catch (e) {
      console.error('Error deleting questionGroup:', e);
      toast.error('Failed to delete questionGroup.');
    } finally {
      onClose();
    }
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
