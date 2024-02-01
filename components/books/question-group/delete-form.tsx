"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { QuestionGroup } from "@prisma/client";
import { QuestionGroupSchema } from "@/lib/validations/books";
import { deleteQuestionGroup, updateQuestionGroup } from "@/actions/books/question-group";
import { QuestionGroupForm } from "./form";
import { PartExtended } from "@/types/db";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function DeleteQuestionGroupForm({
  questionGroup,
  setIsCUD,
}: {
  questionGroup: QuestionGroup;
  setIsCUD: (isCUD: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof QuestionGroupSchema>>({
    resolver: zodResolver(QuestionGroupSchema),
    defaultValues: {
      title: questionGroup.title,
      type: questionGroup.type,
      startQuestionNumber: questionGroup.startQuestionNumber,
      endQuestionNumber: questionGroup.endQuestionNumber,
      description: questionGroup.description || "",
    },
  });
  const router = useRouter();

  const onSubmit = async () => {
    try {
      startTransition(() => handleDelete());
    } catch (error) {
      console.error("Error deleting questionGroup:", error);
      toast.error("Failed to delete questionGroup.");
    } finally {
      setIsCUD(false);
    }
  };

  const handleDelete = async () => {
    const { success, error } = await deleteQuestionGroup({
      id: questionGroup.id,
    });

    if (success) {
      form.reset();
      router.refresh();
      toast.success(success);
    } else {
      toast.error(error);
    }
  };

  return (
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
  );
}
