"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Fragment,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NoteCompletionSchema } from "@/lib/validations/books";
import { Dialog, DialogContentWithScrollArea } from "@/components/ui/dialog";
import { EditContext } from "@/global/edit-context";
import { useEditHook } from "@/global/use-edit-hook";
import RichTextExample from "@/components/text-editor/rich-text";

export function UpdateNoteCompletionForm() {
  const [isPending, startTransition] = useTransition();
  const [ a, setA] = useState<[]>([])
  const { isOpen, type, data } = useContext(EditContext);
  const { onClose } = useEditHook();
  const isModalOpen = isOpen && type === "editNoteCompletion";
  const noteCompletion = data?.noteCompletion;
  const form = useForm<z.infer<typeof NoteCompletionSchema>>({
    resolver: zodResolver(NoteCompletionSchema),
    defaultValues: {
      title: "",
    },
  });
  useEffect(() => {
    if (noteCompletion) {
      form.setValue("title", noteCompletion.title);
      
    }
  }, [form, noteCompletion]);

  const router = useRouter();
  if (isModalOpen && !noteCompletion) {
    console.log("Missing NoteCompletion Data");
    return null;
  }

  const onSubmit = (values: z.infer<typeof NoteCompletionSchema>) => {
    console.log(values)
    // startTransition(async () => {
    //   if (!noteCompletion) {
    //     return;
    //   }
    //   const successfully = await updateNoteCompletion({
    //     title: values.title,
    //     id: noteCompletion.id,
    //     groupItemAmount: values.groupItemAmount,
    //   });
    //   if (successfully) {
    //     toast.success("Successfully updated multipleChoice!");
    //     form.reset();
    //     router.refresh();
    //   } else {
    //     toast("Failed to update multipleChoice");
    //   }
    //   onClose();
    // });
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContentWithScrollArea>
        <RichTextExample />
      </DialogContentWithScrollArea>
    </Dialog>
  );
}
