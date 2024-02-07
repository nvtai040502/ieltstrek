"use client";

import { NoteCompletionExtended } from "@/types/db";
import { UpdateButton } from "../../books/update-button";
import { useEditHook } from "@/global/use-edit-hook";
import RichTextExample from "@/components/text-editor/rich-text";
import RichText from "@/components/text-editor/rich-text";

interface NoteCompletionRenderProps {
  noteCompletion?: NoteCompletionExtended | null;
}
export const NoteCompletionRender = ({
  noteCompletion,
}: NoteCompletionRenderProps) => {
  const { onOpen } = useEditHook();
  if (!noteCompletion) {
    return null;
  }
  return (
    <>
      
      <RichText noteCompletion={noteCompletion} />
    </>
  );
};
